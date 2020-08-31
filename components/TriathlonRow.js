import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TimeInput from './TimeInput.js'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    grid: {
        flexBasis: "100%",
        width: "100%",
        padding: theme.spacing(1),
        textAlign: "left",
    },
    switch: {
      flexBasis: "100%",
      width: "100%",
      padding: theme.spacing(1),
      textAlign: "center",
  },
    text: {
      textAlign: "left",
      fontWeight: 'bold'
    },
    textField: {
      verticalAlign: "baseline"
    },
    label: {
      fontSize: "0.9em"
    }

}));

export default function TriathlonRow(props) {
    const classes = useStyles();

// class TriathlonRow extends React.Component {
//   constructor(props) {
//     super(props);
//     state = {
//      };
//   }

  // render() {
  //   let hintText = 'result (' + this.props.consts.resultUnit + ')';  
  //   const labelStyle = {
  //     textAlign: 'center',
  //     fontSize: 'small'
  //   };  
    return (
        // <div className="heptRow">
        // <style jsx >{`
        //   .heptRow {
        //     display: flex;
        //     flex-flow: row;
        //     justify-content: space-evenly;
        //   }
        //   .heptCol {
        //     align-self: baseline;
        //     margin: 10px;
        //     flex-basis: 25%;
        //   }
        //   .heptCol.text {
        //     text-align: left;
        //     font-weight: bold;
        //   }
        //   .manualText {
        //     font-size: small;
        //     margin-bottom: 5px;

        //   }
        //   .heptCol.manual {
        //     text-align: center;
        //   }
        //   @media (max-width: 600px) {
        //       .heptRow {
        //         flex-flow: row wrap;
        //         margin-bottom: 10px;
        //       }
        //       .heptCol {
        //         margin-left: 5px;
        //         flex-basis: 45%;
        //       }
        //       .heptCol.text {
        //           order: -2;
        //       }
        //       .heptCol.manual {
        //           order: -1;
        //       }
        //   }
        //   @media (max-width: 399px) {
        //     .heptRow {
        //         flex-flow: row wrap;
        //         margin-bottom: 10px;
        //       }
        //     .heptCol {
        //       margin: 0px;
        //       flex-basis: 100%; 
        //     }
        //   }
        // `}</style>
        
        <Grid 
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={8}
        >
          <Grid item xs={12} sm={3} className={classes.grid}>
            <Typography variant="overline" className={classes.text}>{props.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}  className={classes.grid}>
            <TextField 
              className={classes.textField}
              label='pace'
              fullWidth={true} 
              name={props.name} 
              id={props.id} 
              type='text' 
              value={props.pace} 
            //  onChange={props.onPaceChange.bind(this)} 
              InputProps={{
                endAdornment: <InputAdornment position="end">{props.paceUnit}</InputAdornment>,
              }}
            />
          </Grid>
        <Grid item xs={12} sm={5} className={classes.grid}>
          <TimeInput 
            shortNames={true} 
            tag={props.timeTag} 
            hideHours={props.hideHours} 
            values={props.time} 
            //onTimeChange={props.onTimeChange.bind(this)}
          />
        </Grid>        
    </Grid>
    );
  }
// }

// export default TriathlonRow;
