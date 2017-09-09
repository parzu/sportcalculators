import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class SplitRow extends React.Component {
  constructor(props) {
      super(props);
  }
  
  formatTime(secs) {
    let hours = parseInt(secs / 3600);
    secs = secs-(hours*3600);
    let mins = parseInt(secs/60);
    secs = parseInt(secs-(mins*60));
    if (mins < 10) {
        mins = '0'+mins.toPrecision(1);
    }
    if (secs < 10) {
        secs = '0'+secs.toPrecision(1);
    }

    return hours+':'+mins+':'+secs;
  }

  predictedTime(time, orgDist, newDist) {
    let result = {time: 0, paceKm: 0, paceMi: 0};
    let secs = time*Math.pow((newDist/orgDist), 1.06);

    result.time = this.formatTime(secs);
    result.paceKm = this.formatTime(secs / (newDist/1000));
    result.paceMi = this.formatTime(secs / (newDist/1609.34));

    return result;
  }


  
  render() {
    let prericted = this.predictedTime(this.props.time, this.props.oldDist, this.props.newDist);
    return (
        <TableRow>
            <TableRowColumn>{this.props.text}</TableRowColumn>
            <TableRowColumn>{prericted.time}</TableRowColumn>
            <TableRowColumn>{prericted.paceKm}</TableRowColumn>
            <TableRowColumn>{prericted.paceMi}</TableRowColumn>
        </TableRow>
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
        <style jsx >{`
            .headerRow {
                border-bottom: 2px;
                background-color: blue;
            }
        `}</style>
        <div>
             <Table className='speedTable'  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TableBody displayRowCheckbox={false}>
                    <TableRow style={{borderBottom: '2px solid #e0e0e0', fontWeight: 'bold'}}>
                        <TableRowColumn>Split Distance</TableRowColumn>
                        <TableRowColumn>Split Time</TableRowColumn>
                        <TableRowColumn>Pace (min/km)</TableRowColumn>
                        <TableRowColumn>Pace (min/mi)</TableRowColumn>
                    </TableRow>
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
                </TableBody>
            </Table>
        </div>
    </div>
    );
  }
}



export default PredictedSplitTimes;
