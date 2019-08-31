import React from 'react';
import TimeInput from './TimeInput.js';
import DistanceInput from './DistanceInput.js';
import SpeedDisplay from './SpeedDisplay.js';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

  onTimeChange(event, totalSecs) {
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
        .ListSubheader {
          text-align: left;
          margin-left: -20px;
          margin-right: -20px;
          background: #f5f5f5;
          padding-left: 20px;
        }
    `}</style>


      
        <Paper className='calculatorBox' style={style} zDepth={3}>
          <div className="ListSubheader">
            <Typography variant="overline">Race time</Typography>
          </div>
          <div className='speedCalculatorTime speedCalculatorChild'>
            <TimeInput onTimeChange={this.onTimeChange.bind(this)}/> 
          </div>
          <div className="ListSubheader">
            <Typography variant="overline">Race distance</Typography>
          </div>
          <div className='speedCalculatorDistance speedCalculatorChild'>
            <DistanceInput distance={this.state.distance} onDistanceChange={this.onDistanceChange.bind(this)}/> 
          </div>
          <div className="ListSubheader">
            <Typography variant="overline">Race speed & pace</Typography>
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