import React, {useState} from "react";
import { Paper, Typography } from "@material-ui/core";

//components
import TimeInput from "../components/TimeInput.js";
import PredictedSplitTimes from "../components/PredictedSplitTimes.js";
import styles from "../components/triathlon.module.css";

const MarathonDistance = 42195;

const MarathonCalculator = () => {

  const [time, setTime] = useState(0);

  const onTimeChange = (id, totalSecs, name) => {
    setTime(totalSecs);
  }

  return (
    <div>
      <Paper className={styles.paperBox} elevation={3}>
      <div className={styles.divideTitle}>
            <Typography variant="overline">Marathon Goal Time</Typography>
          </div>
          <div style={{marginBottom: "20px"}}>
        <TimeInput  onTimeChange={onTimeChange}/>
        </div>
        <div className={styles.divideTitle}>
            <Typography variant="overline">Target Race Times</Typography>
          </div>
            <PredictedSplitTimes
              time={time}
              distance={MarathonDistance}
            />
      </Paper>
    </div>
  );
};

export default MarathonCalculator;
