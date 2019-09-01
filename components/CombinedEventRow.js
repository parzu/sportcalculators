import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
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

export default function CombinedEventRow(props) {
    const classes = useStyles();

// class CombinedEventRow extends React.Component {
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
            alignItems="baseline"
        >
          <Grid item xs={12} sm={3} className={classes.grid}>
        {/* <div className="heptCol text"> */}
            <Typography variant="overline" className={classes.text}>{props.consts.name}</Typography>
        {/* </div> */}
          </Grid>
          <Grid item xs={6} sm={3} className={classes.grid}>
        {/* <div className="heptCol"> */}
          <TextField 
            className={classes.textField}
            label='result'
            fullWidth={true} 
            name={props.consts.resultName} 
            id={props.id} 
            type='text' 
            value={props.event.result} 
            onChange={props.onResultChange.bind(this)} 
            InputProps={{
              endAdornment: <InputAdornment position="end">{props.consts.resultUnit}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3} className={classes.grid}>
        {/* <div className="heptCol"> */}
          <TextField 
            className={classes.textField}
            label='points' 
            fullWidth={true} 
            name='points' 
            id={props.id} 
            type='number'
            value={props.event.points}
            onChange={props.onPointsChange.bind(this)}
          />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.switch}>
        {/* <div className="heptCol manual"> */}
          {/* {props.showManual ? <p className="manualText">Manual timing</p>: null} */}
          {/* {props.showManual ? <ToggleButton labelStyle={labelStyle} label="Manual timing" labelPosition='right' id={props.id} onToggle={props.onToggle.bind(this)}/>: null} */}
          {props.showManual ? <FormControlLabel labelPlacement="rigth"
          classes={{
            label: classes.label,
          }}
        control={
          <Switch id={props.id} size="small" onChange={props.onToggle.bind(this)} />
        }
        label="Manual timing"
      />: null}
        </Grid>
        
    </Grid>
    );
  }
// }

// export default CombinedEventRow;
