import React from 'react';

import Paper from '@material-ui/core/Paper';
import {RadioButton, RadioButtonGroup} from '@material-ui/core/RadioButton';
import TextField from '@material-ui/core/TextField';
import Toggle from '@material-ui/core/Toggle';
import ListSubheader from '@material-ui/core/ListSubheader';
import CombinedEventRow from './CombinedEventRow.js'
import CombinedTotalRow from './CombinedTotalRow.js'

import {calculateSpeed} from '../services/speedService.js'
import {calculateCombinedEventsPoints, calculateCombinedEventsResult, decathlonConsts} from '../services/combinedEventsService.js'

class DecathlonCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decathlon: {
        events: [
        {
          'result': '',
          'points': '',
          'manual': false
        },
        {
          'result': '',
          'points': ''
        },
        {
          'result': '',
          'points': ''
        },
        {
          'result': '',
          'points': ''
        },
        {
          'result': '',
          'points': '',
          'manual': false
        },
        {
          'result': '',
          'points': '',
          'manual': false
        },
        {
          'result': '',
          'points': ''
        },
        {
          'result': '',
          'points': ''
        },
        {
          'result': '',
          'points': ''
        },
        {
          'result': '',
          'points': ''
        }],
        'firstDayPoints': '0',
        'secondDayPoints': '0',
        'totalPoints': '0'
      } 
  };
}

  handleResultChange(event) {
    let decth = this.state.decathlon;
    decth.events[event.target.id].result = event.target.value;
    this.setState({decathlon: decth}, this.calculatePoints(event.target.id));
  }

  handleToggleChange(event, state) {
    let decth = this.state.decathlon;
    decth.events[event.target.id].manual = state;
    this.setState({decathlon: decth}, this.calculatePoints(event.target.id));
  }

  handlePointsChange(event) {
    let decth = this.state.decathlon;
    decth.events[event.target.id].points = event.target.value;
    this.setState({decathlon: decth}, this.calculateResult(event.target.id));
  }

  calculatePoints(id) {
    this.setState({decathlon: calculateCombinedEventsPoints(this.state.decathlon, id, 'decathlon')}, console.log('All done ', this.state.decathlon));
  }

  calculateResult(id) {
    this.setState({decathlon: calculateCombinedEventsResult(this.state.decathlon, id, 'decathlon')}, console.log('All done ', this.state.decathlon));
  }


  render() {
    const style = {
      // height: 100,
      // width: 100,
      padding: 20,
      textAlign: 'center',
      maxWidth: '800px',
      diplay: 'flex',
    };

    return (
<div className='DecathlonCalculatorParent'>
        <style jsx >{`
          .DecathlonCalculatorParent {
            display: flex;
            justify-content: center;
          }
          .ListSubheader {
            text-align: left;
            margin-left: -16px;
          }

        `}</style>
        

      
        <Paper className='calculatorBox' style={style} zDepth={3}>
            <CombinedEventRow 
              event={this.state.decathlon.events[0]} 
              consts={decathlonConsts[0]} 
              id='0' 
              showManual={true} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />
            <CombinedEventRow 
              event={this.state.decathlon.events[1]} 
              consts={decathlonConsts[1]} 
              id='1' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[2]} 
              consts={decathlonConsts[2]} 
              id='2' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[3]} 
              consts={decathlonConsts[3]} 
              id='3' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[4]} 
              consts={decathlonConsts[4]} 
              id='4' 
              showManual={true} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedTotalRow
              text='1st day points'
              points={this.state.decathlon.firstDayPoints}
            />
            <CombinedEventRow 
              event={this.state.decathlon.events[5]} 
              consts={decathlonConsts[5]} 
              id='5' 
              showManual={true} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[6]} 
              consts={decathlonConsts[6]} 
              id='6' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[7]} 
              consts={decathlonConsts[7]} 
              id='7' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[8]} 
              consts={decathlonConsts[8]} 
              id='8' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.decathlon.events[9]} 
              consts={decathlonConsts[9]} 
              id='9' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedTotalRow
              text='2nd day points'
              points={this.state.decathlon.secondDayPoints}
            />
            <CombinedTotalRow
              text='Total points'
              points={this.state.decathlon.totalPoints}
            />
        </Paper>
      </div>
    );
  }
}

export default DecathlonCalculator;