import BowlingScoreCalculator from '../components/BowlingScoreCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Bowling Score Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Bowling Score Calculator</h2>
    <p></p>
    <BowlingScoreCalculator></BowlingScoreCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p></p>
  </Layout>
)