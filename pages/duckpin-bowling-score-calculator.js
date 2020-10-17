import DuckpinBowlingScoreCalculator from "../calculators/DuckpinBowlingScoreCalculator.js";
import Layout from "../components/Layout.js";
import Head from "next/head";

const DuckpinCalculator = () => (
  <Layout>
    <Head>
      <title>Duckpin Bowling Score Calculator | SportCalculators</title>
      <meta
        name="description"
        content="The best and probably the only duckpin bowling score calculator on the internet. This calculator can also be used for candlepin bowling."
      ></meta>
    </Head>

    <h2 className="calculator">Duckpin Bowling Score Calculator</h2>
    <p>
      The best and probably the only duckpin bowling score calculator on the
      internet. This calculator can also be used for candlepin bowling.
    </p>
    <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <DuckpinBowlingScoreCalculator></DuckpinBowlingScoreCalculator>
    </div>
    <h3>How to Use the Calculator?</h3>
    <p>
      Push the buttons for values for each frame throw by throw. The calculator
      calculates your current score after each input and enables only the
      buttons you are able to push. Push "X" for strike and "/" for spare. You
      can start a new game at any point be pressing the "new game" button.
      Please note that your score is not saved, so if you refresh the page, you
      might loose your score.
    </p>

    <h3>Duckpin Bowling</h3>

    <div>
      <div style={{ float: "left", paddingRight: "10px" }}>
        <img
          style={{ maxWidth: "250px" }}
          src="../static/Duckpins_closeup.jpg"
        />
        <p style={{ fontSize: "8px" }}>
          Image: Valerie Everett / Wikimedia Commons / CC-BY-SA-2.0
        </p>
      </div>
      <div style={{ display: "inline" }}>
        <p>
          Duckpin bowling is a variation of more popular 10-pin bowling. It is
          played mainly on the east coast of the United States. The balls used
          in duckpin bowling are significantly smaller than in 10-pin bowling
          and lack finger holes. The pins are arranged in a similar triangular
          shape than in 10-pin bowling. However, pins are shorter, smaller and
          lighter. This makes achieving a strike extremely difficult. For these
          reasons the player is allowed to use three throws per frame in every
          frame. See this{" "}
          <a href="http://www.duckpins.com/" rel="noopener" target="_blank">
            great site
          </a>{" "}
          for much more detailed information about duckpin bowling.
        </p>
      </div>
    </div>

    <h3>How to score a duckpin bowling game?</h3>
    <p>
      The scoring is quite similar than in ten-pin bowling. (
      <a href="bowling-score-calculator" rel="noreferrer">
        See the explanation for scoring a ten-pin bowling game.
      </a>
      ) The scoring in candlepin bowling is similar than in duckpin bowling.
      This means that the calculator above can also be used for candlepin
      bowling.
    </p>
    <p>
      The only difference is that there are three throws in each frame. Strike
      and spare are similar than in ten-pin bowling. The third throw is scored
      always as an open frame. So if you knock out all the pins with three
      throws you get 10 points for that frame. The next frame won't affect on
      the score of that frame like it does on strikes and spares. Try this out
      with the duckpin bowling score calculator above and you see what happens.
    </p>
  </Layout>
);

export default DuckpinCalculator;
