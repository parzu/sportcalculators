import HeptathlonCalculator from '../components/HeptathlonCalculator.js';
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

const rows = [
  createData('100 metres hurdles',	9.23076,	26.7,	1.835),
  createData('High jump',	1.84523,	75.0,	1.348),
  createData('Shot put',	56.0211,	1.50,	1.05),
  createData('200 metres',	4.99087,	42.5,	1.81),
  createData('Long jump',	0.188807,	210,	1.41),
  createData('Javelin throw',	15.9803,	3.80,	1.04),
  createData('800 metres',	0.11193,	254,	1.88),

];


export default function HeptathlonCalcPage(props) {
    const classes = useStyles();

return (
  <Layout>
    <Head>
      <title>Heptathlon Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Heptathlon Calculator</h2>
    <p>With this heptathlon calculator you can calculate heptathlon points from results and results from points. Use the results from points calculation to estimate needed performance for your target. This calculator is for women's outdoor heptathlon.</p>
    <div style={{paddingTop: "40px", paddingBottom: "40px"}}>
      <HeptathlonCalculator></HeptathlonCalculator>
    </div>
  
    <h3>How to Use the Calculator?</h3> 
    <p>The heptathlon calculator is easy to use. Select the calculation direction at the top of the calculator and then enter either results or points to text fields. When you change the focus out from a text field the result/points of the event are calculated. If manual timing is used in running events use the checkbox below each running event to adjust the calculation accordingly. How it effects the calculation is explained below.</p>
  
    <h3>Heptathlon</h3>
    <p>Heptathlon is a combined events contest consisting of seven events. Events are competed on track or field. There are two types of heptathlons. One is women's outdoor heptathlon and the other is men's indoor heptathlon. This heptathlon calculator is for women's heptathlon. Outdoors men usually compete on decathlon (see <a href="/decathlon-calculator">decathlon calculator</a>). Scoring over 7000 points in heptathlon is very rare and it has been done only few times.</p>
  
    <p>Women's heptathlon consists of the following events. First four of them are competed on the first day, and the rest on the second day:</p>
    <ul>
      <li>100 meters hurdles</li>
      <li>High jump</li>
      <li>Shot put</li>
      <li>200 metres</li>
      <li>Long jump</li>
      <li>Javelin throw</li>
      <li>800 metres</li>
    </ul>

    <p>Before the early 1980s women's primary combined event contest was pentathlon. Pentathlon was replaced by heptathlon in the 1984 Olympic games. 200 meters run and javelin throw were added to the pentathlon. Also the hurdles race got longer from 60m to 100m. In the recent years women's decathlon competitions has also been conducted. It consists of same events than men's decathlon but with different order. Also the calculation table is different so men's decathlon calculator cannot be used to calculate women's decathlon.</p>
    
    <p>IAAF (International Association of Athletics Federations) has good site for heptathlon. They also keep up the records from competitions around the world. You can read more on their <a href="https://www.iaaf.org/disciplines/combined-events/heptathlon" target="_blank">site</a>.</p>

    <h3>How to Calculate Heptathlon Points</h3>
    <p>Here's a brief introduction on how the heptatlon points are calculated. Read this article for more indepth explanation on <a href="/heptathlon-scoring">heptathlon scoring</a>.</p>
    <p>Heptathlon points are calculated using the following formulas:</p>

    <ul>
      <li>Points = INT(A(B — P)^C) for track events (faster time produces a better score)</li>
      <li>Points = INT(A(P — B)^C) for field events (greater distance or height produces a better score)</li>
    </ul>
    <p>INT in the formula means that points are rounded to nearest integer. P is the result of an event. It is measured in seconds for track events, in meters for throwing events and in centimeters for jumping events. A, B and C in the formula are taken from a table. Since 1984 the table has been the following:</p>
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
        {rows.map(row => (
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
    <p>All times used should be automatically measured. If manual timing is used 0.24s is added to 200m and 110m hurdles race.</p>
  </Layout>
);
}

