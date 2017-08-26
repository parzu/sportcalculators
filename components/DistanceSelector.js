import React from 'react';
import { Grid, Row, Col, FormGroup, Radio, FormControl} from 'react-bootstrap';
//import './TimeSelector.css';

class DistanceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        dist: '0',
        distType: 'm',
     };
  }

  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value}, this.distChanged);
  }

  distChanged() {
    let multiple = 1;
    switch (this.state.distType) {
        case 'ft': multiple=0.3048; break;
        case 'km': multiple=1000; break;
        case 'miles': multiple=1.6093; break;
        default: multiple=1; break;
    } 
    console.log(this.state.dist);
    console.log(multiple);
    this.props.onDistanceChange(parseFloat(this.state.dist) * multiple);
  }

  render() {
    return (
        <form>
            <FormGroup>
                <Grid>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormControl placeholder="dist" componentClass="input" name="dist" type='text' onChange={this.handleChange.bind(this)} />
                        </Col>
                        <Col xs={12} md={6}>
                            <FormGroup onChange={this.handleChange.bind(this)} >
                                <Radio name="distType" value='m' inline selected>
                                    m
                                </Radio>
                                {' '}
                                <Radio name="distType" value='ft' inline>
                                    ft
                                </Radio>
                                {' '}
                                <Radio name="distType" value='km' inline>
                                    km
                                </Radio>
                                {' '}
                                <Radio name="distType" value='miles' inline>
                                    miles
                                </Radio>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>
            </FormGroup>
        </form>
    );
  }
}

export default DistanceSelector;
