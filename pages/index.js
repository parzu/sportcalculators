import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout.js';
import { calculators } from '../src/calculators.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  hero: {
    paddingTop: "100px",
    paddingBottom: "100px",
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  headline: {
      fontWeight: theme.typography.fontWeightLight,  
      letterSpacing: ".3rem",
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.pxToRem(32),
        letterSpacing: ".7rem",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.typography.pxToRem(64)
      },
      paddingBottom: "20px",
  },
  subheader: {
    fontWeight: theme.typography.fontWeightMedium,  
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(32),
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.pxToRem(64)
    }
  },
  cardgrid: {
    flexBasis: "100%",
    width: "100%",
    padding: theme.spacing(1),
  },
  card: {
    fontSize: theme.typography.pxToRem(9),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(12),
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.pxToRem(16)
    },
    color: theme.palette.primary.main,
  },
}));

function CalculatorCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={6} md={4} className={classes.cardgrid}>
      <Card className={classes.card}>
         <CardActionArea href={props.calc.href}>
          <CardHeader
            titleTypographyProps={{
              variant:'caption',
              classes: {
                caption: classes.card
              }
            }}
            avatar={props.icon}
            title={props.calc.title}
          />
        </CardActionArea> 
      </Card>
    </Grid>
  );
}

function SportCards(props) {
  const classes = useStyles();
  return (
    <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    >
      <Grid item xs={12} className={classes.cardgrid}>
        <Typography variant="h6">
          {props.item.sport}
        </Typography>
      </Grid>
      {props.item.calculators.map((calc, index) =>
        <CalculatorCard key={index} calc={calc} icon={props.item.icon} />
      )}
    </Grid>
  );
}

export default function Index() {
  const classes = useStyles();
  
  return (
    <Layout className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} className={classes.hero}>
          <Typography className={classes.headline} variant="h1" component="h1">
            SPORTCALCULATORS
          </Typography>
          <Typography variant="h6" className={classes.subheader}>
            The best online collection of sports related calculators
          </Typography>
        </Grid>
      </Grid>
      {calculators.map((item, index) =>              
          <SportCards key={index} item={item} />
      )}
    </Layout>
  );
}
