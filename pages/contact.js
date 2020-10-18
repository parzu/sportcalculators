import Head from 'next/head';

//Omat
import Layout from '../components/Layout.js';
import AdSenseWidget from "../components/AdSenseWidget.js";

const Contact = () => (
  <Layout>
    <Head>
      <title>Contact | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Contact Us</h2>
    <p>Do you have an idea for a new calculator? Did you find an error in our calculators? Or is there something else you want us to know?</p>
    <p>You can contact us via e-mail: info (at) sportcalculators.com</p>
    <AdSenseWidget />
  </Layout>
)

export default Contact;