import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';


class CalculatorList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
       };
    }


    getSportHeadline(sport) {
      return (<Subheader>{sport.groupTitle}</Subheader>);
    }

    getDivider(inst) {
      return (<Divider inset={inst} />);
    }


    getCalculatorHtml(calc) {
      return (
        <a href={calc.link}> 
          <ListItem 
            insetChildren={true}
            //leftAvatar={<Avatar src='+calc.avatar+' backgroundColor={"#FFFFFF"} />} \
            primaryText={calc.title}
            secondaryText={ 
              <p> 
                {calc.description} 
              </p> 
            } 
          secondaryTextLines={2} 
          />
        </a>
      );
    }


    constructHtml(calcs) {
      let html = [];
      for (var k = 0; k < calcs.length; k++) {
        html.push(this.getSportHeadline(calcs[k]));
        for (var i = 0; i < calcs[k].calculators.length; i++) {
          html.push(this.getCalculatorHtml(calcs[k].calculators[i]));
          if (i < calcs[k].calculators.length-1) {
            html.push(this.getDivider(true));
          }
        }
        if (k < calcs.length-1) {
          html.push(this.getDivider(false));
        }
      }
      return html;
    }

    render() {
    
      let html = this.constructHtml(this.props.calculators);

      return (
        <div>
          <Paper>
            <List>
              {html}
            </List>
          </Paper>
        </div>
      );
    }
}
export default CalculatorList;