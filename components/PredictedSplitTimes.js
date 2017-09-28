import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Paper,
} from 'material-ui/Table';
import {formatTime} from '../services/timeService.js'

class SplitRow extends React.Component {
  constructor(props) {
      super(props);
  }
  
  predictedTime(time, orgDist, newDist) {
    let result = {time: 0, paceKm: 0, paceMi: 0};
    let secs = time*Math.pow((newDist/orgDist), 1.06);

    result.time = formatTime(secs);
    result.paceKm = formatTime(secs / (newDist/1000));
    result.paceMi = formatTime(secs / (newDist/1609.34));

    return result;
  }


  
  render() {
    let prericted = this.predictedTime(this.props.time, this.props.oldDist, this.props.newDist);
    return (
        <Paper zDepth={1}>
        <div>{this.props.text}</div>
        <div>{prericted.time}</div>
        <div>{prericted.paceKm}</div>
        <div>{prericted.paceMi}</div>
        </Paper>
        // <TableRow>
        //     <TableRowColumn>{this.props.text}</TableRowColumn>
        //     <TableRowColumn>{prericted.time}</TableRowColumn>
        //     <TableRowColumn>{prericted.paceKm}</TableRowColumn>
        //     <TableRowColumn>{prericted.paceMi}</TableRowColumn>
        // </TableRow>
    );
  }
}

class PredictedSplitTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
     };
  }


  render() {
    return (
    <div>
        <div>
             <Table style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TableBody displayRowCheckbox={false}>
                    <TableRow style={{borderBottom: '2px solid #e0e0e0', fontWeight: 'bold'}}>
                        <TableRowColumn>Split Distance</TableRowColumn>
                        <TableRowColumn>Split Time</TableRowColumn>
                        <TableRowColumn>Pace (min/km)</TableRowColumn>
                        <TableRowColumn>Pace (min/mi)</TableRowColumn>
                    </TableRow>
                    </TableBody>
            </Table>
                    <SplitRow text='1 500 m' newDist='1500' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='1 mi' newDist='1609.344' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='3 mi' newDist='4828.03' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='5 km' newDist='5000' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='5 mi' newDist='8046.72' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='10 km' newDist='10000' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='15 km' newDist='15000' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='10 mi' newDist='16093.4' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='1/2 marathon' newDist='21097.5' oldDist={this.props.distance} time={this.props.time}/>
                    <SplitRow text='marathon' newDist='42195' oldDist={this.props.distance} time={this.props.time}/>
           
        </div>
    </div>
    );
  }
}



export default PredictedSplitTimes;
