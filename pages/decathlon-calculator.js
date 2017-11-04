import DecathlonCalculator from '../components/DecathlonCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Decathlon Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Decathlon Calculator</h2>
    <p></p>
    <DecathlonCalculator></DecathlonCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p></p>
    <p></p>
  </Layout>
)