import Head from "next/head";

//Omat
import Layout from "../components/Layout.js";
import MarathonCalculator from "../calculators/MarathonCalculator.js";

const MarathonCalculatorPage = () => (
  <Layout>
    <Head>
      <title>Marathon Calculator | SportCalculators</title>
      <meta
        name="description"
        content="This marathon calculator tells how fast you have to run shorter distances to make your goal time at the marathon. It is good for setting goal times to be used during training."
      ></meta>
    </Head>

    <h2 className="calculator">Marathon Calculator</h2>
    <p>
      This marathon calculator tells how fast you have to run shorter distances
      to make your goal time at the marathon. It is good for setting goal times
      to be used during training. Find out how fast world record holder have to
      run the shorter distances. Can you keep up the pace for even a mile?
    </p>
    <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <MarathonCalculator></MarathonCalculator>
    </div>
    <h3>How to Use the Calculator?</h3>
    <p>
      Just enter your marathon goal time and press calculate. Split times for
      various shorter distances will be shown. Try out the world record
      (2:01:39,{" "}
      <a
        href="https://en.wikipedia.org/wiki/Marathon_world_record_progression"
        target="_blank"
      >
        Wikipedia
      </a>
      ) and see if you can keep up with the pace.
    </p>
    <p>
      The prediction is based on the formula developed by Pete Riegel and
      published first in a slightly different form in Runner's World, August
      1977. The formula is T2 = T1 x (D2/D1)^1.06. T2 is the predicted time and
      D2 is the distance for prediction. T1 is a known time for the distance D1.
      So in this calculator the D1 is the distance of the marathon (41.195 km)
      and T1 is the time you set to the fields. T2 is calculated for various
      distances D2. Just try it out and you see what I mean.
    </p>
    <h3>Marathon</h3>
    <p>
      Marathon is long-distance running event with an official distance of
      42.195 kilometres (26 miles and 385 yards). It is the distance between
      Marathon and Athens in Greece.{" "}
      <a
        href="https://en.wikipedia.org/wiki/Battle_of_Marathon#Marathon_run"
        target="_blank"
      >
        Marathon is loosely based
      </a>{" "}
      on the event in Greek mythology where a messenger run this distance to
      announce the Greek victory over the Persians. However this common
      perception is not entirely accurate.
    </p>
  </Layout>
);

export default MarathonCalculatorPage;
