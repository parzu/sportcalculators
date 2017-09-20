import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//import './TimeSelector.css';

class DistanceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        dist: '0',
        selectedDist: '5000',
        distType: 'km',
        customVisible: false,
     };
     this.props.onDistanceChange(this.state.selectedDist);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.distChanged);
  }

  distChanged() {
    let distance = 5000;
    if (this.state.selectedDist == 'custom') {
        let multiple = 1;
        switch (this.state.distType) {
            case 'ft': multiple=0.3048; break;
            case 'km': multiple=1000; break;
            case 'miles': multiple=1.609344; break;
            default: multiple=1; break;
        } 
        distance = parseFloat(this.state.dist) * multiple;
    } else {
        distance = this.state.selectedDist;
    }
    console.log('distChanged', distance);
    this.props.onDistanceChange(distance);
  }

  render() {
    return (
<div className='distanceSelectorParent'>
        <style jsx >{`
        .distanceSelectorParent {
            display: flex;
            flex-flow: column;
        }

        .distanceSelecterChild {
            margin: auto;
            
        }

        `}</style>

        
            <div className='distanceSelecterChild'>
                <RadioButtonGroup name="selectedDist" defaultSelected="5000" onChange={this.handleChange.bind(this)} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    <RadioButton value="1500" label="1 500 m" style={{ width: 'auto' }} />
                    <RadioButton value="1609.34" label="1 mi" style={{ width: 'auto' }} />
                    <RadioButton value="4828.03" label="3 mi" style={{ width: 'auto' }} />
                    <RadioButton value="5000" label="5 km" style={{ width: 'auto' }} />
                    <RadioButton value="8046.72" label="5 mi" style={{ width: 'auto' }} />
                    <RadioButton value="10000" label="10 km" style={{ width: 'auto' }} />
                    <RadioButton value="15000" label="15 km" style={{ width: 'auto' }} />
                    <RadioButton value="16093.4" label="10 mi" style={{ width: 'auto' }} />
                    <RadioButton value="21097.5" label="1/2 marathon" style={{ width: 'auto' }} />
                    <RadioButton value="42195" label="marathon" style={{ width: 'auto' }} />
                    <RadioButton value="custom" label="custom" style={{ width: 'auto' }} />
                </RadioButtonGroup>
            </div>
            
                <div className='distanceSelecterChild'>
                    <TextField floatingLabelText='distance' hintText="distance" name="dist" type='text' onChange={this.handleChange.bind(this)} />
                </div>
                <div className='distanceSelecterChild'>
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

export default DistanceSelector;
