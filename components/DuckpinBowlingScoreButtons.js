import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
        >
            <Grid item xs={'auto'}>
                <Button variant="outlined" disabled={this.state.disabled[0]} style={btnStyle} onClick={() => this.handleClick(0)}>0</Button>
                <Button variant="outlined" disabled={this.state.disabled[1]} style={btnStyle} onClick={() => this.handleClick(1)}>1</Button>
                <Button variant="outlined" disabled={this.state.disabled[2]} style={btnStyle} onClick={() => this.handleClick(2)}>2</Button>
            </Grid>
            <Grid item xs={'auto'}>
                <Button variant="outlined" disabled={this.state.disabled[3]} style={btnStyle} onClick={() => this.handleClick(3)}>3</Button>
                <Button variant="outlined" disabled={this.state.disabled[4]} style={btnStyle} onClick={() => this.handleClick(4)}>4</Button>
                <Button variant="outlined" disabled={this.state.disabled[5]} style={btnStyle} onClick={() => this.handleClick(5)}>5</Button>
            </Grid>
            <Grid item xs={'auto'}>
                <Button variant="outlined" disabled={this.state.disabled[6]} style={btnStyle} onClick={() => this.handleClick(6)}>6</Button>
                <Button variant="outlined" disabled={this.state.disabled[7]} style={btnStyle} onClick={() => this.handleClick(7)}>7</Button>
                <Button variant="outlined" disabled={this.state.disabled[8]} style={btnStyle} onClick={() => this.handleClick(8)}>8</Button>
            </Grid>
            <Grid item xs={'auto'}>
                <Button variant="outlined" disabled={this.state.disabled[9]} style={btnStyle} onClick={() => this.handleClick(9)}>9</Button>
                <Button variant="outlined" disabled={this.state.spareDisabled} style={btnStyle} onClick={() => this.handleClick('/')}>/</Button>
                <Button variant="outlined" disabled={this.state.strikeDisabled} style={btnStyle} onClick={() => this.handleClick('x')}>X</Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" style={btnStyle} onClick={() => this.handleClick('new')}>New Game</Button>
            </Grid>
        </Grid>
    );
  }
}

export default DuckpinBowlingScoreButtons;
