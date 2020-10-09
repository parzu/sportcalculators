import React, { Fragment } from "react";
import {
  Paper,
  Typography,
  Grid,
  Hidden,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

//Components
import TriathlonSport from "../components/TriathlonSport.js";
import CombinedTotalRow from "../components/CombinedTotalRow.js";
import TriathlonDistances from "../components/TriathlonDistances.js";
import styles from "../components/triathlon.module.css";

//Services
import { formatTime } from "../services/timeService.js";
import TimeInput from "../components/TimeInput.js";

class TriathlonCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "metric",
      swimDistance: "",
      bikeDistance: "",
      runDistance: "",
      swimTotalTime: 0,
      bikeTotalTime: 0,
      runTotalTime: 0,
      transitTime1: 120,
      transitTime2: 120,
      totalSecs: 0,
      totalTimeText: "0:04:00",
    };
  }

  onTimeChange(id, totalSecs) {
    this.setState({ [id]: totalSecs }, this.calculateTotalTime);
  }

  onTransitTimeChange(id, totalSecs, name) {
    this.setState({ [id]: totalSecs });
  }

  onUnitChange(event) {
    this.setState({ unit: event.target.value });
  }

  onDistanceChange(distances) {
    this.setState({ swimDistance: distances.swim });
    this.setState({ bikeDistance: distances.bike });
    this.setState({ runDistance: distances.run });
  }

  calculateTotalTime() {
    
    let totalSecs =
      parseInt(this.state.swimTotalTime) +
      parseInt(this.state.transitTime1) +
      parseInt(this.state.bikeTotalTime) +
      parseInt(this.state.transitTime2) +
      parseInt(this.state.runTotalTime);
    
    let timeText = formatTime(totalSecs);
    this.setState({ totalSecs: totalSecs });
    this.setState({ totalTimeText: timeText });
  }

  render() {
    return (
      <div>
        <Paper className={styles.paperBox} elevation={3}>
          <div className={styles.divideTitle}>
            <Typography variant="overline">Units</Typography>
          </div>
          <RadioGroup
            aria-label="distance"
            name="unit"
            value={this.state.unit}
            onChange={this.onUnitChange.bind(this)}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={6} className={styles.grid}>
                <FormControlLabel
                  value="metric"
                  labelPlacement="bottom"
                  control={<Radio />}
                  label="Metric"
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3} className={styles.grid}>
                <FormControlLabel
                  value="imperial"
                  labelPlacement="bottom"
                  control={<Radio />}
                  label="Imperial"
                />
              </Grid>
            </Grid>
          </RadioGroup>

          <div className={styles.divideTitle}>
            <Typography variant="overline">Distances</Typography>
          </div>
          <div>
            <TriathlonDistances
              unit={this.state.unit}
              onChange={this.onDistanceChange.bind(this)}
            />
          </div>

          <div className={styles.divideTitle}>
            <Typography variant="overline">Paces and Times</Typography>
          </div>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-end"
            spacing={2}
            className={styles.pacesTimes}
          >
            <Grid item xs={1} sm={2} className={styles.grid}></Grid>
            <Grid item xs={5} sm={4} className={styles.grid}>
              <h6 className={styles.paceTimeHeader}>PACE/SPEED</h6>
            </Grid>
            <Grid item xs={1} sm={1} className={styles.grid}></Grid>
            <Grid item xs={5} sm={4} className={styles.grid}>
            <h6 className={styles.paceTimeHeader}>TIME</h6>
            </Grid>
            <Grid item xs={0} sm={1} className={styles.grid}></Grid>

            <Grid item xs={12} className={styles.grid}>
              <TriathlonSport
                name="swim"
                unit={this.state.unit}
                distance={this.state.swimDistance}
                onTimeChange={this.onTimeChange.bind(this)}
              />
            </Grid>

            <Hidden xsDown>
            <Grid item sm={1}></Grid>
            </Hidden>
            <Grid item xs={1} sm={2} className={styles.verticalHeader}>
              <h6>transit</h6>
            </Grid>
            <Grid item xs={6} sm={4} className={styles.grid}></Grid>
            <Grid item xs={5} sm={4} className={styles.grid}>
              <TimeInput
                shortNames={true}
                hideHours={true}
                tag="transitTime1"
                defaultValues={{ minutes: 2 }}
                onTimeChange={this.onTimeChange.bind(this)}
              />
            </Grid>
            <Hidden xsDown>
            <Grid item sm={1}></Grid>
            </Hidden>

            <Grid item xs={12} className={styles.grid}>
              <TriathlonSport
                name="bike"
                unit={this.state.unit}
                distance={this.state.bikeDistance}
                onTimeChange={this.onTimeChange.bind(this)}
              />
            </Grid>

            <Hidden xsDown>
            <Grid item sm={1}></Grid>
            </Hidden>
            <Grid item xs={1} sm={2} className={styles.verticalHeader}>
              <h6>transit</h6>
            </Grid>
            <Grid item xs={6} sm={4} className={styles.grid}></Grid>
            <Grid item xs={5} sm={4} className={styles.grid}>
              <TimeInput
                shortNames={true}
                hideHours={true}
                tag="transitTime2"
                defaultValues={{ minutes: 2 }}
                onTimeChange={this.onTimeChange.bind(this)}
              />
            </Grid>
            <Hidden xsDown>
            <Grid item sm={1}></Grid>
            </Hidden>

            <Grid item xs={12} className={styles.grid}>
              <TriathlonSport
                name="run"
                unit={this.state.unit}
                distance={this.state.runDistance}
                onTimeChange={this.onTimeChange.bind(this)}
              />
            </Grid>
          </Grid>
          <CombinedTotalRow
            text="Total time"
            points={this.state.totalTimeText}
          />
        </Paper>
      </div>
    );
  }
}

export default TriathlonCalculator;
