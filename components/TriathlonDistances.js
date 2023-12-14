import React, { useState, useEffect } from "react";
import {
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@mui/material";

//comopnents
import styles from "./triathlon.module.css";

const raceDistances = {
  metric: {
    sprint: {
      swim: 0.75,
      bike: 20,
      run: 5,
    },
    olympic: {
      swim: 1.5,
      bike: 40,
      run: 10,
    },
    half: {
      swim: 1.9,
      bike: 90,
      run: 21.1,
    },
    ironman: {
      swim: 3.8,
      bike: 180,
      run: 42.195,
    },
  },
  imperial: {
    sprint: {
      swim: 0.47,
      bike: 12,
      run: 3.1,
    },
    olympic: {
      swim: 0.93,
      bike: 25,
      run: 6.2,
    },
    half: {
      swim: 1.2,
      bike: 56,
      run: 13.1,
    },
    ironman: {
      swim: 2.4,
      bike: 112,
      run: 26.2,
    },
  },
};

const distanceUnit = {
    metric: "km",
    imperial: "mi",
  };

function TriathlonDistances(props) {
  const [race, setRace] = useState("sprint");
  const [swimDistance, setSwimDistance] = useState(
    raceDistances.metric.sprint.swim
  );
  const [bikeDistance, setBikeDistance] = useState(
    raceDistances.metric.sprint.bike
  );
  const [runDistance, setRunDistance] = useState(raceDistances.metric.sprint.run);

  useEffect(() => {
    let swimDist = swimDistance;
    let bikeDist = bikeDistance;
    let runDist = runDistance;
    if (race == "manual") {
      if (props.unit == "mi") {
        swimDist = swimDistance * 1.6;
      } else {
        swimDist = swimDistance / 1.6;
      }
    } else {
      swimDist = raceDistances[props.unit][race].swim;
      bikeDist = raceDistances[props.unit][race].bike;
      runDist = raceDistances[props.unit][race].run;
    }
    setSwimDistance(swimDist);
    setBikeDistance(bikeDist);
    setRunDistance(runDist);
  }, [props.unit]);

  useEffect(() => {
    props.onChange({
      swim: swimDistance,
      bike: bikeDistance,
      run: runDistance,
    });
  }, [swimDistance, bikeDistance, runDistance]);

  const raceChanged = (event) => {
    setRace(event.target.value);
    setSwimDistance(raceDistances[props.unit][event.target.value].swim);
    setBikeDistance(raceDistances[props.unit][event.target.value].bike);
    setRunDistance(raceDistances[props.unit][event.target.value].run);
  };

  const swimChanged = (event) => {
    setRace("manual");
    setSwimDistance(event.target.value);
  };

  const bikeChanged = (event) => {
    setRace("manual");
    setBikeDistance(event.target.value);
  };

  const runChanged = (event) => {
    setRace("manual");
    setRunDistance(event.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="baseline"
      spacing={2}
    >
      <Grid item xs={12} className={styles.grid}>
        <RadioGroup
          aria-label="distances"
          name="distances"
          value={race}
          onChange={raceChanged}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={6} sm={3} className={styles.grid}>
              <FormControlLabel
                value="sprint"
                labelPlacement="bottom"
                control={<Radio />}
                label="Sprint"
              />
            </Grid>
            <Grid item xs={6} sm={3} className={styles.grid}>
              <FormControlLabel
                value="olympic"
                labelPlacement="bottom"
                control={<Radio />}
                label="Olympic"
              />
            </Grid>
            <Grid item xs={6} sm={3} className={styles.grid}>
              <FormControlLabel
                value="half"
                labelPlacement="bottom"
                control={<Radio />}
                label="Half-Ironman"
              />
            </Grid>
            <Grid item xs={6} sm={3} className={styles.grid}>
              <FormControlLabel
                value="ironman"
                labelPlacement="bottom"
                control={<Radio />}
                label="Ironman"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Grid>

      <Grid item xs={1} sm={3}></Grid>
      <Grid item xs={3} sm={2} className={styles.grid}>
      <h6 className={styles.triHeader}>SWIM</h6>
      </Grid>
      <Grid item xs={6} sm={4} className={styles.grid}>
        <TextField
          className={styles.textField}
          label="distance"
          fullWidth={true}
          name="swim"
          id="swim"
          type="number"
          value={swimDistance}
          onChange={swimChanged}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {distanceUnit[props.unit]}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2} sm={3}></Grid>

      <Grid item xs={1} sm={3}></Grid>
      <Grid item xs={3} sm={2} className={styles.grid}>
      <h6 className={styles.triHeader}>BIKE</h6>
      </Grid>
      <Grid item xs={6} sm={4} className={styles.grid}>
        <TextField
          className={styles.textField}
          label="distance"
          fullWidth={true}
          name="bike"
          id="bike"
          type="number"
          value={bikeDistance}
          onChange={bikeChanged}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {distanceUnit[props.unit]}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
          <Grid item xs={2} sm={3}></Grid>

          <Grid item xs={1} sm={3}></Grid>
      <Grid item xs={3} sm={2} className={styles.grid}>
      <h6 className={styles.triHeader}>RUN</h6>
      </Grid>
      <Grid item xs={6} sm={4} className={styles.grid}>
        <TextField
          className={styles.textField}
          label="distance"
          fullWidth={true}
          name="run"
          id="run"
          type="number"
          value={runDistance}
          onChange={runChanged}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {distanceUnit[props.unit]}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2} sm={3}></Grid>

    </Grid>
  );
}

export default TriathlonDistances;
