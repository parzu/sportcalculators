import React from 'react';
import TimeInput from './TimeInput.js';
import DistanceSelector from './DistanceSelector.js';
import PredictedSplitTimes from './PredictedSplitTimes.js';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
          .ListSubheader {
            text-align: left;
            margin-left: -20px;
            margin-right: -20px;
            background: #f5f5f5;
            padding-left: 20px;
            margin-bottom: 10px;
          }
        `}</style>
        

      
        <Paper className='calculatorBox' style={style} zDepth={3}>
          <div className="ListSubheader">
            <Typography variant="overline">Recent race time</Typography>
          </div>
          <div className='raceTimeCalculatorTime raceTimeCalculatorChild'>
            <TimeInput onTimeChange={this.onTimeChange.bind(this)}/> 
          </div>
          <div className="ListSubheader">
            <Typography variant="overline">Recent race distance</Typography>
          </div>
          <div className='distanceSelector'>
            <DistanceSelector initialDistance={this.state.distance.toString()} onDistanceChange={this.onDistanceChange.bind(this)}/>
          </div>
          <div className="ListSubheader">
            <Typography variant="overline">Predicted times for races</Typography>
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