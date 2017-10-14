import BowlingScoreCalculator from '../components/BowlingScoreCalculator.js';
import Layout from '../components/Layout.js';
import Head from 'next/head';

export default () => (
  <Layout>
    <Head>
      <title>Bowling Score Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Bowling Score Calculator</h2>
    <p>How one throw effects on bowling score? What would be the score if you throw 5 and spare for each frame? Find out the answers with this bowling score calculator.</p>
    <BowlingScoreCalculator></BowlingScoreCalculator>
    <h3>How to Use the Calculator?</h3> 
    <p>Push the buttons for values for each frame throw by throw. The calculator calculates your current score after each input and enables only the buttons you are able to push. Push "X" for strike and "/" for spare. You can start a new game at any point be pressing the "new game" button. Please note that your score is not saved, so if you refresh the page, you might loose your score.</p>
  </Layout>
)