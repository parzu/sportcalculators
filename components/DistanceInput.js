import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

//Services
import { distanceToMeters } from "../services/distanceService.js";
import * as consts from "../services/unitConstants.js";

export default function DistanceInput(props) {
  const [distanceUnit, setUnitValue] = React.useState(consts.distanceTypes.KM);
  const [distance, setDistanceValue] = React.useState();

  React.useEffect(() => {
    distChanged();
  }, [distance, distanceUnit]);

  function handleUnitChange(event) {
    setUnitValue(parseInt(event.target.value));
  }

  function handleDistanceChange(event) {
    setDistanceValue(event.target.value);
  }

  function distChanged() {
    props.onDistanceChange(distanceToMeters(distance, distanceUnit));
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <TextField
          id="distance"
          name="distance"
          label="distance"
          type="number"
          value={distance}
          onChange={handleDistanceChange}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RadioGroup
          aria-label="distance unit"
          name="distanceUnit"
          value={distanceUnit}
          onChange={handleUnitChange}
        >
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              <FormControlLabel
                value={consts.distanceTypes.METER}
                labelPlacement="bottom"
                control={<Radio />}
                label="m"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={consts.distanceTypes.FEET}
                labelPlacement="bottom"
                control={<Radio />}
                label="ft"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={consts.distanceTypes.KM}
                labelPlacement="bottom"
                control={<Radio />}
                label="km"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                value={consts.distanceTypes.MILE}
                labelPlacement="bottom"
                control={<Radio />}
                label="miles"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Grid>
    </Grid>
  );
}
