import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        flexBasis: "100%",
        width: "100%",
        padding: theme.spacing(1),
    },

}));

export default function DistanceSelector(props) {
    const [distance, setDistanceValue] = React.useState(props.initialDistance);
    const classes = useStyles();
  
    //if 'distance' varable changes, call distChanged()
    React.useEffect(() => {
        distChanged();
      }, [distance])


    function handleChange(event) {
        setDistanceValue(event.target.value);      
    }
  
    function distChanged() {
        props.onDistanceChange(distance);    
    }

    return (
    <RadioGroup
        aria-label="distance"
        name="distance" 
        value={distance}
        onChange={handleChange}
    >
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
        >
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="1500" labelPlacement='bottom' control={<Radio />} label="1 500 m" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="1609.34" labelPlacement='bottom' control={<Radio />} label="1 mi" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="4828.03" labelPlacement='bottom' control={<Radio />} label="3 mi" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="5000" labelPlacement='bottom' control={<Radio />} label="5 km" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="8046.72" labelPlacement='bottom' control={<Radio />} label="5 mi" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="10000" labelPlacement='bottom' control={<Radio />} label="10 km" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="15000" labelPlacement='bottom' control={<Radio />} label="15 km" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="16093.4" labelPlacement='bottom' control={<Radio />} label="10 mi" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="21097.5" labelPlacement='bottom' control={<Radio />} label="1/2 marathon" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} className={classes.grid}>
                <FormControlLabel className={classes.radio} value="42195" labelPlacement='bottom' control={<Radio />} label="marathon" />
            </Grid>
        </Grid>
    </RadioGroup>
   );
}