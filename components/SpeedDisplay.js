import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class SpeedDisplay extends React.Component {
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
                        <TableRowColumn>Metric</TableRowColumn>
                        <TableRowColumn>Imperial</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn className='tableCell'>{this.props.speed.toFixed(2)} m/s</TableRowColumn>
                        <TableRowColumn>{(this.props.speed*3.28084).toFixed(2)} ft/s</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>{(16.67/this.props.speed).toFixed(2)} min/km</TableRowColumn>
                        <TableRowColumn>{(26.82/this.props.speed).toFixed(2)} min/mi</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>{(this.props.speed*3.6).toFixed(2)} km/h</TableRowColumn>
                        <TableRowColumn>{(this.props.speed*2.237).toFixed(2)} mph</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
    );
  }
}

export default SpeedDisplay;
