import Head from "next/head";
import RunningPacePlanner from "../calculators/RunningPacePlanner.js";
import Layout from "../components/Layout.js";
import AdSenseWidget from "../components/AdSenseWidget.js";

const RunningPacePlannerPage = () => (
  <Layout>
    <Head>
      <title>Running Pace Planner | SportCalculators</title>
      <meta
        name="description"
        content="A powerful tool for runners to create a pacing strategy for races. Plan your pace for each split based on your target time and distance."
      ></meta>
    </Head>

    <h2 className="calculator">Running Pace Planner</h2>
    <p>
    The Running Pace Planner is a powerful tool that helps runners plan and visualize their pace for races and training runs. With this calculator, you can input your target distance and time, then see a detailed breakdown of the required pace for each split or lap.
    </p>
    <AdSenseWidget />
    <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <RunningPacePlanner></RunningPacePlanner>
    </div>
    <AdSenseWidget />
    <h3>How to Use the Running Pace Planner</h3>
    <p>Using the Running Pace Planner is simple:</p>
    <ol>
      <li><b>Enter Your Race Distance:</b> Input the total distance of your race or run, and select the unit (kilometers or miles).
      </li>
      <li><b>Set Your Target Time:</b> Enter your target finish time for the full distance.
      </li>
      <li><b>Customize Your Split Settings:</b> Adjust the split length, units, and pace progression to match your needs. The pace progression setting allows you to plan for even, positive, or negative splits.
      </li>
      <li><b>View the Calculated Splits:</b> The planner will automatically generate a table showing each split's distance, pace, time, and cumulative time. You can use the + and - buttons to adjust the pace of individual splits.
      </li>
      <li><b>Lock Splits:</b> If you want to lock in a specific split pace, simply click the lock/unlock icon to prevent that split from being automatically adjusted.
      </li>
    </ol>
    <h3>Understanding Splits and Pace Progression</h3>
<p>Splits are the individual segments that make up your race or run. The Running Pace Planner allows you to plan your pace for each split, which is particularly useful for longer events.
The pace progression setting determines how your pace changes throughout the run. A negative progression (faster finish) means your early splits will be slower and your final splits will be faster. A positive progression (faster start) has the opposite effect, with your early splits being faster and your final splits slower.</p>
<h3>Benefits of Using the Running Pace Planner</h3>
<ul>
  <li><b>Visualize Your Pacing Strategy:</b> See a detailed breakdown of the required pace for each split, making it easier to plan and execute your race strategy.</li>
  <li><b>Adjust Individual Splits:</b> Use the +/- buttons to fine-tune the pace of each split, allowing you to adapt to changing conditions during your run.</li>
  <li><b>Lock Important Splits:</b> Lock key splits, like your goal pace, to ensure they don't get automatically adjusted as you tweak other parts of your plan.</li>
</ul>

<p>Start planning your next race or training run with the Running Pace Planner today!</p>
  </Layout>
);

export default RunningPacePlannerPage;