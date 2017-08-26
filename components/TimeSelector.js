import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
//import './TimeSelector.css';

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        hours: '0',
        minutes: '0',
        seconds: '0',
     };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, this.timeChanged);
  }

  timeChanged() {
    this.props.onTimeChange(parseInt(this.state.hours, 10) * 3600 + parseInt(this.state.minutes, 10) * 60 + parseInt(this.state.seconds, 10));
  }

  render() {
    return (
        <form>
            <FormGroup>
                <Grid>
                    <Row>
                        <Col xs={4}>
                            <FormControl placeholder="hrs" componentClass="input" name="hours" type='text'  onChange={this.handleChange.bind(this)} />
                        </Col>
                        <Col xs={4}>
                            <FormControl placeholder="min" componentClass="input" name="minutes" type='text' onChange={this.handleChange.bind(this)}/>
                        </Col>
                        <Col xs={4}>
                            <FormControl placeholder="sec" componentClass="input" name="seconds" type='text' onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </Row>
                </Grid>
            </FormGroup>
        </form>
    );
  }
}

export default TimeSelector;
