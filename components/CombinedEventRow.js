import React from 'react';
import TextField from '@material-ui/core/TextField';
import Toggle from '@material-ui/core/Toggle';

class CombinedEventRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     };
  }

  render() {
    let hintText = 'result (' + this.props.consts.resultUnit + ')';  
    const labelStyle = {
      textAlign: 'center',
      fontSize: 'small'
    };  
    return (
        <div className="heptRow">
        <style jsx >{`
          .heptRow {
            display: flex;
            flex-flow: row;
            justify-content: space-evenly;
          }
          .heptCol {
            align-self: baseline;
            margin: 10px;
            flex-basis: 25%;
          }
          .heptCol.text {
            text-align: left;
            font-weight: bold;
          }
          .manualText {
            font-size: small;
            margin-bottom: 5px;

          }
          .heptCol.manual {
            text-align: center;
          }
          @media (max-width: 600px) {
              .heptRow {
                flex-flow: row wrap;
                margin-bottom: 10px;
              }
              .heptCol {
                margin-left: 5px;
                flex-basis: 45%;
              }
              .heptCol.text {
                  order: -2;
              }
              .heptCol.manual {
                  order: -1;
              }
          }
          @media (max-width: 399px) {
            .heptRow {
                flex-flow: row wrap;
                margin-bottom: 10px;
              }
            .heptCol {
              margin: 0px;
              flex-basis: 100%; 
            }
          }
        `}</style>
        
        
        <div className="heptCol text">
          {this.props.consts.name}
        </div>
        <div className="heptCol">
          <TextField 
            floatingLabelText={hintText}
            fullWidth={true} 
            hintText={this.props.consts.resultExample}
            name={this.props.consts.resultName} 
            id={this.props.id} type='text' 
            value={this.props.event.result} 
            onChange={this.props.onResultChange.bind(this)} 
          />
        </div>
        <div className="heptCol">
          <TextField 
            floatingLabelText='points' 
            fullWidth={true} hintText="points" 
            name='points' 
            id={this.props.id} 
            type='number'
            value={this.props.event.points}
            onChange={this.props.onPointsChange.bind(this)}
          />
        </div>
        <div className="heptCol manual">
          {/* {this.props.showManual ? <p className="manualText">Manual timing</p>: null} */}
          {this.props.showManual ? <Toggle labelStyle={labelStyle} label="Manual timing" labelPosition='right' id={this.props.id} onToggle={this.props.onToggle.bind(this)}/>: null}
          
        </div>
        
    </div>
    );
  }
}

export default CombinedEventRow;
