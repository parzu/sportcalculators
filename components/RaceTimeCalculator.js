import React from 'react';
import TimeInput from './TimeInput.js';
import DistanceSelector from './DistanceSelector.js';
import PredictedSplitTimes from './PredictedSplitTimes.js';
import Head from 'next/head'
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import {calculateSpeed} from '../services/speedService.js'

class RaceTimeCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      distance: 5000,
      speed: 0,
    };
  }

  onTimeChange(totalSecs) {
    this.setState({time: totalSecs}, this.setSpeed);
  }

  onDistanceChange(dist) {
    this.setState({distance: dist}, this.setSpeed);
  }

  setSpeed() {
    this.setState({speed: calculateSpeed(this.state.time, this.state.distance)});
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
<div className='raceTimeCalculatorParent'>
        <style jsx >{`
          .raceTimeCalculatorParent {
            display: flex;
            justify-content: center;
          }
          .raceTimeCalculatorChild {
            margin: auto;  /* Magic! */
          }
          .raceTimeCalculatorTime {
            margin-bottom: 20px;
          }
          .distanceSelector {
            margin: 40px;
          }
          .subheader {
            text-align: left;
            margin-left: -16px;
          }
        `}</style>
        

      
        <Paper className='calculatorBox' style={style} zDepth={3}>
          <div className="subheader">
            <Subheader>Recent race time</Subheader>
          </div>
          <div className='raceTimeCalculatorTime raceTimeCalculatorChild'>
            <TimeInput onTimeChange={this.onTimeChange.bind(this)}/> 
          </div>
          <div className="subheader">
            <Subheader>Recent race distance</Subheader>
          </div>
          <div className='distanceSelector'>
            <DistanceSelector initialDistance={this.state.distance} onDistanceChange={this.onDistanceChange.bind(this)}/>
          </div>
          <div className="subheader">
            <Subheader>Predicted times for races</Subheader>
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