import BowlingHandicapCalculator from "../calculators/BowlingHandicapCalculator.js";
import Layout from "../components/Layout.js";
import Head from "next/head";
import AdSenseWidget from "../components/AdSenseWidget.js";

const BowlingHandicapCalculatorPage = () => (
  <Layout>
    <Head>
      <title>Bowling Handicap Calculator | SportCalculators</title>
      <meta
        name="description"
        content="A simple bowling handicap calculator and an explanation of the bowling handicap system. SportCalcualtors.com has all the sport related calculators you ever need."
      ></meta>
    </Head>

    <h2 className="calculator">Bowling Handicap Calculator</h2>
    <p>
      This is a simple calculator for calculating your bowling handicap. Use it
      together with our bowling score calculator and you don't need any other
      bowling related calculators.
    </p>
    <AdSenseWidget />
    <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <BowlingHandicapCalculator></BowlingHandicapCalculator>
    </div>
    <AdSenseWidget />
    <h3>How to Use the Calculator?</h3>
    <p>
      Just enter your bowling average, basis score and percentage factor and
      press calculate to get your handicap. You can also enter your game score
      to calculate adjusted score.
    </p>

    <h3>Bowling Handicap</h3>

    <p>
      A handicap system is used in various sports to equalize the chance of
      winning for players with different skills. You can read more about
      handicapping in general for example from{" "}
      <a
        rel="noopener"
        href="https://en.wikipedia.org/wiki/Handicapping"
        target="_blank"
      >
        Wikipedia
      </a>
      . In bowling a calculated handicap value is added to the game score to
      adjust the result. The handicap value is based on previous games bowled by
      the player. The lower the average score of previous games the higher the
      handicap value. This way making it possible for players at any level to
      compete in same competitions.
    </p>

    <p>
      You can read more about bowling handicap in{" "}
      <a
        rel="noopener"
        href="https://www.bowlingball.com/BowlVersity/handicap-in-bowling"
        target="_blank"
      >
        here
      </a>
      .
    </p>

    <h3>Calculating Bowling Handicap</h3>
    <p>
      A bowling handicap is a percentage of the difference between your average
      and a basis average. So for calculating you need to know the used basis
      average and the used percentage factor. You get these from your league or
      tournament officials. If you are not competing in either of those, you can
      decide those values with your competitors. Usual values are 200, 210 or
      220 for basis average and 80%, 90% or 100% for percentage factor. The
      basis average is intended to be more than any individual bowler’s average.
    </p>

    <p>
      To find out your average add the scores from your previous games and
      divide the result with the number of games. If you are bowling in a league
      you probably must use game scores from league games. Otherwise, once
      again, you can decide the number of games with your competitors. Let's say
      you decided to use three previous games with scores 157, 143 and 142. The
      sum of these is 442 and when you divide it with 3 you get 147.3 pins per
      game. Drop a fraction of a pin and your official average is 147.
    </p>

    <p>
      Subtract your average from the basis score and multiply the result with
      the percentage factor. Let's say that the basis score is 200 and the
      percentage factor is 90%. You get (200-147)x0.9=47.7. Once again drop the
      fraction and your handicap is 47. To get your adjusted score, simply add
      the handicap to your game score. For example if you get 143, your adjusted
      score is 190. Try this out with the bowling handicap calculator above.
    </p>

    <p>Below is also a video explaining how to calculate bowling handicap.</p>

    <div
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "56.25%",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          maxWidth: "560px",
          maxHeight: "315px",
          border: "0",
        }}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/klZrNT5ns_M"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </Layout>
);

export default BowlingHandicapCalculatorPage;
