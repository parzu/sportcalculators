import React from 'react';
import TimeInput from './TimeInput.js';
import DistanceSelector from './DistanceSelector.js';
import PredictedSplitTimes from './PredictedSplitTimes.js';
import Head from 'next/head'
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import {calculateSpeed} from '../services/speedService.js'
import {heptathlonConsts} from '../services/unitConstants.js'
import {calculateHeptathlonPoints} from '../services/combinedEventsService.js'

class HeptathlonCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heptathlon: [
      {
        'result': 0,
        'points': 0
      },
      {
        'result': 0,
        'points': 0
      },
      {
        'result': 0,
        'points': 0
      },
      {
        'result': 0,
        'points': 0
      },
      {
        'result': 0,
        'points': 0
      },
      {
        'result': 0,
        'points': 0
      },
      {
        'result': 0,
        'points': 0
      }
    ]
  };
}

  handleResultChange(event) {
    console.log(this.state.heptathlon); 
    let hept = this.state.heptahtlon;
    hept[event.target.id].result = event.target.value;
    this.setState({heptathlon: hept}, this.calculatePoints(event.target.id));
  }

  calculatePoints(index) {
    console.log("before all:", this.state.heptahtlon);
    this.setState({heptathlon: calculateHeptathlonPoints(this.state.heptathlon)}, console.log(this.state.heptahtlon));
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
<div className='heptathlonCalculatorParent'>
        <style jsx >{`
          .heptathlonCalculatorParent {
            display: flex;
            justify-content: center;
          }
          .subheader {
            text-align: left;
            margin-left: -16px;
          }
          .heptRow {
            display: flex;
            flex-flow: row;
          }
          .heptCol {
            align-self: baseline;
            margin: 10px;
          }
        `}</style>
        

      
        <Paper className='calculatorBox' style={style} zDepth={3}>
          <div className="subheader">
            <Subheader>Recent race time</Subheader>
          </div>
          <div className="heptRow">
            <div className="heptCol">
              100m hurdles
            </div>
            <div className="heptCol">
              <TextField floatingLabelText='time (s)' fullWidth={true} hintText="time" name='time' id='0' type='text' onChange={this.handleResultChange.bind(this)} />
            </div>
            <div className="heptCol">
              <TextField floatingLabelText='points' fullWidth={true} hintText="points" name='points' type='text'  />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default HeptathlonCalculator;