import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import TriathlonRow from './TriathlonRow.js'
import CombinedTotalRow from './CombinedTotalRow.js'
import TimeInput from './TimeInput.js'

import {formatTime} from '../services/timeService.js'

import {calculateSpeed} from '../services/speedService.js'
import {calculateCombinedEventsPoints, calculateCombinedEventsResult, heptathlonConsts} from '../services/combinedEventsService.js'

class TriathlonCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swimTime: {
        hours: '',
        minutes: '',
        seconds: '',
        totalSeconds: 0
      },
      transit1Time: {
        minutes: '',
        seconds: '',
        totalSeconds: 0
      },
      rideTime: {
        hours: '',
        minutes: '',
        seconds: '',
        totalSeconds: 0
      },
      transit2Time: {
        minutes: '',
        seconds: '',
        totalSeconds: 0
      },
      runTime: {
        hours: '',
        minutes: '',
        seconds: '',
        totalSeconds: 0
      },
      totalSecs: 0,
      totalTimeText: '',

  };
}

  onTimeChange(event, totalSecs, target) {
    let temp = this.state[target];
    temp[event.target.name] = event.target.value;
    temp.totalSeconds = totalSecs;
    this.setState({[target]: temp}, this.calculateTotalTime);
  }

  calculatePoints(id) {
    this.setState({heptathlon: calculateCombinedEventsPoints(this.state.heptathlon, id)}, console.log('All done ', this.state.heptathlon));
  }

  calculateTotalTime() {
    console.log(this.state);
    let totalSecs = parseInt(this.state.swimTime.totalSeconds) +
                    parseInt(this.state.transit1Time.totalSeconds) +
                    parseInt(this.state.rideTime.totalSeconds) +
                    parseInt(this.state.transit2Time.totalSeconds) +
                    parseInt(this.state.runTime.totalSeconds);
    console.log(totalSecs);
    let timeText = formatTime(totalSecs);
    this.setState({totalSecs: totalSecs});
    this.setState({totalTimeText: timeText});
  }


  render() {
    const style = {
      // height: 100,
      // width: 100,
      padding: 20,
      textAlign: 'center',
      maxWidth: '800px',
      diplay: 'flex',
    };

    return (
      <div>
      <style jsx >{`
        .parent {
          display: flex;
          flex-flow: row;
          justify-content: space-evenly;
        }
        .heptCol {
          align-self: baseline;
          margin: 10px;
          flex-basis: 25%;
        }
        .heptCol.text {
          text-align: left;
          font-weight: bold;
        }
        .manualText {
          font-size: small;
          margin-bottom: 5px;

        }
        .heptCol.manual {
          text-align: center;
        }
        @media (max-width: 600px) {
            .heptRow {
              flex-flow: row wrap;
              margin-bottom: 10px;
            }
            .heptCol {
              margin-left: 5px;
              flex-basis: 45%;
            }
            .heptCol.text {
                order: -2;
            }
            .heptCol.manual {
                order: -1;
            }
        }
        @media (max-width: 399px) {
          .heptRow {
              flex-flow: row wrap;
              margin-bottom: 10px;
            }
          .heptCol {
            margin: 0px;
            flex-basis: 100%; 
          }
        }
      `}</style>
      
      <Paper className='calculatorBox' style={style} zDepth={3}>
        <TriathlonRow 
            id={0}
            name='Swim'
            hidePace={false}
            pace=''
            paceUnit='/100m'
            time=''
            timeTag="SwimTime"
            hideHours={false}
           // onPaceChange={}//{this.handleResultChange.bind(this)} 
           // onTimeChange={}//{this.handlePointsChange.bind(this)}
        />
        <TriathlonRow 
            id={0}
            name='Transit 1'
            hidePace={true}
            pace=''
            paceUnit=''
            time=''
            timeTag="Transit1Time"
            hideHours={true}
           // onPaceChange={}//{this.handleResultChange.bind(this)} 
           // onTimeChange={}//{this.handlePointsChange.bind(this)}
        />
      </Paper>
      </div>
    );
  }
}

export default TriathlonCalculator;

   {/* <div className="parent">
        <div className="heptCol text">
          Swim
        </div>
        <div className="heptCol">
          <TextField 
            label='min/100m' 
            fullWidth={true} 
            name='min/100m' 
            id='1'
            type='number'
            value={this.state.swimSplit}
            //onChange={props.onPointsChange.bind(this)}
          />
           <TextField 
            floatingLabelText='min/100m'
            fullWidth={true} 
            hintText='min/100m'
            name='swimSplit'
            id='1' type='text' 
            value={this.state.swimSplit} 
            //onChange={this.onSplitChange.bind(this)} 
          /> 
        </div>
        <div className="heptCol">
          <TimeInput shortNames={true} tag='swimTime' values={this.state.swimTime} onTimeChange={this.onTimeChange.bind(this)}/>
        </div>
        </div>
      <div className="parent"> 
        <div className="heptCol text">
          Transit 1
        </div>
        <div className="heptCol">
         
        </div>
        <div className="heptCol">
          <TimeInput shortNames={true} tag='transit1Time' hideHours={true} values={this.state.transit1Time} onTimeChange={this.onTimeChange.bind(this)}/>
        </div>
      </div>
      <div className="parent">
        <div className="heptCol text">
          Ride
        </div>
        <div className="heptCol">
          <TextField 
            floatingLabelText='min/100m'
            fullWidth={true} 
            hintText='min/100m'
            name='swimSplit'
            id='1' type='text' 
            value={this.state.swimSplit} 
            //onChange={this.onSplitChange.bind(this)} 
          />
        </div>
        <div className="heptCol">
          <TimeInput shortNames={true} tag='rideTime' values={this.state.rideTime} onTimeChange={this.onTimeChange.bind(this)}/>
        </div>
        </div>
        <div className="parent"> 
        <div className="heptCol text">
          Transit 2
        </div>
        <div className="heptCol">
         
        </div>
        <div className="heptCol">
          <TimeInput shortNames={true} tag='transit2Time' hideHours={true} values={this.state.transit2Time} onTimeChange={this.onTimeChange.bind(this)}/>
        </div>
      </div>
      <div className="parent">
        <div className="heptCol text">
          Run
        </div>
        <div className="heptCol">
          <TextField 
            floatingLabelText='min/100m'
            fullWidth={true} 
            hintText='min/100m'
            name='swimSplit'
            id='1' type='text' 
            value={this.state.swimSplit} 
            //onChange={this.onSplitChange.bind(this)} 
          />
        </div>
        <div className="heptCol">
          <TimeInput shortNames={true} tag='runTime' values={this.state.runTime} onTimeChange={this.onTimeChange.bind(this)}/>
        </div>
        </div>
        <CombinedTotalRow text='Total' points={this.state.totalTimeText} /> */}