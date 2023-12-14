import React from 'react';
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const GridItem = styled(Grid)`
  flex-basis: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  text-align: left;
`;

const SwitchItem = styled(Grid)`
  flex-basis: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  text-align: center;
`;

const Text = styled(Typography)`
  text-align: left;
  font-weight: bold;
`;

const TextFieldItem = styled(TextField)`
  vertical-align: baseline;
`;

const Label = styled(FormControlLabel)`
  font-size: 0.9em;
`;

export default function CombinedEventRow(props) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="baseline"
    >
      <GridItem item xs={12} sm={3}>
        <Text variant="overline">{props.consts.name}</Text>
      </GridItem>
      <GridItem item xs={6} sm={3}>
        <TextFieldItem
          style={{verticalAlign: "baseline"}}
          label="result"
          fullWidth={true}
          name={props.consts.resultName}
          id={props.id}
          type="text"
          value={props.event.result}
          onChange={props.onResultChange.bind(this)}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {props.consts.resultUnit}
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem item xs={6} sm={3}>
        <TextFieldItem
          style={{verticalAlign: "baseline"}}
          label="points"
          fullWidth={true}
          name="points"
          id={props.id}
          type="number"
          value={props.event.points}
          onChange={props.onPointsChange.bind(this)}
          variant="standard"
        />
      </GridItem>
      <SwitchItem item xs={12} sm={3}>
        {props.showManual ? (
          <Label
            labelPlacement="right"
            style={{fontSize: "0.9em"}}
            control={<Switch id={props.id} size="small" onChange={props.onToggle.bind(this)} />}
            label="Manual timing"
          />
        ) : null}
      </SwitchItem>
    </Grid>
  );
}


//Old version before ChatGPT below.





// import React from 'react';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import Switch from '@mui/material/Switch';
// import Grid from '@mui/material/Grid';
// import makeStyles from '@mui/styles/makeStyles';
// import Typography from '@mui/material/Typography';

// const useStyles = makeStyles(theme => ({
//     grid: {
//         flexBasis: "100%",
//         width: "100%",
//         padding: theme.spacing(1),
//         textAlign: "left",
//     },
//     switch: {
//       flexBasis: "100%",
//       width: "100%",
//       padding: theme.spacing(1),
//       textAlign: "center",
//   },
//     text: {
//       textAlign: "left",
//       fontWeight: 'bold'
//     },
//     textField: {
//       verticalAlign: "baseline"
//     },
//     label: {
//       fontSize: "0.9em"
//     }

// }));

// export default function CombinedEventRow(props) {
//     const classes = useStyles();

//     return (


//       <Grid 
//           container
//           direction="row"
//           justifyContent="space-evenly"
//           alignItems="baseline"
//       >
//         <Grid item xs={12} sm={3} className={classes.grid}>
//           <Typography variant="overline" className={classes.text}>{props.consts.name}</Typography>
//         </Grid>
//         <Grid item xs={6} sm={3} className={classes.grid}>
//         <TextField 
//           className={classes.textField}
//           label='result'
//           fullWidth={true} 
//           name={props.consts.resultName} 
//           id={props.id} 
//           type='text' 
//           value={props.event.result} 
//           onChange={props.onResultChange.bind(this)} 
//           InputProps={{
//             endAdornment: <InputAdornment position="end">{props.consts.resultUnit}</InputAdornment>,
//           }}
//         />
//       </Grid>
//       <Grid item xs={6} sm={3} className={classes.grid}>
//         <TextField 
//           className={classes.textField}
//           label='points' 
//           fullWidth={true} 
//           name='points' 
//           id={props.id} 
//           type='number'
//           value={props.event.points}
//           onChange={props.onPointsChange.bind(this)}
//         />
//       </Grid>
//       <Grid item xs={12} sm={3} className={classes.switch}>
//         {props.showManual ? <FormControlLabel labelPlacement="rigth"
//         classes={{
//           label: classes.label,
//         }}
//       control={
//         <Switch id={props.id} size="small" onChange={props.onToggle.bind(this)} />
//       }
//       label="Manual timing"
//     />: null}
//       </Grid>
      
//   </Grid>
//     );
//   }
