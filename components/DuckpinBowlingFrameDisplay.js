import React from 'react';

class DuckpinBowlingFrameDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        throw1: '',
        throw2: '',
        throw3: '',
        result: ''
     };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
        if (this.props.frameNum < 10 && this.props.throws[0] == 'x') {
            this.setState({throw1: '', throw2: 'x'});
        } else {
            this.setState({throw1: this.props.throws[0], throw2: this.props.throws[1], throw3: this.props.throws[2]});
        }
        this.state.result = this.props.result;
    }
  }

  render() {
        return (
            <div>
                <style jsx >{`          
                    .frame {
                        border: 1px solid black;
                        border-right: 0px;
                        display: flex;
                        flex-flow: row wrap;
                        height: 70px;
                        width: 100%;
                        font-size: 0.8em;
                    }
                    .throw {
                        flex: 1 10%;
                        height: 35px;

                    }
                    .throw-2 {
                        border-left: 1px solid black;
                        border-bottom: 1px solid black;
                        
                    }
                    .throw-3 {
                        border-left: 1px solid black;
                        border-bottom: 1px solid black;
                        
                    }
                    .result {
                        height: 35px;
                        flex: 1 100%;
                    }

                `}</style>
                <div className="frame">
                    <div className="throw throw-1">
                        {this.state.throw1}
                    </div>
                    <div className="throw throw-2">
                        {this.state.throw2}
                    </div>
                    <div className="throw throw-3">
                        {this.state.throw3}
                    </div>
                    <div className="result">
                        {this.state.result}
                    </div>
                </div>
            </div>
        );   
  }
}

export default DuckpinBowlingFrameDisplay;
