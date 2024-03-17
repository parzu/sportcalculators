import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import BowlingScoreButtons from '../components/BowlingScoreButtons.js'
import BowlingFrameDisplay from '../components/BowlingFrameDisplay.js'

class BowlingScoreCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  // Resets the game state to its initial values
  getInitialState() {
    return {
      frame: 1,
      throw: 1,
      lastThrow: -1,
      totalResult: 0,
      running: true,
      throws: Array.from({ length: 10 }, () => ['', '']), // Creates a new array instance for each frame
      results: Array(10).fill('')
    };
  }


  // Handles click events for all scoring buttons and the new game button
  handleClick = (value) => {
    if (value == 'new') {
      this.setState(this.getInitialState());
      return;
    }

    // Update the throws based on the current frame and throw
    const tempThrows = this.state.throws.slice();
    const currentFrameIndex = this.state.frame - 1;
    const currentThrowIndex = this.state.throw - 1;
    tempThrows[currentFrameIndex][currentThrowIndex] = value;
    this.setState({ throws: tempThrows, lastThrow: value });;

    // Logic to determine if we move to the next throw, the next frame, or handle special 10th frame cases
    if ((this.state.frame < 10 && value === 'x') || this.state.throw === 3) {
      // Move to the next frame immediately on a strike, except in the 10th frame. Also if it's the third throw already.
      this.nextFrame();
    } else if (this.state.throw === 1 || (this.state.frame === 10 && (value === '/' || this.state.lastThrow === 'x'))) {
      // In the 10th frame, allow a third throw if the first throw is a strike or the second throw is a spare
      this.setState({ throw: this.state.throw + 1 });
    }
    else {
      // Otherwise, move to the next frame
      this.nextFrame();
    }
  }


  nextFrame() {
    this.setState({ throw: 1 }, this.calculateResults);
  }


  // Calculates the results for each frame and updates the total score
  calculateResults() {
    let newResults = [...this.state.results]; //creates a copy of the this.state.results
    let totalRes = 0;

    for (let i = 0; i < this.state.frame; i++) {
      if (this.isStrike(i) && i < 9) { // Strike calculation for frames 1-9
        newResults[i] = this.calculateStrike(i);
      } else if (this.isSpare(i)) { // Spare calculation for all frames
        newResults[i] = this.calculateSpare(i);
      } else { // Open frame calculation
        newResults[i] = this.calculateOpenFrame(i);
      }
      // Calculate cumulative score
      if (i === 9) newResults[i] = 0;
      if (i > 0) newResults[i] += newResults[i - 1];
      totalRes = newResults[i];
    }

    if (this.state.frame === 10) {
      // Special handling for the 10th frame
      newResults[9] += this.calculateFrame10();
      totalRes = newResults[9];
    }

    this.setState({ results: newResults, totalResult: totalRes }, this.checkGameEnd);
  }

  // Checks if the game has ended
  checkGameEnd() {
    if (this.state.frame >= 10) {
      this.setState({ running: false });
    } else {
      // Move to the next frame only if the game hasn't ended
      this.setState((prevState) => ({ frame: prevState.frame + 1 }));
    }
  }





  // Handles calculation logic for the 10th frame, accounting for possible third throw
  calculateFrame10() {
    const frameThrows = this.state.throws[9];

    const firstThrow = frameThrows[0] === 'x' ? 10 : parseInt(frameThrows[0] || 0);
    const secondThrow = frameThrows[1] === 'x' ? 10 : (frameThrows[1] === '/' ? 10 - firstThrow : parseInt(frameThrows[1] || 0));
    const thirdThrow = frameThrows[2] === 'x' ? 10 : (frameThrows[2] === '/' ? 10 - (secondThrow === 10 ? 0 : secondThrow) : parseInt(frameThrows[2] || 0));


    return firstThrow + secondThrow + thirdThrow;
  }






  // Calculates score for a strike, including bonus from subsequent throws
  calculateStrike(frameIndex) {
    const nextFrame = this.state.throws[frameIndex + 1] || [];
    const nextNextFrame = this.state.throws[frameIndex + 2] || [];

    let score = 10; // Base score for a strike
    if (nextFrame[0] === 'x') {
      score += 10; // Add 10 for another strike
      if (frameIndex === 8) { // If it's the 9th frame, look at the 10th frame's second throw
        score += (nextFrame[1] === 'x' ? 10 : parseInt(nextFrame[1] || 0));
      } else { // Otherwise, check the next frame's first throw
        score += (nextNextFrame[0] === 'x' ? 10 : parseInt(nextNextFrame[0] || 0));
      }
    } else {
      score += parseInt(nextFrame[0] || 0) + (nextFrame[1] === '/' ? 10 - parseInt(nextFrame[0] || 0) : parseInt(nextFrame[1] || 0));
    }

    return score;
  }




  // Calculates score for a spare, including bonus from the next throw
  calculateSpare(frame) {
    const nextFrame = this.state.throws[frame + 1] || [];
    const bonus = nextFrame[0] === 'x' ? 10 : parseInt(nextFrame[0] || 0);
    return 10 + bonus; // Base score for a spare + bonus
  }



  // Calculates score for an open frame
  calculateOpenFrame(frame) {
    const frameThrows = this.state.throws[frame];
    return parseInt(frameThrows[0] || 0) + parseInt(frameThrows[1] || 0);
  }



  // Checks if the frame was a strike
  isStrike(frameIndex, throwIndex = 0) {
    return this.state.throws[frameIndex][throwIndex] === 'x';
  }

  // Checks if the frame was a spare
  isSpare(frameIndex, throwIndex = 1) {
    return this.state.throws[frameIndex][throwIndex] === '/';
  }

  render() {
    const paperStyle = {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'center',
      maxWidth: '700px',
      diplay: 'flex',
    };

    return (
      <div className="bowlingFrame">
        <style jsx >{`
          .bowlingFrame {
            display: flex;
            justify-content: center;
            flex-direction: row;
          }
          .frameParent {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            width: 100%;
            line-height: 35px;

          }
          .frameChild {
            width: 8%;
          }
          .frame10 {
            width: 12% !important;
          }
          .result {
            width: 18% !important;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
            font-weight: bold;
            font-size: 1.2em;
            padding-top: 17px;
          }
          @media (max-width: 450px) {
            .frameParent {
              font-size: 12px;    
            }
          }

          `}
        </style>



        <Paper style={paperStyle} elevation={3}>
          <div className="frameParent">
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='1' throws={this.state.throws[0]} result={this.state.results[0]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='2' throws={this.state.throws[1]} result={this.state.results[1]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='3' throws={this.state.throws[2]} result={this.state.results[2]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='4' throws={this.state.throws[3]} result={this.state.results[3]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='5' throws={this.state.throws[4]} result={this.state.results[4]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='6' throws={this.state.throws[5]} result={this.state.results[5]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='7' throws={this.state.throws[6]} result={this.state.results[6]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='8' throws={this.state.throws[7]} result={this.state.results[7]} />
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='9' throws={this.state.throws[8]} result={this.state.results[8]} />
            </div>
            <div className="frameChild frame10">
              <BowlingFrameDisplay frameNum='10' throws={this.state.throws[9]} result={this.state.results[9]} />
            </div>
            <div className="frameChild result">
              <div>{this.state.totalResult}</div>
            </div>
          </div>
          <BowlingScoreButtons running={this.state.running} throwNum={this.state.throw} lastThrow={this.state.lastThrow} frameNum={this.state.frame} onClick={this.handleClick.bind(this)} />
        </Paper>

      </div>
    );
  }
}

export default BowlingScoreCalculator;