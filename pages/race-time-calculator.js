import RaceTimeCalculator from '../components/RaceTimeCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Race Time Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Race Time Calculator</h2>
    <p>With this calculator you can predict a race time based on your recent run. Enter your time on one distance and see a prediction for another distance. I use this after every run to see what my time on marathon would have been. Just keep in mind that it's still a prediction.</p>
    <RaceTimeCalculator></RaceTimeCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p>Just enter a time of your run and select a distance. Press calculate and you will see split times for various distances.</p>
    <p>The prediction is based on the formula developed by Pete Riegel and published first in a slightly different form in Runner's World, August 1977. The formula is T2 = T1 x (D2/D1)^1.06. T2 is the predicted time and D2 is the distance for prediction. T1 is a known time for the distance D1. So in this calculator the D1 is the distance you choose and T1 is the time you set to the fields. T2 is calculated for various distances D2. This formula is widely used to predict race times. Try it out with the race time calculator above.</p>
  </Layout>
)