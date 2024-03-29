import React from 'react';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import {formatTime} from '../services/timeService.js'

class SplitRow extends React.Component {
  constructor(props) {
      super(props);
  }
  
  predictedTime(time, orgDist, newDist) {
    let result = {time: 0, paceKm: 0, paceMi: 0};
    let secs = time*Math.pow((newDist/orgDist), 1.06);

    result.time = formatTime(secs);
    result.paceKm = formatTime(secs / (newDist/1000));
    result.paceMi = formatTime(secs / (newDist/1609.34));

    return result;
  }


  
  render() {
    let prericted = this.predictedTime(this.props.time, this.props.oldDist, this.props.newDist);
    return (
        <div className="paperDiv">
          <style jsx >{`
            .paperDiv {
              margin-bottom: 20px;
            }
            .parentDiv {
              display: flex;
              flex-direction: row;
              justify-content: center;
              padding: 10px;
              margin-top: 20px;
            }
            .childDiv {
              margin: auto;
              flex-basis: 25%;
            }
            .raceName {
              font-weight: bold;
              color: gray;
              margin: 15px;
              text-align: left;
              align-self: flex-start;
            }
            .timeDivParent {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .timeDivChild {
                          
            }
            @media (max-width: 650px) {
              .parentDiv {
                flex-direction: column;
                padding: 0px;
              }
              .childDiv {
                margin: 0px;
                                
              }
              .timeDivParent {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                flex-wrap: wrap;
              }
              .timeDivChild {
                flex-basis: 60%;
              }
              .timeDivChild2 {
                flex-basis: 40%;
              }
              .raceName {
                font-size: larger;
                margin: 15px;
              }

            }              
          `}</style>


          <Paper elevation={1}>
            <div className="parentDiv">
              <div className="childDiv raceName">{this.props.text}</div>
              <div className="childDiv">
                <div className="timeDivParent">
                  <div className="timeDivChild"><ListSubheader>Race time</ListSubheader></div>
                  <div className="timeDivChild2">{prericted.time}</div>
                </div>
              </div>
              <div className="childDiv">
                <div className="timeDivParent">
                  <div className="timeDivChild"><ListSubheader>Pace (min/km)</ListSubheader></div>
                  <div className="timeDivChild2">{prericted.paceKm}</div>
                </div>
              </div>
              <div className="childDiv">
                <div className="timeDivParent">
                  <div className="timeDivChild"><ListSubheader>Pace (min/mi)</ListSubheader></div>
                  <div className="timeDivChild2">{prericted.paceMi}</div>
                </div>
              </div>
            </div>
          </Paper>
        </div>
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
    </div>
    );
  }
}



export default PredictedSplitTimes;
