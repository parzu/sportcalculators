import React from 'react';
import { Grid, Row, Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import TimeSelector from './TimeSelector.js';
import DistanceSelector from './DistanceSelector.js';
import SpeedDisplay from './SpeedDisplay.js';
import Head from 'next/head'
//import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      distance: 0,
      speed: 0,
    };
  }

  calculateSpeed() {
    if (this.state.time > 0 && this.state.distance > 0) {
      this.setState({speed: this.state.distance / this.state.time});
    }
  }

  onTimeChange(totalSecs) {
    this.setState({time: totalSecs}, this.calculateSpeed);
  }

  onDistanceChange(dist) {
    this.setState({distance: dist}, this.calculateSpeed);
  }

  render() {
    return (
      <div>
      <Head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
      </Head>
      <Grid>
            <Row>
                <Navbar inverse collapseOnSelect>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="#">SportCalculators</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
                    <Nav>
                      <NavDropdown eventKey={3} title="Calculators" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                      </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                      <NavItem eventKey={1} href="#">About</NavItem>
                      <NavItem eventKey={2} href="#">Contact</NavItem>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
            </Row>
            <Row>
              <TimeSelector time={this.state.time} onTimeChange={this.onTimeChange.bind(this)}/> 
            </Row>
            <Row>
              <DistanceSelector distance={this.state.distance} onDistanceChange={this.onDistanceChange.bind(this)}/> 
            </Row>
            <Row>
              <SpeedDisplay speed={this.state.speed} /> 
            </Row>
      </Grid>
      </div>
    );
  }
}

export default App;