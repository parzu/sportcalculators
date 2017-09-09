import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
//import './TimeSelector.css';

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
    this.props.onTimeChange(parseInt(this.state.hours, 10) * 3600 + parseInt(this.state.minutes, 10) * 60 + parseInt(this.state.seconds, 10));
  }

  render() {
    return (
        <div className='parent'>
            <style jsx >{`
            .parent {
                display: flex;
                flex-flow: row nowrap;
            }

            .child {
                margin: auto;  /* Magic! */
                width: 30%;
            }

            `}</style>
            <div className='child'>
                <TextField floatingLabelText='hours' fullWidth={true} hintText="hours" name='hours' type='text' onChange={this.handleChange.bind(this)} />
            </div>
            <div className='child'>
                <TextField floatingLabelText='minutes' fullWidth={true} hintText="minutes" name='minutes' type='text' onChange={this.handleChange.bind(this)}/>
            </div>
            <div className='child'>
                <TextField floatingLabelText='seconds' fullWidth={true} hintText="seconds" name='seconds' type='text' onChange={this.handleChange.bind(this)}/>
            </div>
        </div>
    );
  }
}

export default TimeInput;
