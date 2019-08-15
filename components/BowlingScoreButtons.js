import React from 'react';
import Button from '@material-ui/core/Button';

class BowlingScoreButtons extends React.Component {
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
      console.log(this.props.running);
    if (this.props.running == false) {
        console.log("end");
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
                    <Button label="0" disabled={this.state.disabled[0]} style={btnStyle} onClick={() => this.handleClick(0)} />
                    <Button label="1" disabled={this.state.disabled[1]} style={btnStyle} onClick={() => this.handleClick(1)} />
                    <Button label="2" disabled={this.state.disabled[2]} style={btnStyle} onClick={() => this.handleClick(2)} />
                    <Button label="3" disabled={this.state.disabled[3]} style={btnStyle} onClick={() => this.handleClick(3)} />
                    <Button label="4" disabled={this.state.disabled[4]} style={btnStyle} onClick={() => this.handleClick(4)}/>
                    <Button label="5" disabled={this.state.disabled[5]} style={btnStyle} onClick={() => this.handleClick(5)} />

                    <Button label="6" disabled={this.state.disabled[6]} style={btnStyle} onClick={() => this.handleClick(6)} />
                    <Button label="7" disabled={this.state.disabled[7]} style={btnStyle} onClick={() => this.handleClick(7)} />
                    <Button label="8" disabled={this.state.disabled[8]} style={btnStyle} onClick={() => this.handleClick(8)} />
                    <Button label="9" disabled={this.state.disabled[9]} style={btnStyle} onClick={() => this.handleClick(9)} />
                    <Button label="/" disabled={this.state.spareDisabled} style={btnStyle} onClick={() => this.handleClick('/')}/>
                    <Button label="X" disabled={this.state.strikeDisabled} style={btnStyle} onClick={() => this.handleClick('x')}/>
                </div>
                <div className="btnChild">
                    <Button label="New Game" style={btnStyle} onClick={() => this.handleClick('new')}/>
                </div>
            </div>
        </div>
    );
  }
}

export default BowlingScoreButtons;
