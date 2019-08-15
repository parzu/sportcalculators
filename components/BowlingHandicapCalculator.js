import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {RadioButton, RadioButtonGroup} from '@material-ui/core/RadioButton';
import {calculateSpeed} from '../services/speedService.js';

class BowlingHandicapCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basis: 210,
      factor: 90,
      average: '',
      score: '',
      handicap: '',
      adjustedScore: ''
    };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.valuesChanged);
  }

  valuesChanged() {
    let handicap = parseInt((this.state.basis-this.state.average)*(this.state.factor/100));
    let adjusted = parseInt(handicap+parseInt(this.state.score));
    this.setState({handicap: handicap});
    if (isNaN(adjusted)) {
      adjusted = 0;
    }
    this.setState({adjustedScore: adjusted});

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
    <div className="parent">
      <style jsx >{`
        .parent {
          display: flex;
          justify-content: center;
        }
        .calculatorParent {
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
        }
        .calculatorChild {
          margin: 20px;
          flex-basis: 40%;
        }
        .resultNumber {
          font-size: 2em;
          font-weight: bold;
        }
        @media (max-width: 460px) {
            .calculatorChild {
                margin: 5px;
                flex-basis: 45%;
              }
            .result {
              margin-top: 20px;
            }
        }
      `}</style>


      
        <Paper className='calculatorBox' style={style} zDepth={3}>
        <div className='calculatorParent'>
          <div className='calculatorChild'>
            <TextField floatingLabelText='Basis Score' fullWidth={true} hintText="Basis Score" name='basis' type='text' value={this.state.basis} onChange={this.handleChange.bind(this)} />
          </div>
          <div className='calculatorChild'>
            <TextField floatingLabelText='Factor (%)' fullWidth={true} hintText="Factor (%)" name='factor' type='text' value={this.state.factor} onChange={this.handleChange.bind(this)} />
          </div>
          <div className='calculatorChild'>
            <TextField floatingLabelText='Your Average' fullWidth={true} hintText="Your Average" name='average' type='text' value={this.state.average} onChange={this.handleChange.bind(this)} />
          </div>
          <div className='calculatorChild'>
            <TextField floatingLabelText='Game Score' fullWidth={true} hintText="Game Score" name='score' type='text' value={this.state.score} onChange={this.handleChange.bind(this)} />
          </div>
          <div className='calculatorChild result'>
            <div>Your Handicap</div>
            <div className="resultNumber">{this.state.handicap}</div>
          </div>
          <div className='calculatorChild result'>
            <div>Adjusted Result</div>
            <div className="resultNumber">{this.state.adjustedScore}</div>
          </div>
          </div>

        </Paper>
    </div>
    );
  }
}

export default BowlingHandicapCalculator;