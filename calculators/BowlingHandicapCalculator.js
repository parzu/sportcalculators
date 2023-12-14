import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

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


      
        <Paper className='calculatorBox' style={style} elevation={3}>
        <div className='calculatorParent'>
          <div className='calculatorChild'>
            <TextField
              id="basis-score"
              name="basis"
              label="Basis Score"
              type='number'
              value={this.state.basis}
              onChange={this.handleChange.bind(this)}
              variant="standard"
            />
          </div>
          <div className='calculatorChild'>
            <TextField
              id="factor"
              name="factor"
              label="Factor"
              type='number'
              value={this.state.factor}
              onChange={this.handleChange.bind(this)}
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </div>
          <div className='calculatorChild'>
            <TextField
              id="average"
              name="average"
              label="Your Average"
              type='number'
              value={this.state.average}
              onChange={this.handleChange.bind(this)}
              variant="standard"
            />
          </div>
          <div className='calculatorChild'>
            <TextField
              id="score"
              name="score"
              label="Game Score"
              type='number'
              value={this.state.score}
              onChange={this.handleChange.bind(this)}
              variant="standard"
            />
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