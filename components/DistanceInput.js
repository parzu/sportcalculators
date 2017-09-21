import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {distanceToMeters} from '../services/distanceService.js'
import * as consts from '../services/unitConstants.js';

class DistanceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        dist: '0',
        distType: consts.distanceTypes.KM,
     };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.distChanged);
  }

  distChanged() {
    this.props.onDistanceChange(distanceToMeters(this.state.dist, this.state.distType));    
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
                <RadioButtonGroup name="distType" defaultSelected={consts.distanceTypes.KM} onChange={this.handleChange.bind(this)} style={{ display: 'flex' }}>
                    <RadioButton value={consts.distanceTypes.METER} label="m" style={{ width: 'auto' }} />
                    <RadioButton value={consts.distanceTypes.FEET} label="ft" style={{ width: 'auto' }} />
                    <RadioButton value={consts.distanceTypes.KM} label="km" style={{ width: 'auto' }} />
                    <RadioButton value={consts.distanceTypes.MILE} label="miles" style={{ width: 'auto' }} />
                </RadioButtonGroup>
            </div>
        </div>
    );
  }
}

export default DistanceInput;
