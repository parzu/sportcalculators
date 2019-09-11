import SpeedConverter from '../components/SpeedConverter.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Running Speed Converter | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Running Speed Converter</h2>
    <p>Convert running speed to running pace. Possible input units are km/h, mph, m/s or ft/s and output units are all the previous plus min/km and min/miles.</p>
    <div style={{paddingTop: "40px", paddingBottom: "40px"}}>
      <SpeedConverter></SpeedConverter>
    </div>
    <h3>How to Use the Calculator?</h3> 
    <p>Simply enter the value and choose the unit you want to convert from. Click calculate and you will see the result in various units. Click clear to clear the value and convert another value.</p>
    <p>Entered value is always converted first to m/s using following conversion:</p>
    <ul>
      <li>m/s = 16.6667 / min/km</li>
      <li>m/s = km/h * 0.2778</li>
      <li>m/s = 26.8224 / min/mi</li>
      <li>m/s = mph * 0.44704</li>
    </ul>
    <p>m/s is then converted to result units using following conversions:</p>
    <ul>
      <li>km/h = 3.6 * m/s</li>
      <li>mph = 2.23694 * m/s</li>
      <li>ft/s = 3.28084 * m/s</li>
    </ul>
  </Layout>
)