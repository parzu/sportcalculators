import BowlingHandicapCalculator from '../components/BowlingHandicapCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Bowling Handicap Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Bowling Handicap Calculator</h2>
    <p></p>
    <BowlingHandicapCalculator></BowlingHandicapCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p></p>
    <p></p>
  </Layout>
)