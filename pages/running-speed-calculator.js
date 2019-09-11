import SpeedCalculator from '../components/SpeedCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Running Speed Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Running Speed Calculator</h2>
    <p>Calculate running speed from time and distance. Calculator shows the result in the most used units including minutes/km and minutes/mile. You can input distance in meters, feet, kilometers or miles.</p>
    <div style={{paddingTop: "40px", paddingBottom: "40px"}}>
      <SpeedCalculator></SpeedCalculator>
    </div>
    <h3>How to Use the Calculator?</h3> 
    <p>Insert your total running time in hours, minutes and seconds fields. Insert also your running distance and select the unit you want to use for distance. The calculator will calculate the speed in most used units.</p>
    <p>Speed is calculated by dividing running distance with used time. Calculator calculates speed always to m/s and converts it to other units using following conversions:</p>
    <ul>
      <li>km/h = 3.6 * m/s</li>
      <li>mph = 2.23694 * m/s</li>
      <li>ft/s = 3.28084 * m/s</li>
    </ul>
    <p>The calculator also calculates running pace. This indicates how many minutes is used for one kilometer or one mile.</p>
  </Layout>
)