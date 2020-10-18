import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";

//Omat
import Layout from "../components/Layout.js";
import TriathlonCalculator from "../calculators/TriathlonCalculator.js";
import AdSenseWidget from "../components/AdSenseWidget.js";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 300,
    maxWidth: 800,
  },
}));

function createData(event, swim, bike, run) {
  return { event, swim, bike, run };
}

const rows = [
  createData("Sprint distance", "750m / 0.47mi", "20km / 12mi", "5km / 3.1mi"),
  createData(
    "Standard / Olympic distance",
    "1.5km / 0.93mi",
    "40km / 25mi",
    "10km / 6.2mi"
  ),
  createData(
    "Long Course / Half-ironman / 70.3",
    "1.9km / 1.2mi",
    "90km / 56mi",
    "21.1km / 13.1mi"
  ),
  createData(
    "Ultra distance / Ironman / 140.6",
    "3.8km / 2.4mi",
    "180.2km / 112mi",
    "42.2.km / 26.2mi"
  ),
];

const ThriathlonCalculator = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Head>
        <title>Triathlon Calculator | SportCalculators</title>
        <meta
          name="description"
          content="A mobile-friendly triathlon calculator with preset distances. Calculates event and total times and needed speeds for swimming, cycling and running."
        ></meta>
      </Head>

      <h2 className="calculator">Triathlon Calculator</h2>
      <p>
        This triathlon calculator helps you to calculate your final time or the
        speeds and paces needed to achieve your target time in a triathlon race.
        Enter all the individual race times or speed/paces and include the
        transition times to get the total time. You can use preset race
        distances or your own custom distances.
      </p>
      <AdSenseWidget />
      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <TriathlonCalculator></TriathlonCalculator>
      </div>
      <AdSenseWidget />
      <h3>How to Use the Calculator?</h3>
      <p>Using the triathlon calculator is easy.</p>
      <ul>
        <li>First select the units and the distances you want to use.</li>
        <li>
          Then enter either the pace/speed or the target time for each
          individual race.
        </li>
        <ul>
          <li>
            If you enter the pace/speed the time is calculated automatically
            based on the currently selected distance.
          </li>
          <li>
            On the other hand, if you enter the target time the pace/speed is
            calculated automatically for the selected distance.
          </li>
          <li>
            If you change the distance the pace/speed remains the same and the
            time for each individual race is recalculated based on the new
            distances and the speed/pace.
          </li>
        </ul>
      </ul>
      <p>
        The total time is automatically calculated after every input. Try it out
        yourself with the triathlon calculator above.
      </p>
      <div style={{ minHeight: "600px" }}>
        <h3>Triathlon</h3>
        <div style={{ float: "left", paddingRight: "10px" }}>
          <img src="../static/triathlon_swim_montage.jpg" />
          <p style={{ fontSize: "8px" }}>
            Image by JKrabbe ,{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File%3ATriathlon_swim_montage.jpg"
              target="_blank"
            >
              Wikimedia Commons
            </a>
            .
          </p>
        </div>
        <p>
          A Triathlon is a multisport race combining of three different sports.
          The sports are in order: swimming, cycling and running. The individual
          events are completed without a break between them. Triathletes compete
          for the best overall time of all events and the timed transitions
          between them. Triathlon is a highly demanding endurance sport.
        </p>
        <p>
          In a triathlon race the competitor is timed for all the individual
          legs of the race. The times represented are usually swimming time,
          cycling time (including transitions), running time and the total time.
          In some events the transitions may be timed separately.
        </p>
        <p>
          The history of triathlon goes back to 1920's France, where various
          kinds of three sport races were held. Some of the races had different
          sports than modern day triathlon, but most of them included swimming,
          cycling and running in some order. The origin of the triathlon is
          attributed to a race held during 1920s-1930s in France near
          Joinville-le-Pont, in Meulan and Poissy. This race is still held every
          year.
        </p>
        <p>
          The triathlon has been in the summer Olympics since Sydney 2000 and in
          Olympics obviously the Olympic distances are used. In the Olympics,
          both men and women compete with same distances. The race starts with a
          mass start and drafting is allowed in cycling phase. You can read more
          about triathlon in the summer Olympics from the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Triathlon_at_the_Summer_Olympics"
            target="_blank"
          >
            wikipedia
          </a>
          .
        </p>
      </div>
      <h3>Triathlon Distances</h3>
      <p>
        Distances used in triathlon races vary according to competition. Each
        distance may be almost anything imaginable, but the four most common
        distance combinations are the following:
      </p>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Competition Name</TableCell>
              <TableCell align="right">Swimming</TableCell>
              <TableCell align="right">Cycling</TableCell>
              <TableCell align="right">Running</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.event}>
                <TableCell component="th" scope="row">
                  {row.event}
                </TableCell>
                <TableCell align="right">{row.swim}</TableCell>
                <TableCell align="right">{row.bike}</TableCell>
                <TableCell align="right">{row.run}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p>
        In the Ironman race the running distance of 42.2km/26.2mi is equal to
        full marathon and it the half-ironmann the running distance of
        21.1km/13.1mi is equal to half marathon. (You can use our{" "}
        <a href="marathon-calculator">marathon calculator</a> to estimate the
        split times to achieve your target time.) The names 70.3 and 140.6 used
        for competitions equals the total miles of the competition distances. So
        the half-ironman race is in total 70.3 miles and the ironman race is in
        total 140.6 miles.
      </p>
    </Layout>
  );
};

export default ThriathlonCalculator;
