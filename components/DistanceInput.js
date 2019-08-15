import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
                <TextField floatingLabelText='distance' hintText="distance" name="dist" type='number' onChange={this.handleChange.bind(this)} />
            </div>
            <div className='distanceInputChild'>
                <RadioGroup name="distType" defaultSelected={consts.distanceTypes.KM} onChange={this.handleChange.bind(this)} style={{ display: 'flex' }}>
                    <Radio value={consts.distanceTypes.METER} label="m" style={{ width: 'auto' }} />
                    <Radio value={consts.distanceTypes.FEET} label="ft" style={{ width: 'auto' }} />
                    <Radio value={consts.distanceTypes.KM} label="km" style={{ width: 'auto' }} />
                    <Radio value={consts.distanceTypes.MILE} label="miles" style={{ width: 'auto' }} />
                </RadioGroup>
            </div>
        </div>
    );
  }
}

export default DistanceInput;
