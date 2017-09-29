import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class BowlingScoreCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const paperStyle = {
      padding: 20,
      textAlign: 'center',
      maxWidth: '600px',
      diplay: 'flex',
    };

    const btnStyle = {
      margin: 5,
    };

    return (
      <div>
        <style jsx >{`
          .parent {
            display: flex;
            justify-content: center;
            flex-direction: column;
          }
          .child {
            margin: auto;
          }
          .btnParent {
            display: flex;
            flex-direction: column;
          }
          .frame {
            border: 1px solid black;
            display: flex;
            flex-flow: row wrap;
            width: 50px;
            height: 50px;
          }
          .throw {
            flex: 1 auto;
          }
          .throw-2 {
            border-left: 1px solid black;
            border-bottom: 1px solid black;
            
          }
          .result {
            flex: 1 100%;
          }
          `}
        </style>



        <Paper style={paperStyle} zDepth={3}>
          <div className="parent">
            <div className="framesParent">
              <div className="frame child">
                <div className="throw throw-1">
                  1
                </div>
                <div className="throw throw-2">
                  2
                </div>
                <div className="result">
                  3
                </div>
              </div>
              <div className="frame child">
                <div className="throw throw-1">
                  1
                </div>
                <div className="throw throw-2">
                  2
                </div>
                <div className="result">
                  3
                </div>
              </div>
            </div>          
            
            <div className="btnParent child">
              <div className="btnChild">
                <RaisedButton label="1" style={btnStyle} />
                <RaisedButton label="2" style={btnStyle} />
                <RaisedButton label="3" style={btnStyle} />
                <RaisedButton label="4" style={btnStyle} />
                <RaisedButton label="5" style={btnStyle} />
              </div>
              <div className="btnChild">
                <RaisedButton label="6" style={btnStyle} />
                <RaisedButton label="7" style={btnStyle} />
                <RaisedButton label="8" style={btnStyle} />
                <RaisedButton label="9" style={btnStyle} />
                <RaisedButton label="0" style={btnStyle} />
              </div>
              <div className="btnChild">
                <RaisedButton label="/" style={btnStyle} />
                <RaisedButton label="X" style={btnStyle} />
                <RaisedButton label="New Game" style={btnStyle} />
              </div>
            </div>
          </div>
        </Paper>
        
      </div>
    );
  }
}

export default BowlingScoreCalculator;