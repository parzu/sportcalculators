import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
                <TableBody>
                    <TableRow className='speedDisplayTableHeaderRow'>
                    {/* <TableRow className='headerRow' style={{borderBottom: '2px solid #e0e0e0', fontWeight: 'bold'}}> */}
                        <TableCell>Metric</TableCell>
                        <TableCell>Imperial</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{Speed.mps(this.props.speed)} m/s</TableCell>
                        <TableCell>{Speed.mpsToFps(this.props.speed)} ft/s</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{Speed.mpsToKmPace(this.props.speed)} min/km</TableCell>
                        <TableCell>{Speed.mpsToMilePace(this.props.speed)} min/mi</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{Speed.mpsToKmh(this.props.speed)} km/h</TableCell>
                        <TableCell>{Speed.mpsToMph(this.props.speed)} mph</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
    );
  }
}

export default SpeedDisplay;
