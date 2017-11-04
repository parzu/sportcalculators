import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class DuckpinBowlingScoreButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        disabled: [false, false, false, false, false, false, false, false, false, false],
        spareDisabled: true,
        strikeDisabled: false,
     };
     //this.setDisabledButtons();
  }

  handleClick(value) {
    this.props.onClick(value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
        this.setDisabledButtons();
    }
  }

  setDisabledButtons() {
    if (this.props.running == false) {
        this.gameEnd();
    } else if (this.props.throwNum == 1) {
        this.setInitialButtons();
    } else if (this.props.throwNum == 2) {
        if (this.props.frameNum == 10) {
            if (this.props.lastThrow == 'x') {
                this.setInitialButtons();
            } else {
                this.setAfterThrowButtons(this.props.lastThrow);
            }
        } else {
            this.setAfterThrowButtons(this.props.lastThrow);
        }
    }
    else if (this.props.throwNum == 3) {
        if (this.props.frameNum == 10) {
            if (this.props.lastThrow == '/' || this.props.lastThrow == 'x') {
                this.setInitialButtons();
            } else {
                this.setAfterThrowButtons(this.props.lastThrow);
            }
        } else {
            this.setAfterThrowButtons(this.props.frameSum-1);
            this.setState({spareDisabled: true});
        }
    } else {
        if (this.props.lastThrow == 'x' || this.props.lastThrow == '/') {
            this.setInitialButtons();
        } else {
            this.setAfterThrowButtons(this.props.lastThrow);
        }    
    }
  }

  gameEnd() {
    this.setState({strikeDisabled: true});
    this.setState({spareDisabled: true});
    let disArray = [true, true, true, true, true,true, true, true, true, true];
    this.setState({disabled: disArray}); 
  }

  setInitialButtons() {
    this.setState({strikeDisabled: false});
    this.setState({spareDisabled: true});
    let disArray = [false, false, false, false, false, false, false, false, false, false];
    this.setState({disabled: disArray});  
  }

  setAfterThrowButtons(value) {
    this.setState({strikeDisabled: true});
    this.setState({spareDisabled: false});
    let disArray = [true, true, true, true, true,true, true, true, true, true];
    for (var i = 0; i < (disArray.length-value); i++) {
        disArray[i] = false;
    }
    this.setState({disabled: disArray});  
  }

  render() {

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

            `}</style>
            <div className="btnParent">
                <div className="btnChild">
                    <RaisedButton label="0" disabled={this.state.disabled[0]} style={btnStyle} onClick={() => this.handleClick(0)} />
                    <RaisedButton label="1" disabled={this.state.disabled[1]} style={btnStyle} onClick={() => this.handleClick(1)} />
                    <RaisedButton label="2" disabled={this.state.disabled[2]} style={btnStyle} onClick={() => this.handleClick(2)} />
                    <RaisedButton label="3" disabled={this.state.disabled[3]} style={btnStyle} onClick={() => this.handleClick(3)} />
                    <RaisedButton label="4" disabled={this.state.disabled[4]} style={btnStyle} onClick={() => this.handleClick(4)}/>
                    <RaisedButton label="5" disabled={this.state.disabled[5]} style={btnStyle} onClick={() => this.handleClick(5)} />

                    <RaisedButton label="6" disabled={this.state.disabled[6]} style={btnStyle} onClick={() => this.handleClick(6)} />
                    <RaisedButton label="7" disabled={this.state.disabled[7]} style={btnStyle} onClick={() => this.handleClick(7)} />
                    <RaisedButton label="8" disabled={this.state.disabled[8]} style={btnStyle} onClick={() => this.handleClick(8)} />
                    <RaisedButton label="9" disabled={this.state.disabled[9]} style={btnStyle} onClick={() => this.handleClick(9)} />
                    <RaisedButton label="/" disabled={this.state.spareDisabled} style={btnStyle} onClick={() => this.handleClick('/')}/>
                    <RaisedButton label="X" disabled={this.state.strikeDisabled} style={btnStyle} onClick={() => this.handleClick('x')}/>
                </div>
                <div className="btnChild">
                    <RaisedButton label="New Game" style={btnStyle} onClick={() => this.handleClick('new')}/>
                </div>
            </div>
        </div>
    );
  }
}

export default DuckpinBowlingScoreButtons;
