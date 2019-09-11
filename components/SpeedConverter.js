import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {paceToSpeed} from '../services/speedService.js'
import * as consts from '../services/unitConstants.js';
import Paper from '@material-ui/core/Paper';
import SpeedDisplay from './SpeedDisplay.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    subheader: {
        textAlign: 'left',
        marginLeft: '-20px',
        marginRight: '-20px',
        background: '#f5f5f5',
        paddingLeft: '20px',
    },
    result: {
        paddingTop: '40px',
    }

}));



export default function SpeedConverter(props) {
    const [paceUnit, setUnitValue] = React.useState(consts.paceTypes.MIN_KM);
    const [pace, setPaceValue] = React.useState();
    const [speed, setSpeedValue] = React.useState(0);
    const classes = useStyles();

    React.useEffect(() => {
        paceChanged();
      }, [pace, paceUnit])

    function handleUnitChange(event) {
        setUnitValue(parseInt(event.target.value));
    }

    function handlePaceChange(event) {
        setPaceValue(event.target.value);      
    }
  
    function paceChanged() {
        setSpeedValue(paceToSpeed(pace, paceUnit));
    }


    const style = {
        padding: 20,
        textAlign: 'center',
        maxWidth: '600px',
        diplay: 'flex',
      };
    return (
        <div style={{display: 'flex',
            justifyContent: 'center'}}>
        <Paper className='calculatorBox' style={style} zDepth={3}>
           <div className={classes.subheader}>
                    <Typography variant="overline">Pace</Typography>
                </div>
            <Grid    
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                
                <Grid item xs={12} sm={6}>
               
                <TextField
                    id="pace"
                    name='pace'
                    label="pace"
                    type='number'
                    value={pace}
                    onChange={handlePaceChange} 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RadioGroup
                    aria-label="pace unit"
                    name="paceUnit" 
                    value={paceUnit}
                    onChange={handleUnitChange}
                >
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={3}>
                            <FormControlLabel value={consts.paceTypes.MIN_KM} labelPlacement='bottom' control={<Radio />} label="min/km" />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel value={consts.paceTypes.KM_H} labelPlacement='bottom' control={<Radio />} label="km/h" />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel value={consts.paceTypes.MIN_MI} labelPlacement='bottom' control={<Radio />} label="min/mi" />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel value={consts.paceTypes.MPH} labelPlacement='bottom' control={<Radio />} label="mph" />
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Grid>
            <Grid item xs={12} className={classes.result}>
                <div className={classes.subheader}>
                    <Typography variant="overline">Speed & pace</Typography>
                </div>
                <SpeedDisplay speed={speed} />
            </Grid>
            </Grid>
        </Paper>
        </div>
    );
}
