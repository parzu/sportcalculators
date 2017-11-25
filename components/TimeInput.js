import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import * as time from '../services/timeService.js'

class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        hours: '',
        minutes: '',
        seconds: '',
        tag: '',
     };
  }

  handleTimeChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.timeChanged);
  }

  timeChanged() {
      console.log('timeInput ', this.state);
    this.props.onTimeChange(event, time.timeToSeconds(this.state.hours, this.state.minutes, this.state.seconds), this.state.tag);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
        if (this.props.values) {
            this.setState({hours: this.props.values.hours});
            this.setState({minutes: this.props.values.minutes});
            this.setState({seconds: this.props.values.seconds});
        }
        if (this.props.tag) {
            this.setState({tag: this.props.tag});
        }
    }
  }

  buildInputField(name, shortName, id, useShortNames, timeValue) {
    let valueProp = '';
    if (timeValue) {
        valueProp = {value: this.state[name]};
    }
    if (!useShortNames) {
        shortName = name;
    }
    let html = (
        <div style={{flexBasis: '30%'}} key={name+id} className='timeIntputChild'>
        <TextField 
            floatingLabelText={shortName} 
            fullWidth={true} 
            hintText={shortName} 
            {...valueProp}
            name={name} 
            type='number' 
            key={id}
            onChange ={this.handleTimeChange.bind(this)}
        />
        </div>
        );
    return html;
  }

  render() {
    let html = [];
    if (!this.props.hideHours) {
        html.push(this.buildInputField('hours', 'hrs', this.props.tag+'1', this.props.shortNames, this.props.values));
    }
    html.push(this.buildInputField('minutes', 'mins', this.props.tag+'2', this.props.shortNames, this.props.values));
    html.push(this.buildInputField('seconds', 'secs', this.props.tag+'3', this.props.shortNames, this.props.values));


    return (
        <div className='timeInputParent'>
                <style jsx >{`
    .timeInputParent {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    `}</style>
            {html}
        </div>
    );
  }
}

export default TimeInput;
