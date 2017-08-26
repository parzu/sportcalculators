import React from 'react';
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

class SpeedDisplay extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//         hours: '0',
//         minutes: '0',
//         seconds: '0',
//      };
//   }

  render() {
    return (
    <Grid>
        <Row>
            <Col xs={12} md ={6}>
                <Panel collapsible defaultExpanded header="Metric">
                    <ListGroup fill>
                    <ListGroupItem>{this.props.speed.toFixed(2)} m/s</ListGroupItem>
                    <ListGroupItem>{(16.67/this.props.speed).toFixed(2)} min/km</ListGroupItem>
                    <ListGroupItem>{(this.props.speed*3.6).toFixed(2)} km/h</ListGroupItem>
                    </ListGroup>
                </Panel>
            </Col>
            <Col xs={12} md ={6}>
                <Panel collapsible defaultExpanded header="Imperial">
                    <ListGroup fill>
                    <ListGroupItem>{(this.props.speed*3.28084).toFixed(2)} ft/s</ListGroupItem>
                    <ListGroupItem>{(26.82/this.props.speed).toFixed(2)} min/mi</ListGroupItem>
                    <ListGroupItem>{(this.props.speed*2.237).toFixed(2)} mph</ListGroupItem>
                    </ListGroup>
                </Panel>
            </Col>
        </Row>
    </Grid>
    );
  }
}

export default SpeedDisplay;
