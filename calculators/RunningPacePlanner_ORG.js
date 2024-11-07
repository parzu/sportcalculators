//A placeholder react component template for a racepaceplanner similar to ThriathlonCalculator.js but use function components instead of class components. The component should have a state that contains the following properties: distance, time, pace, and speed. There should be a handleDistanceChange function that updates the distance in the state, a handleTimeChange function that updates the time in the state, a handlePaceChange function that updates the pace in the state, a handleSpeedChange function that updates the speed in the state, and a setPace function that calculates the pace and updates the state. The component should render a Paper component with a TextField for distance, a TextField for time, a TextField for pace, and a TextField for speed. The component should also render a CombinedTotalRow component with the pace and speed as props.
import React, { useEffect } from "react";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import Slider from "@mui/material/Slider";


//comoponents
import TimeInput from "../components/TimeInput.js";
import RunningDistanceInput from "../components/RunningDistanceInput.js";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

//services
import { formatTimeObject } from "../services/timeService.js";
import { margin, maxWidth, padding } from "@mui/system";
import { set } from "lodash";
import { ConsoleNetworkOutline } from "mdi-material-ui";

const RunningPacePlanner = () => {
    const [distance, setDistance] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [evenPace, setEvenPace] = React.useState(0);
    const [speed, setSpeed] = React.useState(0);
    const [splitSettings, setSplitSettings] = React.useState({ splitDistance: 1, splitUnit: "km", paceProgression: 0});

    const [splits, setSplits] = React.useState([]);

    useEffect(() => {
        //initSplits(distance, time);
    }, []);

    const handleDistanceChange = (newDist) => {
        setDistance(newDist);
        initSplits(newDist, time, splitSettings);
    };

    const handleTimeChange = (event, totalSecs) => {
        setTime(totalSecs);
        initSplits(distance, totalSecs, splitSettings);
    };

    const handleSplitChange = (event) => {
        let newValue = event.target.value;
        console.log(newValue);
        let newSplitSettings = { ...splitSettings };
        if (event.target.name === "splitDistance") {
            newValue = Math.min(500, newValue);
            newSplitSettings.splitDistance = newValue;
        } else if (event.target.name === "splitUnit") {
            newSplitSettings.splitUnit = newValue;
        } else {
            newSplitSettings.paceType = newValue;
        }
        setSplitSettings(newSplitSettings);
        initSplits(distance, time, newSplitSettings);
    };

    const handleManualPaceChange = (index, newPace) => {
        let tempSplits = [...splits];
        tempSplits[index].pace = newPace;
        updateSplits(tempSplits);
    };

    const handleProgressionFieldChange = (event) => {
        let newValue = event.target.value;
        let newSplitSettings = { ...splitSettings };
        newSplitSettings.paceProgression = newValue;
        setSplitSettings(newSplitSettings);
        initSplits(distance, time, newSplitSettings);
    };

    const handleProgressionSliderChange = (event, newValue) => {
        let newSplitSettings = { ...splitSettings };
        newSplitSettings.paceProgression = newValue;
        setSplitSettings(newSplitSettings);
        initSplits(distance, time, newSplitSettings);
    };

    const updateSplits = (newSplits) => {
        let cumulativeTime = 0;
        let tempSplits = [];
        for (let i = 0; i < newSplits.length; i++) {
            let split = newSplits[i];
            split.time = split.distance * split.pace;
            cumulativeTime += split.time;
            split.cumulativeTime = cumulativeTime;
            split = updateSplitStrings(split);
            tempSplits.push(split);
        }
        setSplits(tempSplits);
    };

    const updateSplitStrings = (split) => {
        let splitTime = formatTimeObject(split.time);
        let splitPace = formatTimeObject(split.pace);
        let cumulativeTimeObj = formatTimeObject(split.cumulativeTime);

        let splitTimeStr = `${splitTime.hours === 0 ? "" : splitTime.hours + ":"}${splitTime.minutes}:${splitTime.seconds}`;
        let splitPaceStr = `${splitPace.minutes}:${splitPace.seconds}`;
        let cumulativeTimeStr = `${cumulativeTimeObj.hours === 0 ? "" : cumulativeTimeObj.hours + ":"}${cumulativeTimeObj.minutes}:${cumulativeTimeObj.seconds}`;

        return {
            ...split,
            timeStr: splitTimeStr,
            paceStr: splitPaceStr,
            cumulativeTimeStr: cumulativeTimeStr,
        };
    };


    const initSplits = (newDist, newTime, newSplitSettings) => {
        if (newDist === 0 || newTime === 0 || newSplitSettings.splitDistance === 0 || newSplitSettings.splitDistance === "") {
            return;
        }
        let tempSplits = [];

        if (newSplitSettings.splitUnit === "mi") {
            newDist = (newDist / 1.60934).toFixed(2);
        }
        console.log(newDist, newTime);

        let splitAmount = Math.ceil(newDist / (newSplitSettings.splitDistance));
        let splitDistance = newSplitSettings.splitDistance;


        let evenSplitPace = newTime / newDist;
        //let startSplitPace = evenSplitPace-(evenSplitPace * (newSplitSettings.paceProgression / 2 / 100));
        //let unitPaceChange = (evenSplitPace * (newSplitSettings.paceProgression / 100))/(splitAmount-1);
        let unitPaceChange = Number((evenSplitPace * (newSplitSettings.paceProgression / 100))/(distance-1)).toFixed(2);
        let startSplitPace = evenSplitPace - (unitPaceChange * ((distance / 2)));
        startSplitPace = (2*startSplitPace+splitDistance*unitPaceChange)/2;

        console.log("evenSplitPace: ", evenSplitPace, startSplitPace, unitPaceChange);

        let evenSplitObject = formatTimeObject(evenSplitPace);
        let evenSplitStr = `${evenSplitObject.minutes}:${evenSplitObject.seconds}`;
        setEvenPace(evenSplitStr);

        tempSplits.push({
            distance: splitDistance.toFixed(2),
            pace: startSplitPace,
        });
        let prevSplitPace = startSplitPace;
        for (let i = 1; i < splitAmount; i++) {
            let splitDist = Number(splitDistance).toFixed(2);
            

            if (newDist < (i + 1) * splitDistance) {
                splitDist = (newDist - i * splitDistance).toFixed(2);
            }

            let splitPace = Math.round(prevSplitPace + splitDist * unitPaceChange).toFixed(2);
            //let splitPace = Math.round(startSplitPace + i * unitPaceChange).toFixed(2);
            
            console.log("splits: ", i, prevSplitPace, unitPaceChange, splitPace);



            tempSplits.push({
                distance: splitDist,
                pace: splitPace,
            });
            prevSplitPace = Number(splitPace);
        }
        updateSplits(tempSplits);
    };


    const styles = {
        paper: {
            padding: 0,
            textAlign: "center",
            maxWidth: "600px",
            diplay: "flex",
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
    };

    const marks = [
        {
          value: -100,
          label: '-100%',
        },
        {
          value: 0,
          label: '0%',
        },
        {
          value: 100,
          label: '100%',
        },
      ];

    return (
        <Paper style={styles.paper} elevation={3}>

            <div style={styles.subheader}>
                <Typography variant="overline">Race Distance</Typography>
            </div>
            <div>
                <RunningDistanceInput
                    distance={distance}
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
                        id="splitDistance"
                        name="splitDistance"
                        label="split length"
                        type="number"
                        value={splitSettings.splitDistance}
                        onChange={handleSplitChange}
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
                        onChange={handleSplitChange}
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
                            onChange={handleProgressionFieldChange}
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

                    <Grid item xs={8} style={styles.grid}>
                        <Slider
                            style={styles.baseline}
                            value={splitSettings.paceProgression}
                            aria-label="paceProgression"
                            valueLabelDisplay="auto"
                            step={1}
                            min={-100}
                            max={100}
                            onChange={handleProgressionSliderChange}
                        />
                    </Grid>

                    <Grid item xs={12} style={styles.grid}>
                    <Typography variant="caption" className="cadenceCalculatorCadence">
                        Negative splits means faster ending.<br/>Positive splits means faster start.
                    </Typography>
                    </Grid>

            </Grid>

            <div style={styles.subheader}>
                <Typography variant="overline">Splits</Typography>
            </div>



            {splits.length > 0 ? (
                <div>
                    <Typography variant="caption" className="cadenceCalculatorCadence">
                        An even pace for your target time and distance is {evenPace}.                    
                    </Typography>
                    
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Split</TableCell>
                                <TableCell>Distance</TableCell>
                                <TableCell>Pace (min/{splitSettings.splitUnit})</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Cumulative Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {splits.map((split, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{split.distance}</TableCell>
                                    <TableCell>
                                        {split.paceStr}
                                        <IconButton aria-label="increase" color="primary" onClick={() => handleManualPaceChange(index, split.pace + 1)}>
                                            <AddCircleOutlineOutlinedIcon />
                                        </IconButton>

                                        <IconButton aria-label="decrease" color="primary" onClick={() => handleManualPaceChange(index, split.pace - 1)}>
                                            <RemoveCircleOutlineOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{split.timeStr}</TableCell>
                                    <TableCell>{split.cumulativeTimeStr}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : null}


        </Paper>

    );


};




export default RunningPacePlanner;

