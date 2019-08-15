/*import React from 'react';
import ReactDOM from 'react-dom';
// import Button from '@material-ui/core/Button';
import LandingLayout from '../components/LandingLayout.js';
import CalculatorList from '../components/CalculatorList.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from '@material-ui/core/Card';
// import FlatButton from '@material-ui/core/FlatButton';


const allCalculators = [
  {
    groupTitle: 'Bowling',
    calculators: [
      {
        title: 'Bowling Score Calculator',
        description: 'Traditional bowling score calculator for ten-pin bowling',
        link: 'bowling-score-calculator',
        avatar: ''
      },
      {
        title: 'Bowling Handicap Calculator',
        description: 'Calculator for calculating your bowling handicap and your result with the handicap',
        link: 'bowling-handicap-calculator',
        avatar: ''
      }
    ]
  },
  {
    groupTitle: 'Running',
    calculators: [
      {
        title: 'Running Speed Calculator',
        description: 'Calculating Runnig Speed',
        link: 'running-speed-calculator',
        avatar: ''
      },
      {
        title: 'Race Time Calculator',
        description: 'Calculate race time predictions based on your reacent runs',
        link: 'race-time-calculator',
        avatar: ''
      }
    ]
  }
]


const App = () => (
  <LandingLayout>
     <style jsx global>{`
        .popularParent {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          width: 100%;
        }
        .popularChild {
          flex-basis: 280px;
          min-width: 280px;
          margin: 5px;
        }
        .popularChild:hover {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .popularHeader {
          background-color: #F0F0F0;
          text-align: center;
          height: 64px;
          font-weight: 500;
          font-size: 16px;
          line-height: 64px;
          color: black;
        }
        .popularContent {
          background-color: #919fad;
          height: 200px;
          text-align: center;
          
        }
        .popularContent img {
          margin-top: 10px;
          width: 260px;
        }

    `}</style>
    <h2>The Most Popular Calculators</h2>
    <div className="popularParent">
    <div className="popularChild">
      <a href="bowling-score-calculator">
          <div className="popularHeader">
            Bowling Score Calculator
          </div>
          <div className="popularContent">
            <img src="/static/bowling_score_calculator.png" />
          </div>
      </a>
      </div>
      <div className="popularChild">
      <a href="bowling-handicap-calculator">
        <div className="popularHeader">
          Bowling Handicap Calculator
        </div>
        <div className="popularContent">
          <img src="/static/bowling_handicap_calculator.png" />
        </div>
      </a>
      </div>
      <div className="popularChild">
      <a href="heptathlon-calculator">
        <div className="popularHeader">
          Heptahtlon Calculator
        </div>
        <div className="popularContent">
          <img src="/static/heptathlon_calculator.png" />
        </div>
      </a>
      </div>
    </div>
    <h2>All Calculators</h2>
    <CalculatorList calculators={allCalculators}/>


      {/* <h2>All Calculators</h2>
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
      </Card> }
  </LandingLayout>
);

export default App;
*/