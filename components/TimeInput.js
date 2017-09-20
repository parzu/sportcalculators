import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import * as time from '../services/timeService.js'

class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        hours: '0',
        minutes: '0',
        seconds: '0',
     };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.timeChanged);
  }

  timeChanged() {
    this.props.onTimeChange(time.timeToSeconds(this.state.hours, this.state.minutes, this.state.seconds));
  }

  render() {



    return (
        <div className='timeInputParent'>
                <style jsx >{`
    .timeInputParent {
        display: flex;
        flex-flow: row nowrap;
    }

    .timeIntputChild {
        margin: auto;  /* Magic! */
        width: 30%;
    }

    `}</style>
            <div className='timeIntputChild'>
                <TextField floatingLabelText='hours' fullWidth={true} hintText="hours" name='hours' type='text' onChange={this.handleChange.bind(this)} />
            </div>
            <div className='timeIntputChild'>
                <TextField floatingLabelText='minutes' fullWidth={true} hintText="minutes" name='minutes' type='text' onChange={this.handleChange.bind(this)}/>
            </div>
            <div className='timeIntputChild'>
                <TextField floatingLabelText='seconds' fullWidth={true} hintText="seconds" name='seconds' type='text' onChange={this.handleChange.bind(this)}/>
            </div>
        </div>
    );
  }
}

export default TimeInput;
