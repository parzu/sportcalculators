import React, { useState, useEffect, Fragment } from "react";
import {
  Grid,
  TextField,
  Hidden,
} from "@material-ui/core";

//components
import styles from "./triathlon.module.css";

//services
import { timeToSeconds, formatTimeObject } from "../services/timeService.js";

const sportConstants = [
  {
    name: "swim",
    metric: "/100m",
    imperial: "/100yds",
    multiplier: {
      metric: 10,
      imperial: 17.6,
    },
  },
  {
    name: "bike",
    metric: "km/h",
    imperial: "mph",
  },
  {
    name: "run",
    metric: "/km",
    imperial: "/mi",
    multiplier: {
      metric: 1,
      imperial: 1,
    },
  },
];

function TriathlonSport(props) {
  const [values, setValues] = useState({
    timeHours: "",
    timeMinutes: "",
    timeSeconds: "",
    paceMinutes: "",
    paceSeconds: "",
    speed: "",
    calculateTime: false,
    calculatePaceSpeed: false,
  });
  const [paceUnit, setPaceUnit] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    props.onTimeChange(`${props.name}TotalTime`, totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    updateTime();
  }, [props.distance]);

  useEffect(() => {
    if (values.calculatePaceSpeed) {
      if (props.name == "bike") {
        updateSpeed();
      } else {
        updatePace();
      }
    }
    if (values.calculateTime) {
      updateTime();
    }
  }, [values]);

  useEffect(() => {
    updatePaceUnit();
  }, [props.unit]);

  const updatePaceUnit = () => {
    let paceU = sportConstants.filter((obj) => obj.name == props.name);
    setPaceUnit(paceU[0][props.unit]);
  };

  //Pace has changed
  const updatePace = () => {
    let totalSecs = timeToSeconds(
      values.timeHours,
      values.timeMinutes,
      values.timeSeconds
    );
    let sport = sportConstants.filter((obj) => obj.name == props.name);
    let paceSeconds =
      totalSecs / (props.distance * sport[0].multiplier[props.unit]);
    let paceObj = formatTimeObject(paceSeconds);
    setValues((prevValues) => ({
      ...prevValues,
      paceMinutes: paceObj.minutes,
      paceSeconds: paceObj.seconds,
      calculatePaceSpeed: false,
    }));
    setTotalSeconds(totalSecs);
  };

  const updateSpeed = () => {
    let totalSecs = timeToSeconds(
      values.timeHours,
      values.timeMinutes,
      values.timeSeconds
    );
    let tempSpeed = props.distance / (totalSecs / 3600);
    setValues((prevValues) => ({
      ...prevValues,
      speed: tempSpeed,
      calculatePaceSpeed: false,
    }));
    setTotalSeconds(totalSecs);
  };

  //Time has changed
  const updateTime = () => {
    let paceSecs, timeSecs;
    if (props.name === "bike") {
      if (values.speed === "") {
        timeSecs = 0;
      } else {
        timeSecs = (props.distance / values.speed) * 3600;
      }
    } else {
      paceSecs = timeToSeconds(0, values.paceMinutes, values.paceSeconds);
      let sport = sportConstants.filter((obj) => obj.name == props.name);
      timeSecs = paceSecs * (props.distance * sport[0].multiplier[props.unit]);
    }
    let timeObj = formatTimeObject(timeSecs);
    setValues((prevValues) => ({
      ...prevValues,
      timeHours: timeObj.hours,
      timeMinutes: timeObj.minutes,
      timeSeconds: timeObj.seconds,
      calculateTime: false,
    }));
    setTotalSeconds(timeSecs);
  };

  const timeChanged = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
      calculatePaceSpeed: true,
    }));
  };

  const speedPaceChanged = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
      calculateTime: true,
    }));
  };

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="bottom"
        spacing={1}
      >
        <Hidden xsDown>
          <Grid item sm={1}></Grid>
        </Hidden>
        <Grid item item xs={1} sm={2} className={styles.verticalHeader}>
          <h6>{props.name}</h6>
        </Grid>
        {props.name == "bike" && (
          <Grid item xs={4} sm={2}>
            <TextField
              type="number"
              value={values.speed}
              name="speed"
              label="speed"
              onChange={(e) => speedPaceChanged(e)}
            />
          </Grid>
        )}
        {(props.name == "swim" || props.name == "run") && (
          <Fragment>
            <Grid item xs={2} sm={1}>
              <TextField
                type="number"
                value={values.paceMinutes}
                name="paceMinutes"
                label="mins"
                onChange={(e) => speedPaceChanged(e)}
              />
            </Grid>
            <Grid item xs={2} sm={1}>
              <TextField
                type="number"
                value={values.paceSeconds}
                name="paceSeconds"
                label="secs"
                onChange={(e) => speedPaceChanged(e)}
              />
            </Grid>
          </Fragment>
        )}
        <Grid
          item
          xs={2}
          sm={1}
          style={{ alignSelf: "flex-end", textAlign: "left" }}
        >
          <div style={{ fontSize: "10px" }}>{paceUnit}</div>
        </Grid>

        <Hidden xsDown>
          <Grid item sm={1}></Grid>
        </Hidden>
        <Grid item xs={5} sm={4}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="bottom"
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                type="number"
                value={values.timeHours}
                name="timeHours"
                label="hrs"
                onChange={(e) => timeChanged(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                value={values.timeMinutes}
                name="timeMinutes"
                label="mins"
                onChange={(e) => timeChanged(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                value={values.timeSeconds}
                name="timeSeconds"
                label="secs"
                onChange={(e) => timeChanged(e)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1}></Grid>
        </Hidden>
      </Grid>
    </Fragment>
  );
}

export default TriathlonSport;
