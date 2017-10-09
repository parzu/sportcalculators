import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import BowlingScoreButtons from './BowlingScoreButtons.js'
import BowlingFrameDisplay from './BowlingFrameDisplay.js'

class BowlingScoreCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 1,
      throw: 1,
      lastThrow: -1,
      totalResult: 0,
      running: true,
      throws: [
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['','',''],
              ],
      results: ['','','','','','','','','','']
    };
  }

  handleClick = function (value) {
    if (value == 'new') {
      this.newGame();
      return;
    }
    let tempThrows = this.state.throws.slice();
    tempThrows[this.state.frame-1][this.state.throw-1] = value;
    this.setState({throws: tempThrows});
    
    if (this.state.frame < 10 && value == 'x') {
      this.nextFrame();
    } else if (this.state.throw == 1) {
      this.setState({throw: 2});
    } else if (this.state.frame == 10 && this.state.throw == 2 && (value == '/' || this.state.lastThrow == 'x')) {
      this.setState({throw: 3});
    } else {
      this.nextFrame();
    }
    this.setState({lastThrow: value});
    console.log(this.state.throws);
  }

  nextFrame() {
    this.setState({throw: 1}, this.calculateResults);
    
  }

  newGame() {
    this.setState({
      frame: 1,
      throw: 1,
      lastThrow: -1,
      totalResult: 0,
      running: true,
      throws: [
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['','',''],
              ],
      results: ['','','','','','','','','','']
    });
  }

  calculateResults() {
    let res = this.state.results;
    for (var i = 0; i <= this.state.frame-1; i++) {
      let sum = 0;
      if (i == 0) {
        sum = 0;
      } else {
        sum = parseInt(res[i-1]);
      }
      if (i == 9) {
        res[9] = sum + this.calculateFrame10();
      } else if (this.isStrike(i)) {
        res[i] = sum + parseInt(this.calculateStrike(i));
      } else if (this.isSpare(i)) {
        res[i] = sum + parseInt(this.calculateSpare(i));
      } else {
        res[i] = sum + this.calculateOpenFrame(i);
      }
      
    }
    this.setState({results: res});
    this.setState({frame: this.state.frame+1}, this.checkGameEnd);

  }

  checkGameEnd() {
    if (this.state.frame == 11) {
      this.setState({running: false});
    }
  }

  calculateFrame10() {
    let sum = 0;
    if (this.isStrike(9)) {
      sum = 10;
      if (this.isStrike(9,1)) {
        sum = 20;
        if (this.isStrike(9,2)) {
          sum = 30;
        } else {
          sum = 20 + this.state.throws[9][2];
        }
      } else if (this.isSpare(9,2)) {
        sum = 20;
      } else {
        sum = sum + parseInt(this.state.throws[9][1]) + parseInt(this.state.throws[9][2]);
      }
    } else if (this.isSpare(9,2)) {
        sum = 20;
    } else if (this.isSpare(9)) {
      if (this.isStrike(9,2)) {
        sum = 20;
      } else {
        sum = 10 + this.state.throws[9][2];
      }
    } else {
        sum = this.calculateOpenFrame(9);
    } 
    return sum;
  }

  calculateStrike(frame) {
    let result = 0;
    if (this.state.throws[frame+1][0] == '') {
      result = 10;
    } else if (this.isStrike(frame+1)) {
      if (frame == 8) {
        if (this.isStrike(frame+1, 1)) {
          result = 30;
        } else {
          result = 20 + this.state.throws[frame+1][1];
        }
      } else if (this.isStrike(frame+2)) {
        result = 30;
      } else {
        result = this.state.throws[frame+2][0] + 20;
      }
    } else if (this.isSpare(frame+1)) {
      result = 20;
    } else {
      result = 10 + this.calculateOpenFrame(frame+1);
    }
    return result;
  }

  calculateSpare(frame) {
    let result = 0;
    if (this.state.throws[frame+1][0] == '') {
      result = 10;
    } else if (this.isStrike(frame+1)) {
      result = 20
    } else {
      result = 10 + this.state.throws[frame+1][0];
    }
    return result;
  }

  calculateOpenFrame(frameIndex) {
    this.state.throws[frameIndex][0] + this.state.throws[frameIndex][1];
  }

  isStrike(frameIndex, throwIndex = 0) {
    if (this.state.throws[frameIndex][throwIndex] == 'x') {
      return true;
    } 
    return false;
  }

  isSpare(frameIndex, throwIndex = 1) {
    if (this.state.throws[frameIndex][throwIndex] == '/') {
      return true;
    } 
    return false;
  }

  render() {
    const paperStyle = {
      padding: 20,
      textAlign: 'center',
      maxWidth: '600px',
      diplay: 'flex',
    };

    return (
      <div>
        <style jsx >{`
          .frameParent {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
          }
          .frameChild {
           
          }

          `}
        </style>



        <Paper style={paperStyle} zDepth={3}>
          <div className="frameParent">
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='1' throws={this.state.throws[0]} result={this.state.results[0]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='2' throws={this.state.throws[1]} result={this.state.results[1]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='3' throws={this.state.throws[2]} result={this.state.results[2]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='4' throws={this.state.throws[3]} result={this.state.results[3]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='5' throws={this.state.throws[4]} result={this.state.results[4]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='6' throws={this.state.throws[5]} result={this.state.results[5]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='7' throws={this.state.throws[6]} result={this.state.results[6]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='8' throws={this.state.throws[7]} result={this.state.results[7]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='9' throws={this.state.throws[8]} result={this.state.results[8]}/>
            </div>
            <div className="frameChild">
              <BowlingFrameDisplay frameNum='10' throws={this.state.throws[9]} result={this.state.results[9]}/>
            </div>
          </div>
          <BowlingScoreButtons running={this.state.running} throwNum={this.state.throw} lastThrow={this.state.lastThrow} frameNum={this.state.frame} onClick={this.handleClick.bind(this)} />
        </Paper>
        
      </div>
    );
  }
}

export default BowlingScoreCalculator;