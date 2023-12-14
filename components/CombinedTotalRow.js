import React from 'react';
import TextField from '@mui/material/TextField';

class CombinedTotalRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     };
  }

  render() {
    return (
        <div className="heptRow">
        <style jsx >{`
          .heptRow {
            display: flex;
            flex-flow: row;
            justify-content: space-evenly;
            font-weight: bold;
            text-transform: uppercase;
            background-color: #FAFAFA;
            margin-left: -20px;
            margin-right: -20px;
            border-top: 1px solid #F4F4F4;
            margin-top: 20px;

          }
          .heptCol {
            align-self: baseline;
            margin: 10px;
            flex-basis: 50%;
            
          }
          .heptCol.text {
            text-align: left;
          }
          .heptCol.points {
            margin-left: 30px;
            font-size: 1.5em;
          }
          @media (max-width: 399px) {
            .heptCol.points {

            }
            .heptCol.text {
              flex-basis: 70%;
            }
            .heptCol.points {
              flex-basis: 30%;
            }
          }
        `}</style>
        
        
        <div className="heptCol text">
          {this.props.text}
        </div>

        <div className="heptCol points">
            {this.props.points}
        </div>

    </div>
    );
  }
}

export default CombinedTotalRow;
