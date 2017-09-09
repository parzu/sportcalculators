import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Layout from '../components/Layout.js';
import SpeedCalculator from '../components/speed_calculator/SpeedCalculator.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';





const App = () => (
  <Layout>
      <h2>All Calculators</h2>
      <Card style={{maxWidth: '300px'}}>
        <CardMedia

          overlay={<CardTitle title="Running Speed Calculator" subtitle="Running" />}
        >
          <img src="/static/run.svg" />
        </CardMedia>
        <CardText>
        Calculate running speed from time and distance. Calculator shows the result in the most used units including minutes/km and minutes/mile. You can input distance in meters, feet, kilometers or miles.
        </CardText>
      </Card>

      <Card style={{maxWidth: '300px'}}>
        <CardMedia

          overlay={<CardTitle title="Running Speed Calculator" subtitle="Running" />}
        >
          <img src="/static/run.svg" />
        </CardMedia>
        <CardText>
        Calculate running speed from time and distance. Calculator shows the result in the most used units including minutes/km and minutes/mile. You can input distance in meters, feet, kilometers or miles.
        </CardText>
      </Card>
  </Layout>
);

export default App;