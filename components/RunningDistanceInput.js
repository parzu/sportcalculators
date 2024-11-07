import React from "react";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

//Services
import { distanceToMeters } from "../services/distanceService.js";
import * as consts from "../services/unitConstants.js";
import { Typography } from "@mui/material";

export default function RunningDistanceInput(props) {
  const raceDistances = {
    "5km": 5,
    "5mi": 5, //8.04672,
    "10km": 10,
    "10mi": 10, //16.0934,
    "1/2 marathon": 21.0975,
    "marathon": 42.195,
  };

  const [selectedRace, setSelectedRace] = React.useState("10km");
  const [distanceUnit, setUnitValue] = React.useState(consts.distanceTypes.KM);
  const [distance, setDistanceValue] = React.useState(10);




  React.useEffect(() => {
    distChanged();
  }, [distance, distanceUnit]);

  function getDistanceTypeText(distanceType) {
    switch (distanceType) {
      case consts.distanceTypes.METER:
        return "m";
      case consts.distanceTypes.FEET:
        return "ft";
      case consts.distanceTypes.KM:
        return "km";
      case consts.distanceTypes.MILE:
        return "mi";
      default:
        return "m";
    }
  }

  function handleRaceChange(event, newRace) {
    setSelectedRace(newRace);
    if (newRace === "5mi" || newRace === "10mi") {
      setUnitValue(consts.distanceTypes.MILE);
    } else {
      setUnitValue(consts.distanceTypes.KM);
    }

    if (newRace === null) {
      return setDistanceValue(distance);
    }
    setDistanceValue(raceDistances[newRace]);
  }

  function handleUnitChange(event) {
    setSelectedRace("");
    if (distanceUnit === consts.distanceTypes.KM) {
      setDistanceValue((distance * 0.621371).toFixed(3));
    } else {
      setDistanceValue((distance * 1.60934).toFixed(3));
    }
    setUnitValue(parseInt(event.target.value));
    distChanged();
  }

  function handleDistanceChange(event) {
    setDistanceValue(event.target.value);
    if (distanceUnit === "") {
      setUnitValue(consts.distanceTypes.KM);
    }
    setSelectedRace("");
  }

  function distChanged() {
    props.onDistanceChange(distanceToMeters(distance, distanceUnit) / 1000);
  }


  const styles = {
    parentGrid: {
      flexBasis: "100%",
      width: "100%",
      padding: "8px",
      textAlign: "center",
      paddingBottom: "16px",
      maxWidth: "600px",
      margin: "auto",
    },
    grid: {
      flexBasis: "100%",
      width: "100%",
      padding: "8px",
      textAlign: "center",
      paddingBottom: "16px",
    },
    titleGrid: {
      flexBasis: "100%",
      width: "100%",
      padding: "8px",
      textAlign: "center",
      paddingTop: "40px",
    },
    textField: {
      verticalAlign: "baseline",
    },
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" style={styles.parentGrid}>
      <Grid item xs={12} style={styles.grid}>
        <Typography variant="overline" style={{ verticalAlign: "bottom", textAlign: "left", fontWeight: 'bold' }}>Race</Typography>  
      </Grid>
      <Grid item xs={12}>
        <ToggleButtonGroup
          orientation="horizontal"
          color="primary"
          value={selectedRace}
          exclusive
          onChange={handleRaceChange}
        >
          <ToggleButton
            key="5km"
            value="5km"
            aria-label="5km"
            sx={{
              textTransform: "lowercase",
              width: "60px",
            }}
          >
            5km
          </ToggleButton>
          <ToggleButton
            key="5mi"
            value="5mi"
            aria-label="5mi"
            sx={{
              textTransform: "lowercase",
              width: "60px",
            }}
          >
            5mi
          </ToggleButton>
          <ToggleButton
            key="10km"
            value="10km"
            aria-label="10km"
            sx={{
              textTransform: "lowercase",
              width: "60px",
            }}
          >
            10km
          </ToggleButton>
          <ToggleButton
            key="10mi"
            value="10mi"
            aria-label="10mi"
            sx={{
              textTransform: "lowercase",
              width: "60px",
            }}
          >
            10mi
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>



      <Grid item xs={12}>
        <ToggleButtonGroup
          orientation="horizontal"
          color="primary"
          value={selectedRace}
          exclusive
          onChange={handleRaceChange}
        >
          <ToggleButton
            key="1/2 marathon"
            value="1/2 marathon"
            aria-label="1/2 marathon"
            sx={{
              textTransform: "lowercase",
              width: "120px",
            }}
          >
            1/2 marathon
          </ToggleButton>
          <ToggleButton
            key="marathon"
            value="marathon"
            aria-label="marathon"
            sx={{
              textTransform: "lowercase",
              width: "120px",
            }}
          >
            marathon
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>


      <Grid item xs={12} style={styles.titleGrid}>
        <Typography variant="overline" style={{ verticalAlign: "bottom", textAlign: "left", fontWeight: 'bold' }}>Custom Distance</Typography>  
      </Grid>
      <Grid item xs={12} style={styles.grid}>
        <TextField
          id="distance"
          name="distance"
          label="distance"
          type="number"
          value={distance}
          onChange={handleDistanceChange}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {getDistanceTypeText(distanceUnit)}
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} style={styles.grid}>

        <ToggleButtonGroup
          orientation="horizontal"
          color="primary"
          value={distanceUnit}
          exclusive
          size="small"
          onChange={handleUnitChange}
        >
          {/* <ToggleButton
            value={consts.distanceTypes.METER}
            aria-label="m"
            sx={{
              textTransform: "lowercase",
              width: "50px"
            }}
          >
            m
          </ToggleButton>
          <ToggleButton
            value={consts.distanceTypes.FEET}
            aria-label="ft"
            sx={{
              textTransform: "lowercase",
              width: "50px"
            }}
          >
            ft
          </ToggleButton> */}
          <ToggleButton
            value={consts.distanceTypes.KM}
            aria-label="km"
            sx={{
              textTransform: "lowercase",
              width: "50px"
            }}
          >
            km
          </ToggleButton>
          <ToggleButton
            value={consts.distanceTypes.MILE}
            aria-label="miles"
            sx={{
              textTransform: "lowercase",
              width: "50px"
            }}
          >
            miles
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
