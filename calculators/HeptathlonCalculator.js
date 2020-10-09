import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import CombinedEventRow from './CombinedEventRow.js'
import CombinedTotalRow from './CombinedTotalRow.js'

import {calculateSpeed} from '../services/speedService.js'
import {calculateCombinedEventsPoints, calculateCombinedEventsResult, heptathlonConsts} from '../services/combinedEventsService.js'

class HeptathlonCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heptathlon: {
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
        }],
        'firstDayPoints': '0',
        'secondDayPoints': '0',
        'totalPoints': '0'
      } 
  };
}

  handleResultChange(event) {
    let hept = this.state.heptathlon;
    hept.events[event.target.id].result = event.target.value;
    this.setState({heptathlon: hept}, this.calculatePoints(event.target.id));
  }

  handleToggleChange(event, state) {
    let hept = this.state.heptathlon;
    hept.events[event.target.id].manual = state;
    this.setState({heptathlon: hept}, this.calculatePoints(event.target.id));
  }

  handlePointsChange(event) {
    let hept = this.state.heptathlon;
    hept.events[event.target.id].points = event.target.value;
    this.setState({heptathlon: hept}, this.calculateResult(event.target.id));
  }

  calculatePoints(id) {
    this.setState({heptathlon: calculateCombinedEventsPoints(this.state.heptathlon, id)}, console.log('All done ', this.state.heptathlon));
  }

  calculateResult(id) {
    this.setState({heptathlon: calculateCombinedEventsResult(this.state.heptathlon, id)}, console.log('All done ', this.state.heptathlon));
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
<div className='heptathlonCalculatorParent'>
        <style jsx >{`
          .heptathlonCalculatorParent {
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
              event={this.state.heptathlon.events[0]} 
              consts={heptathlonConsts[0]} 
              id='0' 
              showManual={true} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />
            <CombinedEventRow 
              event={this.state.heptathlon.events[1]} 
              consts={heptathlonConsts[1]} 
              id='1' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.heptathlon.events[2]} 
              consts={heptathlonConsts[2]} 
              id='2' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.heptathlon.events[3]} 
              consts={heptathlonConsts[3]} 
              id='3' 
              showManual={true} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedTotalRow
              text='1st day points'
              points={this.state.heptathlon.firstDayPoints}
            />
            <CombinedEventRow 
              event={this.state.heptathlon.events[4]} 
              consts={heptathlonConsts[4]} 
              id='4' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.heptathlon.events[5]} 
              consts={heptathlonConsts[5]} 
              id='5' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedEventRow 
              event={this.state.heptathlon.events[6]} 
              consts={heptathlonConsts[6]} 
              id='6' 
              showManual={false} 
              onResultChange={this.handleResultChange.bind(this)} 
              onPointsChange={this.handlePointsChange.bind(this)} 
              onToggle={this.handleToggleChange.bind(this)} 
            />  
            <CombinedTotalRow
              text='2nd day points'
              points={this.state.heptathlon.secondDayPoints}
            />
            <CombinedTotalRow
              text='Total points'
              points={this.state.heptathlon.totalPoints}
            />
        </Paper>
      </div>
    );
  }
}

export default HeptathlonCalculator;