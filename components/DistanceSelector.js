import React from 'react';
import { css } from '@emotion/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';

const GridItem = styled(Grid)`
  flex-basis: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export default function DistanceSelector(props) {
  const [distance, setDistanceValue] = React.useState(props.initialDistance);

  React.useEffect(() => {
    distChanged();
  }, [distance]);

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
        justifyContent="center"
        alignItems="flex-start"
      >
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="1500"
            labelPlacement="bottom"
            control={<Radio />}
            label="1 500 m"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="1609.34"
            labelPlacement="bottom"
            control={<Radio />}
            label="1 mi"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="4828.03"
            labelPlacement="bottom"
            control={<Radio />}
            label="3 mi"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="5000"
            labelPlacement="bottom"
            control={<Radio />}
            label="5 km"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="8046.72"
            labelPlacement="bottom"
            control={<Radio />}
            label="5 mi"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="10000"
            labelPlacement="bottom"
            control={<Radio />}
            label="10 km"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="15000"
            labelPlacement="bottom"
            control={<Radio />}
            label="15 km"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="16093.4"
            labelPlacement="bottom"
            control={<Radio />}
            label="10 mi"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="21097.5"
            labelPlacement="bottom"
            control={<Radio />}
            label="1/2 marathon"
          />
        </GridItem>
        <GridItem item xs={6} sm={4} md={3}>
          <FormControlLabel
            value="42195"
            labelPlacement="bottom"
            control={<Radio />} 
            label="marathon" 
          />
        </GridItem>
    </Grid>
</RadioGroup>
);
}


//Old version before ChatGPT


// import React from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Grid from '@mui/material/Grid';
// import makeStyles from '@mui/styles/makeStyles';

// const useStyles = makeStyles(theme => ({
//     grid: {
//         flexBasis: "100%",
//         width: "100%",
//         padding: theme.spacing(1),
//     },

// }));

// export default function DistanceSelector(props) {
//     const [distance, setDistanceValue] = React.useState(props.initialDistance);
//     const classes = useStyles();
  
//     //if 'distance' varable changes, call distChanged()
//     React.useEffect(() => {
//         distChanged();
//       }, [distance])


//     function handleChange(event) {
//         setDistanceValue(event.target.value);      
//     }
  
//     function distChanged() {
//         props.onDistanceChange(distance);    
//     }

//     return (
//         <RadioGroup
//             aria-label="distance"
//             name="distance" 
//             value={distance}
//             onChange={handleChange}
//         >
//             <Grid 
//                 container
//                 direction="row"
//                 justifyContent="center"
//                 alignItems="flex-start"
//             >
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="1500" labelPlacement='bottom' control={<Radio />} label="1 500 m" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="1609.34" labelPlacement='bottom' control={<Radio />} label="1 mi" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="4828.03" labelPlacement='bottom' control={<Radio />} label="3 mi" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="5000" labelPlacement='bottom' control={<Radio />} label="5 km" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="8046.72" labelPlacement='bottom' control={<Radio />} label="5 mi" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="10000" labelPlacement='bottom' control={<Radio />} label="10 km" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="15000" labelPlacement='bottom' control={<Radio />} label="15 km" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="16093.4" labelPlacement='bottom' control={<Radio />} label="10 mi" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="21097.5" labelPlacement='bottom' control={<Radio />} label="1/2 marathon" />
//                 </Grid>
//                 <Grid item xs={6} sm={4} md={3} className={classes.grid}>
//                     <FormControlLabel className={classes.radio} value="42195" labelPlacement='bottom' control={<Radio />} label="marathon" />
//                 </Grid>
//             </Grid>
//         </RadioGroup>
//     );
// }