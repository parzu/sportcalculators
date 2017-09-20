import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
//import Speed from '../services/speedConversions.js';
import * as Speed from '../services/speedService.js';

class SpeedDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
     };
  }


  render() {
    //let spd = new Speed(this.props.speed);
    return (
    <div>
        <style jsx >{`
            .speedDisplayTableHeaderRow {
                border: 2px solid #FF9800 !important;
                background-color: #ffd699 !important;
            }
        `}</style>
        <div>
             <Table style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TableBody displayRowCheckbox={false}>
                    <TableRow className='speedDisplayTableHeaderRow'>
                    {/* <TableRow className='headerRow' style={{borderBottom: '2px solid #e0e0e0', fontWeight: 'bold'}}> */}
                        <TableRowColumn>Metric</TableRowColumn>
                        <TableRowColumn>Imperial</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>{Speed.mps(this.props.speed)} m/s</TableRowColumn>
                        <TableRowColumn>{Speed.mpsToFps(this.props.speed)} ft/s</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>{Speed.mpsToKmPace(this.props.speed)} min/km</TableRowColumn>
                        <TableRowColumn>{Speed.mpsToMilePace(this.props.speed)} min/mi</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>{Speed.mpsToKmh(this.props.speed)} km/h</TableRowColumn>
                        <TableRowColumn>{Speed.mpsToMph(this.props.speed)} mph</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
    );
  }
}

export default SpeedDisplay;
