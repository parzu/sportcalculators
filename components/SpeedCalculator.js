import React from 'react';
import TimeInput from './TimeInput.js';
import DistanceInput from './DistanceInput.js';
import SpeedDisplay from './SpeedDisplay.js';
import Head from 'next/head'
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {calculateSpeed} from '../services/speedService.js';

class SpeedCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      distance: 0,
      speed: 0,
    };
  }

  onTimeChange(totalSecs) {
    this.setState({time: totalSecs, speed: calculateSpeed(this.state.time, this.state.distance)});
  }

  onDistanceChange(dist) {
    this.setState({distance: dist, speed: calculateSpeed(this.state.time, this.state.distance)});
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
<div className='speedCalculatorParent'>
      <style jsx >{`
        .speedCalculatorParent {
          display: flex;
          justify-content: center;
        }
        .speedCalculatorChild {
          margin: auto;  /* Magic! */
        }
        .speedCalculatorTime {
          margin-bottom: 20px;
        }     
        .speedCalculatorDistance {
          margin-bottom: 40px;
        }
    `}</style>


      
        <Paper className='calculatorBox' style={style} zDepth={3}>
          <div className='speedCalculatorTime speedCalculatorChild'>
            <TimeInput  time={this.state.time} onTimeChange={this.onTimeChange.bind(this)}/> 
          </div>
          <div className='speedCalculatorDistance speedCalculatorChild'>
            <DistanceInput distance={this.state.distance} onDistanceChange={this.onDistanceChange.bind(this)}/> 
          </div>
          <div className='speedCalculatorChild'>
            <SpeedDisplay speed={this.state.speed} /> 
          </div>
        </Paper>
      </div>
    );
  }
}

export default SpeedCalculator;