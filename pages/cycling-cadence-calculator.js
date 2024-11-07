// Create a new page in the pages directory called cycling-cadence-calculator.js. It should be similar to the cycling-speed-calculator.js page, but it should use the CadenceCalculator component instead of the SpeedCalculator component. The text should explain what cycling cadende is and how to use the calculator. The title of the page should be "Cycling Cadence Calculator | SportCalculators". The description should be "Calculate cycling cadence from speed or the other way around.".  

import Head from "next/head";
import CadenceCalculator from "../calculators/CyclingCadenceCalculator.js";
import Layout from "../components/Layout.js";
import AdSenseWidget from "../components/AdSenseWidget.js";

const CyclingCadenceCalculatorPage = () => (
  <Layout>
  <Head>
      <title>Cycling Cadence Calculator | SportCalculators</title>
      <meta
          name="description"
          content="Calculate your cycling speed based on your cadence (pedaling rate) and bike specifications. See how different cadences affect your speed in both km/h and mph."
      />
  </Head>

  <h2 className="calculator">Cycling Cadence Calculator</h2>
  <p>
      Calculate your cycling speed based on your cadence (pedaling rate) and bike specifications. Input your bike's wheel diameter, chainring teeth, and cog teeth to see how different cadences affect your speed in both km/h and mph. Perfect for finding your optimal gear ratio and understanding how cadence impacts your cycling performance.
  </p>

  <AdSenseWidget />
  <div style={{ paddingTop: "40px", paddingBottom: "40px", display: "flex", justifyContent: "center" }}>
      <CadenceCalculator></CadenceCalculator>
  </div>
  <AdSenseWidget />

  <h3>How to Use the Calculator</h3>
  <p>
      The calculator is simple to use. First, enter your bike parameters:
  </p>
  <ul>
      <li>Rim size</li>
      <li>Tire size</li>
      <li>Number of teeth on your chainring (front gear)</li>
      <li>Number of teeth on your cog (rear gear)</li>
  </ul>
  <p>
      Then, you can either input your desired cadence (RPM) or target speed. Select between km/h and mph for speed unit. The calculator will automatically compute the corresponding values. A reference table is provided below the calculator showing speeds for different cadence values based on your bike setup.
  </p>

  <h3>Understanding Cycling Cadence</h3>
  <p>
      Cadence in cycling refers to the number of pedal revolutions per minute (RPM). It's one of the key measurements in cycling, alongside speed and distance. Your cadence affects how efficiently you ride and how much energy you use while cycling.
  </p>

  <h3>Why Cadence Matters</h3>
  <p>
      Understanding and monitoring your cadence can help you improve your cycling in several ways. The right cadence helps you ride more efficiently, reduces strain on your joints, and helps you manage your energy better during rides. Using this calculator, you can see how your cadence affects your speed with your specific bike setup, helping you find the most comfortable and efficient way to ride.
  </p>

</Layout>
);

export default CyclingCadenceCalculatorPage;