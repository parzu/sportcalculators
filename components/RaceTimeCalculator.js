import React from 'react';
import TimeInput from './TimeInput.js';
import DistanceSelector from './DistanceSelector.js';
import PredictedSplitTimes from './PredictedSplitTimes.js';
import Head from 'next/head'
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class RaceTimeCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      distance: 0,
      speed: 0,
    };
  }

  calculateSpeed() {
    if (this.state.time > 0 && this.state.distance > 0) {
      this.setState({speed: this.state.distance / this.state.time});
    }
  }

  onTimeChange(totalSecs) {
    this.setState({time: totalSecs}, this.calculateSpeed);
  }

  onDistanceChange(dist) {
    this.setState({distance: dist}, this.calculateSpeed);
  }

  render() {
    const style = {
      // height: 100,
      // width: 100,
      padding: 20,
      textAlign: 'center',
      maxWidth: '600px',
      diplay: 'flex',
    };

    return (
      <div className='parent'>
        <style jsx >{`
          .parent {
            display: flex;
            justify-content: center;
          }
          .child {
            margin: auto;  /* Magic! */
          }
          .time {
            margin-bottom: 20px;
          }     
          .distance {
            margin-bottom: 40px;
          }
        `}</style>
        
        <Paper className='calculatorBox' style={style} zDepth={3}>
          <div className='time child'>
            <TimeInput  time={this.state.time} onTimeChange={this.onTimeChange.bind(this)}/> 
          </div>
          <div>
            <DistanceSelector onDistanceChange={this.onDistanceChange.bind(this)}/>
          </div>
          <div>
            <PredictedSplitTimes time={this.state.time} distance={this.state.distance} />
          </div>
        </Paper>
      </div>
    );
  }
}

export default RaceTimeCalculator;