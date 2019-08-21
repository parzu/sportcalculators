import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DistanceInput from './DistanceInput.js';
import {distanceToMeters} from '../services/distanceService.js';
import * as consts from '../services/unitConstants.js';

class DistanceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        dist: '0',
        selectedDist: this.props.initialDistance,
        distType: consts.distanceTypes.KM,
        customVisible: false,
     };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.distChanged);
  }

  handleCustomChange(distance) {
    this.setState({dist: distance}, this.props.onDistanceChange(distance));
  }

  distChanged() {
    let distance = 5000;
    if (this.state.selectedDist == 'custom') {
        distance = distanceToMeters(this.state.dist, this.state.distType);
    } else {
        distance = this.state.selectedDist;
    }
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
                <RadioGroup 
                    name="selectedDist" 
                    defaultSelected="5000" 
                    onChange={this.handleChange.bind(this)} 
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
                >
                    <Radio value="1500" label="1 500 m" style={{ width: 'auto' }} />
                    <Radio value="1609.34" label="1 mi" style={{ width: 'auto' }} />
                    <Radio value="4828.03" label="3 mi" style={{ width: 'auto' }} />
                    <Radio value="5000" label="5 km" style={{ width: 'auto' }} />
                    <Radio value="8046.72" label="5 mi" style={{ width: 'auto' }} />
                    <Radio value="10000" label="10 km" style={{ width: 'auto' }} />
                    <Radio value="15000" label="15 km" style={{ width: 'auto' }} />
                    <Radio value="16093.4" label="10 mi" style={{ width: 'auto' }} />
                    <Radio value="21097.5" label="1/2 marathon" style={{ width: 'auto' }} />
                    <Radio value="42195" label="marathon" style={{ width: 'auto' }} />
                    {/* <Radio value="custom" label="custom" style={{ width: 'auto' }} /> */}
                </RadioGroup>
            </div>
                {/* <DistanceInput distance={this.state.dist} onDistanceChange={this.handleCustomChange.bind(this)}/>  */}
                {/* <div className='distanceSelecterChild'>
                    <TextField floatingLabelText='distance' hintText="distance" name="dist" type='text' onChange={this.handleChange.bind(this)} />
                </div>
                <div className='distanceSelecterChild'>
                    <RadioGroup name="distType" defaultSelected="km" onChange={this.handleChange.bind(this)} style={{ display: 'flex' }}>
                        <Radio value="m" label="m" style={{ width: 'auto' }} />
                        <Radio value="ft" label="ft" style={{ width: 'auto' }} />
                        <Radio value="km" label="km" style={{ width: 'auto' }} />
                        <Radio value="miles" label="miles" style={{ width: 'auto' }} />
                    </RadioGroup>
                </div> */}
            
        </div>
    );
  }
}

export default DistanceSelector;
