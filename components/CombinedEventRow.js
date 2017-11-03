import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class CombinedEventRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     };
  }

  render() {
    let hintText = this.props.consts.resultName + ' (' + this.props.consts.resultUnit + ')';    
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
        `}</style>
        
        
        <div className="heptCol">
          {this.props.consts.name}
        </div>
        <div className="heptCol">
          <TextField 
            floatingLabelText={hintText} 
            fullWidth={true} 
            hintText={hintText}
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
            type='text'
            value={this.props.event.points}
            onChange={this.props.onPointsChange.bind(this)}
          />
        </div>
        <div className="heptCol">
          {this.props.showManual ? <Toggle label="Manual timing" id={this.props.id} onToggle={this.props.onToggle.bind(this)}/>: null}
        </div>
        
    </div>
    );
  }
}

export default CombinedEventRow;
