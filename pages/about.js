import Head from "next/head";

//Omat
import Layout from "../components/Layout.js";

const About = () => (
  <Layout>
    <Head>
      <title>About | SportCalculators</title>
    </Head>

    <h2 className="calculator">About</h2>
    <p>
      SportCalculators.com is the place for all your sport related calculations.
      We know that you are more interested in the sport you are doing than
      calculations it requires. So are we.
    </p>
    <p>
      We are constantly looking for calculations needed in various sports so
      that we can make a calculator and ease your life. If you know any
      calculator that is missing from our site, <a href="/contact">contact</a> us and let us
      know.
    </p>
    <p>
      Even though we have checked all the calculators countless times, we cannot
      guarantee that they are flawless. We hope you understand. If you find any
      errors from the calculators, please <a href="/contact">let us know</a>.
    </p>
    <p>Thank you for visiting and welcome again!</p>
  </Layout>
);

export default About;
