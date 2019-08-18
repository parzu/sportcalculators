import BowlingScoreCalculator from '../components/BowlingScoreCalculator.js';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout.js';

export default function BowlingScorePage() {

return (
  <Layout>
    <Head>
      <title>Bowling Score Calculator | SportCalculators</title>
    </Head>

    <h2 className='calculator'>Bowling Score Calculator</h2>
    <p>How one throw effects on bowling score? What would be the score if you throw 5 and spare for each frame? Find out the answers with this bowling score calculator.</p>
    <div style={{paddingTop: "40px", paddingBottom: "40px"}}>
      <BowlingScoreCalculator></BowlingScoreCalculator>
    </div>
    <h3>How to Use the Calculator?</h3> 
    <p>Push the buttons for values for each frame throw by throw. The calculator calculates your current score after each input and enables only the buttons you are able to push. Push "X" for strike and "/" for spare. You can start a new game at any point be pressing the "new game" button. Please note that your score is not saved, so if you refresh the page, you might loose your score.</p>
    
    <h3>Bowling</h3>
 
    <div>
      <img style={{float: "left", paddingRight: "10px"}} src="../static/bowling_salvatore_vuono.jpg" />
      <div style={{display: "inline"}}>        
        <p>Bowling is an indoor-game played usually in special bowling alleys. The are many variations of the game but the most common one is the ten pin bowling (for the other variations see resource links in the end of the page). The gaming equipment consists of a bowling ball and ten bowling pins. Pins are placed in a triangle shaped formation in the other end of the bowling lane, which is 60 feet (~18 meters) long. The bowling ball is thrown from the other end of the line and the goal is to knock down as many pins as possible. Matches consists of games played by each player. One game consists of ten frames and each frame, except the tenth frame, consists of two throws. The tenth frame can have two or three throws depending on previous throws.</p>
      </div>
    </div>
        <p>Scoring a bowling game is not straightforward and that is why I made the bowling score calculator above. To understand the scoring let's take a look at the three possible endings of a frame.</p>
        <h4>An open frame</h4>
        <p>An open frame is when a player doesn't knock all 10 pins down in both attempts. The score of the frame is the amount of pins knocked down.</p>
        <h4>Strike</h4>
        <p>Strike happens when a player knocks down all 10 pins on the first throw. In this case there will be no second throw in that frame. The score of the frame is ten points.</p>
        <h4>Spare</h4>
        <p>If a player knocks down all 10 pins with two throws he/she gets a spare. For example the player knocks down 3 pins on the first throw and 7 on the second (or 0 and 10 respectively). The score of the frame is ten points.</p>

    <h3>How to score a bowling game?</h3>
    <p>If a player makes only open frames the scoring is straightforward. In this case the result of the game is the sum of frames. Getting strikes and spares makes calculation a bit more complicated. Let's take a look at the spare first.</p>
    <p>The next throw after the spare frame affects the score of the spare frame. The amount of pins knocked down with the next throw are added to the score of the spare frame. For example: The player makes spare for the first frame. In the second frame the player throws 3 with his/hers first throw, which changes the score of the first frame to 13. The second throw of the second frame is calculated normally. So if the player throws for example 2, the total score after two frames is 18.</p>
    <p>Strike has a same kind of effect than the spare but it lasts for two throws. If a player makes a strike on his/hers first throw and 3 and 2 in the second frame, his/hers score after the two frames is 20. This is because the 3 and 2 are added to the first frame making the score of the first frame 15. The second frame is an open frame and the score is 5.</p>
    <p>Getting strikes in a row makes the players score higher very fast. Let's say the player gets three strikes in a row. This makes the score of the first frame to be 30, which is also a maximum for a frame. And if the player throws to his/hers fourth frame 3 and 2, the bonus ends and after four frames his/hers score will be 73. Try this out with the bowling score calculator above!</p>
    <p>This calculator and article is for ten-pin-bowling. See Wikipedia for much detailed article about ten-pin-bowling and other types of bowling.</p>
    <p>If you get tired of chasing that 300 game you can also try these trickshots for a change. Enjoy!</p>
    <div style={{textAlign: "center"}}>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/kLD9KOqWWVw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

  </Layout>
);
}