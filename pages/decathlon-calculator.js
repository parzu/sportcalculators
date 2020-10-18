import DecathlonCalculator from "../calculators/DecathlonCalculator.js";
import Layout from "../components/Layout.js";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import AdSenseWidget from "../components/AdSenseWidget.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    overflowX: "auto",
    textAlign: "center",
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
  createData("100 m", 25.4347, 18, 1.81),
  createData("Long jump", 0.14354, 220, 1.4),
  createData("Shot put", 51.39, 1.5, 1.05),
  createData("High jump", 0.8465, 75, 1.42),
  createData("400 m", 1.53775, 82, 1.81),
  createData("110 m hurdles", 5.74352, 28.5, 1.92),
  createData("Discus throw", 12.91, 4, 1.1),
  createData("Pole vault", 0.2797, 100, 1.35),
  createData("Javelin throw", 10.14, 7, 1.08),
  createData("1500 m", 0.03768, 480, 1.85),
];

export default function DecathlonCalcPage(props) {
  const classes = useStyles();

  return (
    <Layout>
      <Head>
        <title>Decathlon Calculator | SportCalculators</title>
        <meta
          name="description"
          content="A decathlon calculator which calculates results to points and points to results. Do you know the performance needed to get 1000 points in each event? Find out with this decathlon calculator."
        ></meta>
      </Head>

      <h2 className="calculator">Decathlon Calculator</h2>
      <p>
        This calculator allows you to calculate decathlon score. You can
        calculate points from results or results from points. You can use the
        results from points calculation to estimate needed results for each
        event.
      </p>
      <AdSenseWidget />
      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <DecathlonCalculator></DecathlonCalculator>
      </div>
      <AdSenseWidget />

      <h3>How to Use the Calculator?</h3>
      <p>
        The decathlon calculator is easy to use. Select the calculation
        direction at the top of the calculator and then enter either results or
        points to text fields. When you change the focus out from a text field
        the result/points of the event are calculated. If manual timing is used
        in running events use the checkbox below each running event to adjust
        the calculation accordingly. How it effects the calculation is explained
        below.
      </p>

      <h3>Decathlon</h3>
      <p>
        Decathlon is a combined event in athletics with ten events. Events are
        usually competed on two consecutive days on track or field. Each event
        is scored according to a point system and points achieved determine the
        winner. The point system is based on the result not the position in the
        event. Scoring over 9000 points is really rear and has been done only a
        few times. The list for the best results all time is available on{" "}
        <a
          href="https://www.iaaf.org/records/all-time-toplists/combined-events/decathlon/outdoor/men/senior"
          target="_blank"
        >
          IAAF's site
        </a>
        . Use the decathlon calculator above to find out what kind of
        performance is needed to get 1000 points in each event and break the
        world record.
      </p>

      <h3>Events</h3>
      <p>The events are always competed in the same following order.</p>
      <h4>Day 1</h4>
      <ul>
        <li>100 metres</li>
        <li>Long jump</li>
        <li>Shot put</li>
        <li>High jump</li>
        <li>400 metres</li>
      </ul>
      <h4>Day 2</h4>
      <ul>
        <li>110 metres hurdles</li>
        <li>Discus throw</li>
        <li>Pole vault</li>
        <li>Javelin throw</li>
        <li>1500 metres</li>
      </ul>

      <h3>How to Calculate Decathlon Points</h3>
      <p>Decathlon points are calculated using the following formulas:</p>
      <ul>
        <li>
          Points = INT(A(B — P)^C) for track events (faster time produces a
          better score)
        </li>
        <li>
          Points = INT(A(P — B)^C) for field events (greater distance or height
          produces a better score)
        </li>
      </ul>
      <p>
        INT in the formula means that points are rounded to nearest integer. P
        is the result of an event. It is measured in seconds for track events,
        in meters for throwing events and in centimeters for jumping events. A,
        B and C in the formula are taken from a table. Since 1984 the table has
        been the following:
      </p>
      <TableContainer>
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
            {rows.map((row) => (
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
      </TableContainer>
      <p>
        All times used should be automatically measured. If manual timing is
        used 0.24s is added to 100m and 110m hurdles and 0.14s to 400m race.
      </p>
    </Layout>
  );
}
