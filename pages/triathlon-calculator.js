import TriathlonCalculator from '../components/TriathlonCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

const ThriathlonCalculator = () => (
  <Layout>
    <Head>
      <title>Triathlon Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Triathlon Calculator</h2>
    <p></p>
    <TriathlonCalculator></TriathlonCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p></p>
    <p></p>
  </Layout>
)

export default ThriathlonCalculator;