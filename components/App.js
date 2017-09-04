import React from 'react';
import TimeSelector from './TimeSelector.js';
import DistanceSelector from './DistanceSelector.js';
import SpeedDisplay from './SpeedDisplay.js';
import Head from 'next/head'
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//import './App.css';

class App extends React.Component {
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
        
        <Paper className='calculatorBox' style={style} zDepth={5}>
          <div className='time child'>
            <TimeSelector  time={this.state.time} onTimeChange={this.onTimeChange.bind(this)}/> 
          </div>
          <div className='distance child'>
            <DistanceSelector distance={this.state.distance} onDistanceChange={this.onDistanceChange.bind(this)}/> 
          </div>
          <div className='speed child'>
            <SpeedDisplay speed={this.state.speed} /> 
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;