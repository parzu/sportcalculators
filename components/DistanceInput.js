import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//import './TimeSelector.css';

class DistanceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        dist: '0',
        distType: 'km',
     };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.distChanged);
  }

  distChanged() {
    let multiple = 1;
    switch (this.state.distType) {
        case 'ft': multiple=0.3048; break;
        case 'km': multiple=1000; break;
        case 'miles': multiple=1.6093; break;
        default: multiple=1; break;
    } 
    console.log(this.state.dist);
    console.log(multiple);
    this.props.onDistanceChange(parseFloat(this.state.dist) * multiple);
  }

  render() {
    return (
        <div className='distanceInputParent'>  
        <style jsx >{`
        .distanceInputParent {
            display: flex;
            flex-flow: column;
        }

        .distanceInputChild {
            margin: auto;
            
        }

        `}</style>

          
            <div className='distanceInputChild'>
                <TextField floatingLabelText='distance' hintText="distance" name="dist" type='text' onChange={this.handleChange.bind(this)} />
            </div>
            <div className='distanceInputChild'>
                <RadioButtonGroup name="distType" defaultSelected="km" onChange={this.handleChange.bind(this)} style={{ display: 'flex' }}>
                    <RadioButton value="m" label="m" style={{ width: 'auto' }} />
                    <RadioButton value="ft" label="ft" style={{ width: 'auto' }} />
                    <RadioButton value="km" label="km" style={{ width: 'auto' }} />
                    <RadioButton value="miles" label="miles" style={{ width: 'auto' }} />
                </RadioButtonGroup>
            </div>
        </div>
    );
  }
}

export default DistanceInput;
