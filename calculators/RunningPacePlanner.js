import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Slider,
  IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TimeInput from '../components/TimeInput';
import RunningDistanceInput from '../components/RunningDistanceInput';
import { formatTimeObject } from '../services/timeService';
import { round } from 'lodash';
import { padding, textAlign } from '@mui/system';

const RunningPacePlanner = () => {
  const [raceData, setRaceData] = useState({
    distance: 0,
    time: 0,
    evenPace: 0
  });

  const [splitSettings, setSplitSettings] = useState({
    splitDistance: 1,
    splitUnit: 'km',
    paceProgression: 0
  });

  const [splits, setSplits] = useState([]);
  const [lockedSplits, setLockedSplits] = useState(new Set());

  const formatTime = (timeInSeconds) => {
    const time = formatTimeObject(timeInSeconds);
    return `${time.hours > 0 ? time.hours + ':' : ''}${time.minutes}:${time.seconds}`;
  };

  const calculatePaceForDistance = (distancePoint, totalDistance, averagePace, progressionFactor) => {
    const progress = distancePoint / totalDistance;
    const firstPace = averagePace * (1 + progressionFactor/2);
    const lastPace = averagePace * (1 - progressionFactor/2);
    return firstPace + (lastPace - firstPace) * progress;
  };

  const calculateSplits = (distance, targetTime, settings) => {
    if (!distance || !targetTime || !settings.splitDistance || targetTime < 0) return [];

    const adjustedDistance = settings.splitUnit === 'mi' ? (distance / 1.60934).toFixed(2) : distance;
    const splitCount = Math.ceil(adjustedDistance / settings.splitDistance);
    const averagePace = targetTime / adjustedDistance;
    
    // Calculate split distances
    const splitDistances = Array(splitCount).fill(0).map((_, index) => {
      return Math.min(
        settings.splitDistance,
        adjustedDistance - index * settings.splitDistance
      );
    });

    const progressionFactor = -(settings.paceProgression / 100);
    let splits = [];
    let cumulativeTime = 0;
    let cumulativeDistance = 0;

    // First pass: Calculate initial paces and times
    splitDistances.forEach((splitDistance, index) => {
      let pace;
      if (lockedSplits.has(index) && splits[index]) {
        // Use the existing locked pace
        pace = splits[index].pace;
      } else {
        // Calculate new pace based on progression
        const distancePoint = cumulativeDistance + splitDistance / 2; // Use midpoint of split
        pace = calculatePaceForDistance(distancePoint, adjustedDistance, averagePace, progressionFactor);
      }

      const splitTime = splitDistance * pace;
      cumulativeDistance += splitDistance;
      cumulativeTime += splitTime;

      splits.push({
        distance: splitDistance.toFixed(2),
        pace,
        time: splitTime,
        cumulativeTime,
        paceStr: formatTime(pace),
        timeStr: formatTime(splitTime),
        cumulativeTimeStr: formatTime(cumulativeTime)
      });
    });

    // Calculate how much adjustment is needed for unlocked splits
    const currentTotal = splits.reduce((sum, split) => sum + split.time, 0);
    const timeDiscrepancy = targetTime - currentTotal;
    
    // Count unlocked splits and calculate their total time
    const unlockedSplitsTime = splits.reduce((sum, _, index) => 
      sum + (lockedSplits.has(index) ? 0 : splits[index].time), 0);
    
    // Calculate adjustment factor for unlocked splits
    const adjustmentFactor = unlockedSplitsTime > 0 
      ? 1 + (timeDiscrepancy / unlockedSplitsTime)
      : 1;

    // Second pass: Adjust unlocked splits to meet target time
    cumulativeTime = 0;
    splits = splits.map((split, index) => {
      const isLocked = lockedSplits.has(index);
      const adjustedTime = isLocked ? split.time : split.time * adjustmentFactor;
      const adjustedPace = adjustedTime / split.distance;
      cumulativeTime += adjustedTime;

      return {
        ...split,
        pace: isLocked ? split.pace : adjustedPace,
        time: adjustedTime,
        cumulativeTime,
        paceStr: formatTime(isLocked ? split.pace : adjustedPace),
        timeStr: formatTime(adjustedTime),
        cumulativeTimeStr: formatTime(cumulativeTime)
      };
    });

    return splits;
  };

  const calculateScaleFactorWithLocks = (splits, targetTime) => {
    // Calculate how much time is taken by locked splits
    const lockedTime = splits.reduce((sum, split, index) => 
      sum + (lockedSplits.has(index) ? split.time : 0), 0);
    
    // Calculate how much time is available for unlocked splits
    const remainingTime = targetTime - lockedTime;
    
    // Calculate current time of unlocked splits
    const unlockedTime = splits.reduce((sum, split, index) => 
      sum + (lockedSplits.has(index) ? 0 : split.time), 0);
    
    // Return scale factor for unlocked splits
    return remainingTime / unlockedTime;
  };

  const handleDistanceChange = (newDistance) => {
    setRaceData(prev => ({ ...prev, distance: newDistance }));
  };

  const handleTimeChange = (_, totalSeconds) => {
    setRaceData(prev => ({ ...prev, time: totalSeconds }));
  };

  const handleSplitSettingChange = (event) => {
    const { name, value } = event.target;
    setSplitSettings(prev => ({ ...prev, [name]: value }));
  };

  const toggleLock = (index) => {
    const newLockedSplits = new Set(lockedSplits);
    if (newLockedSplits.has(index)) {
      newLockedSplits.delete(index);
    } else {
      newLockedSplits.add(index);
    }
    setLockedSplits(newLockedSplits);
    
    // Recalculate splits to adjust unlocked paces
    const newSplits = calculateSplits(raceData.distance, raceData.time, splitSettings);
    setSplits(newSplits);
  };


  const handlePaceAdjustment = (index, adjustment) => {
    const newSplits = [...splits];
    const targetSplit = newSplits[index];
    const newPace = targetSplit.pace + adjustment;
    
    // Calculate new time for the adjusted split
    const newTime = targetSplit.distance * newPace;
    const timeDifference = newTime - targetSplit.time;
    
    // Count unlocked splits (excluding the one being adjusted)
    const unlockedSplits = splits.filter((_, i) => 
      i !== index && !lockedSplits.has(i));
    
    if (unlockedSplits.length === 0 && timeDifference !== 0) {
      // If no unlocked splits to adjust, don't allow the change
      return;
    }
    
    // Lock the adjusted split
    const newLockedSplits = new Set(lockedSplits);
    newLockedSplits.add(index);
    setLockedSplits(newLockedSplits);
    
    // Update the split being adjusted
    targetSplit.pace = newPace;
    targetSplit.time = newTime;
    targetSplit.paceStr = formatTime(newPace);
    targetSplit.timeStr = formatTime(newTime);
    
    // Distribute the time difference among unlocked splits
    if (unlockedSplits.length > 0) {
      const adjustmentPerSplit = -timeDifference / unlockedSplits.length;
      
      newSplits.forEach((split, i) => {
        if (i !== index && !lockedSplits.has(i)) {
          split.time += adjustmentPerSplit;
          split.pace = split.time / split.distance;
          split.paceStr = formatTime(split.pace);
          split.timeStr = formatTime(split.time);
        }
      });
    }
    
    // Recalculate cumulative times
    let cumulativeTime = 0;
    newSplits.forEach(split => {
      cumulativeTime += split.time;
      split.cumulativeTime = cumulativeTime;
      split.cumulativeTimeStr = formatTime(cumulativeTime);
    });
    
    setSplits(newSplits);
  };

  useEffect(() => {
    const newSplits = calculateSplits(raceData.distance, raceData.time, splitSettings);
    setSplits(newSplits);
    
    if (raceData.distance && raceData.time) {
        let raceDist = raceData.distance;
        if (splitSettings.splitUnit === 'mi') {
            raceDist = raceData.distance / 1.60934;
        }
      const evenPace = formatTime(raceData.time / raceDist);
      setRaceData(prev => ({ ...prev, evenPace }));
    }
  }, [raceData.distance, raceData.time, splitSettings]);

  const styles = {
    paper: {
      padding: 0,
      textAlign: "center",
      maxWidth: "600px",
      margin: "auto",
    },
    subheader: {
      textAlign: "left",
      marginLeft: "0px",
      marginRight: "0px",
      background: "#f5f5f5",
      paddingLeft: "20px",
    },
    parentGrid: {
      flexBasis: "100%",
      width: "100%",
      padding: "8px",
      textAlign: "center",
      paddingBottom: "16px",
      maxWidth: "400px",
      margin: "auto",
    },
    grid: {
      flexBasis: "100%",
      width: "100%",
      padding: "8px",
      textAlign: "center",
      paddingBottom: "16px",
    },
    timeGrid: {
      flexBasis: "100%",
      width: "100%",
      maxWidth: "400px",
      margin: "auto",
      paddingTop: "20px",
      paddingBottom: "20px",
      textAlign: "center",
    },
    baseline: {
      verticalAlign: "baseline",
    },
    tableCell: {
        paddingBottom: "16px",
        paddingTop: "16px",
        paddingLeft: "8px",
        paddingRight: "8px",
        textAlign: "center",
    },
    instructionText: {
        paddingTop: "16px",
        paddingBottom: "16px",
    }
  };
  
  return (
    <Paper style={styles.paper} elevation={3}>

        <div style={styles.subheader}>
          <Typography variant="overline">Race Distance</Typography>
        </div>
        <div>
          <RunningDistanceInput
            distance={raceData.distance}
            onDistanceChange={handleDistanceChange}
          />
        </div>

        <div style={styles.subheader}>
          <Typography variant="overline">Target Race Time</Typography>
        </div>
        <div style={styles.timeGrid}>
          <TimeInput onTimeChange={handleTimeChange} />
        </div>

        <div style={styles.subheader}>
          <Typography variant="overline">Split Settings</Typography>
        </div>
        <Grid container direction="row" justifyContent="center" alignItems="center" style={styles.parentGrid}>
          <Grid item xs={6} style={styles.grid}>
            <TextField
              label="Split Length"
              name="splitDistance"
              type="number"
              value={splitSettings.splitDistance}
              onChange={handleSplitSettingChange}
              variant="standard"
              InputProps={{
                inputProps: { min: 1, step: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    {splitSettings.splitUnit}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <ToggleButtonGroup
              orientation="horizontal"
              name="splitUnit"
              color="primary"
              value={splitSettings.splitUnit}
              exclusive
              size="small"
              onChange={handleSplitSettingChange}
            >
              <ToggleButton
                value="km"
                aria-label="km"
                name="splitUnit"
                sx={{
                  textTransform: "lowercase",
                  width: "50px"
                }}
              >
                km
              </ToggleButton>
              <ToggleButton
                value="mi"
                aria-label="miles"
                name="splitUnit"
                sx={{
                  textTransform: "lowercase",
                  width: "50px"
                }}
              >
                miles
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          
          <Grid item xs={4} style={styles.grid}>
            <TextField
              id="paceProgression"
              name="paceProgression"
              label="split progression"
              type="number"
              value={splitSettings.paceProgression}
              onChange={(_, value) => setSplitSettings(prev => ({ ...prev, paceProgression: value }))}
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    %
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={1} style={styles.grid}>
            </Grid>
  
          <Grid item xs={7} style={styles.grid}>
            <Slider
              style={styles.baseline}
              value={splitSettings.paceProgression}
              aria-label="paceProgression"
              valueLabelDisplay="auto"
              step={1}
              min={-100}
              max={100}
              onChange={(_, value) => setSplitSettings(prev => ({ ...prev, paceProgression: value }))}
              marks={[
                { value: -100, label: '-100%' },
                { value: 0, label: '0%' },
                { value: 100, label: '100%' }
              ]}
            />
          </Grid>
  
          <Grid item xs={12} style={styles.grid}>
            <Typography variant="caption">
              Negative splits means faster finnish.<br/>
              Positive splits means faster start.
            </Typography>
          </Grid>
        </Grid>

  
      {splits.length > 0 && (
<div>
          <div style={styles.subheader}>
            <Typography variant="overline">Splits</Typography>
          </div>
          <div style={styles.instructionText}>
          <Typography variant="caption">
            An even pace for your target time and distance is <b>{raceData.evenPace} min/{splitSettings.splitUnit}</b><br/>
            Use the +/- buttons to adjust the pace of each split by a second.<br/>
            Use the lock button to keep a split from being automatically adjusted.
          </Typography>
          </div>
          <TableContainer sx={{ maxHeight: "90vh" }}>
          <Table stickyHeader style={styles.mainTable}>
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableCell}>Split</TableCell>
                <TableCell style={styles.tableCell}>Distance ({splitSettings.splitUnit})</TableCell>
                <TableCell style={styles.tableCell}>Pace (min/{splitSettings.splitUnit})</TableCell>
                <TableCell style={styles.tableCell}>Actions</TableCell>
                <TableCell style={styles.tableCell}>Split Time</TableCell>
                <TableCell style={styles.tableCell}>Total Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {splits.map((split, index) => (
                <TableRow key={index}>
                  <TableCell style={styles.tableCell}>{index + 1}</TableCell>
                  <TableCell style={styles.tableCell}>{split.distance}</TableCell>
                  <TableCell style={styles.tableCell}>{split.paceStr}</TableCell>
                  <TableCell style={styles.tableCell}>
                    <IconButton onClick={() => handlePaceAdjustment(index, 1)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => handlePaceAdjustment(index, -1)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => toggleLock(index)}
                      color={lockedSplits.has(index) ? "primary" : "default"}
                    >
                      {lockedSplits.has(index) ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell style={styles.tableCell}>{split.timeStr}</TableCell>
                  <TableCell style={styles.tableCell}>{split.cumulativeTimeStr}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          </div>
      )}
    </Paper>
  );
};

export default RunningPacePlanner;