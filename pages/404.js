import Head from 'next/head';

//Omat
import Layout from '../components/Layout.js';

const NotFound = () => (
  <Layout>
    <Head>
      <title>404 | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Page Not Found - 404</h2>
    <p>Uups.. Something went wrong. The page you are looking for cannot be found.</p>
    <p>If you typed in the address, please check the spelling.</p>
    <h3>Continue Here</h3>
    <p>You can find the page you are looking for from <a href="/">the homepage</a>.</p>
  </Layout>
)

export default NotFound;