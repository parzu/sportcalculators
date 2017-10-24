import HeptathlonCalculator from '../components/HeptathlonCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Heptathlon Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Heptathlon Calculator</h2>
    <p></p>
    <HeptathlonCalculator></HeptathlonCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p></p>
    <p></p>
  </Layout>
)