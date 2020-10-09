import Head from 'next/head';

//Omat
import Layout from '../components/Layout.js';
import TriathlonCalculator from '../calculators/TriathlonCalculator.js';



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