import DuckpinBowlingScoreCalculator from '../components/DuckpinBowlingScoreCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Duckpin Bowling Score Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Duckpin Bowling Score Calculator</h2>
    <p></p>
    <DuckpinBowlingScoreCalculator></DuckpinBowlingScoreCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p></p>
  </Layout>
)