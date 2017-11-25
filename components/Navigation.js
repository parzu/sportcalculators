import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'next/link';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import WidgetsIcon from 'material-ui/svg-icons/device/widgets';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        open: false, 
        docked: false
     };
  }

    handleToggle = () => this.setState({open: !this.state.open});



  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
        this.setState({open: this.props.menuOpen});
        this.setState({docked: this.props.menuDocked});
    }
  }

  render() {
    return (
        <div className="navigation">
            <style jsx global>{`
                .appBarLink {
                    text-decoration: none;
                    color: white;
                }
            `}</style>
                <Drawer  
                    open={this.state.open} 
                    docked={this.state.docked}
                    onRequestChange={this.handleToggle.bind(this)}
                >
                        <AppBar 
                            showMenuIconButton={false} 
                            title={<a className="appBarLink" href="/">SportCalculators</a>}
                            style={{ backgroundColor: '#034f84' }}
                            />
                        <List>
                            <Subheader>Bowling</Subheader>
                            <Link href="/bowling-score-calculator">
                                <ListItem
                                    primaryText="Bowling Score Calculator"
                                />
                            </Link>
                            <Link href="/bowling-handicap-calculator">
                                <ListItem
                                    primaryText="Bowling Handicap Calculator"
                                />
                            </Link>
                            <Link href="/duckpin-bowling-score-calculator">
                                <ListItem
                                    primaryText="Duckpin Bowling Score Calculator"
                                />
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Subheader>Combined Events</Subheader>
                            <Link href="/heptathlon-calculator">
                                <ListItem
                                    primaryText="Heptathlon Calculator"
                                />
                            </Link>
                            <Link href="/decathlon-calculator">
                                <ListItem
                                    primaryText="Decathlon Calculator"
                                />
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Subheader>Cycling</Subheader>
                            <Link href="/cycling-speed-calculator">
                                <ListItem
                                    primaryText="Cycling Speed Calculator"
                                />
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Subheader>Multisports</Subheader>
                            <Link href="/triathlon-calculator">
                                <ListItem
                                    primaryText="Triathlon Calculator"
                                />
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Subheader>Running</Subheader>
                            <Link href="/running-speed-calculator">
                                <ListItem
                                    primaryText="Running Speed Calculator"
                                />
                            </Link>
                            <Link href="/race-time-calculator">
                                <ListItem
                                    primaryText="Race Time Calculator"
                                />
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Link href="/">
                                <ListItem 
                                    primaryText="Home"
                                    leftIcon={<FontIcon/>}
                                />
                            </Link>
                            <Link href="/about">
                                <ListItem primaryText="About" />
                            </Link>
                            <Link href="/contact">
                                <ListItem primaryText="Contact" />
                            </Link>
                            <Link href="/privacy">
                                <ListItem primaryText="Privacy" />
                            </Link>
                        </List>
                    </Drawer>
            </div>
    );
  }
}

export default Navigation;
