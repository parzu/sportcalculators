import Layout from '../components/Layout.js';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
    textAlign: 'center',
  },
  table: {
    minWidth: 300,
    maxWidth: 600,
    
  },
}));

function createData(event, a, b, c) {
  return { event, a, b, c };
}

const women = [
  createData('100 metres hurdles',	9.23076,	26.7,	1.835),
  createData('High jump',	1.84523,	75.0,	1.348),
  createData('Shot put',	56.0211,	1.50,	1.05),
  createData('200 metres',	4.99087,	42.5,	1.81),
  createData('Long jump',	0.188807,	210,	1.41),
  createData('Javelin throw',	15.9803,	3.80,	1.04),
  createData('800 metres',	0.11193,	254,	1.88),
];

const men = [
    createData('60 metres',	58.0150,	11.50,	1.81),
    createData('Long jump',	0.14354,	220.00,	1.40),
    createData('Shot put',	51.39,	1.50,	1.05),
    createData('High jump',	0.8465,	75.00,	1.42),
    createData('60 meters hurdles',	20.5173,	15.50,	1.92),
    createData('Pole voult',	0.2797,	100.00,	1.35),
    createData('1000 metres',	0.08713,	305.50,	1.85),

  ];

export default function HeptathlonScoringPage(props) {
    const classes = useStyles();

return (
  <Layout>
    <Head>
      <title>Heptathlon Scoring | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Heptathlon Scoring</h2>
    <p>There are two kinds of heptathlons. The one is women's outdoor heptathlon and the other is men's indoor heptathlon. Both versions consist of different events and have also different scoring systems. However the basic principle in both heptathlons is the same. The result in each of the seven events is transformed into points and the points from all the events are summed. The higher the sum, the better the performance of the athlete. The best results in the world are in the women's heptathlon around 7000 points and in the men's heptathlon around 6500 points. So a very good score from one event is around 1000 points.</p>
    
    <p>In the official competitions, scoring tables for each event is used. The scoring tables are issued by the <a href="https://www.iaaf.org/home" target="_blank">International Association of Athletics Federations (IAAF)</a>. Here you can find the current <a href="https://www.iaaf.org/about-iaaf/documents/technical#scoring-tables" target="_blank">scoring tables</a>. The tables are constructed by using the calculation method described below. However the calculation method may give decimal fractions for points, but this is not an issue in the official competitions where scoring tables are used. In the scoring tables, however, might not be points marked for each result. In these cases the closest lower points are used as a result from an individual event.</p>

    <p>Calculating the score for individual event is based on a formula and a table of constants. The used formula depends on the event type and there are different formulas for running, jumping and throwing events. The formulas used are same for both the women's heptathlon and the men's heptathlon. The formulas are the following:</p>

    <h5>For running events (200m, 800m and 100m hurdles):</h5>
    <p>P = a * (b-T)^c</p>
    <p>Where P is points, T is time in seconds and a, b and c are taken from the table shown below.</p>

    <h5>For jumping events (high jump and long jump):</h5>
    <p>P = a * (M-b)^c</p>
    <p>Where P is points, M is the height or length in centimeters and a, b and c are taken from the table shown below.</p>

    <h5>For throwing events (shot put and javelin):</h5>
    <p>P = a * (D-b)^c</p>
    <p>Where P is points, D is length in meters and a, b and c are taken from the table shown below.</p>

    <p>The tables where a, b and c are taken for the formulas are different for men and women. The tables have also changed during the years, but have been quite constant now for a long time. Below are the tabels for both.</p>

    <h4>Women's heptathlon scoring table</h4>

    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Event</TableCell>
          <TableCell align="right">A</TableCell>
          <TableCell align="right">B</TableCell>
          <TableCell align="right">C</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {women.map(row => (
          <TableRow key={row.event}>
            <TableCell component="th" scope="row">
              {row.event}
            </TableCell>
            <TableCell align="right">{row.a}</TableCell>
            <TableCell align="right">{row.b}</TableCell>
            <TableCell align="right">{row.c}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <h4>Men's heptathlon scoring table</h4>

    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Event</TableCell>
          <TableCell align="right">A</TableCell>
          <TableCell align="right">B</TableCell>
          <TableCell align="right">C</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {men.map(row => (
          <TableRow key={row.event}>
            <TableCell component="th" scope="row">
              {row.event}
            </TableCell>
            <TableCell align="right">{row.a}</TableCell>
            <TableCell align="right">{row.b}</TableCell>
            <TableCell align="right">{row.c}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <p>Both tables are for automatic timing. If manual timing is used in running events the running time should be adjusted. For events shorter than 400 meters the time should be substracted by 0.24 seconds and for 400 meters 0.14 seconds. For races longer than 400 meters the adjustment for manual timing is not used.</p>

    <p>You can try how the scoring works with our <a href="/heptathlon-calculator">heptathlon calculator</a>. With the calculator you can calculate from points to results and from results to points.</p>

</Layout>
);
}

