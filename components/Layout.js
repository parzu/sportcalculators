import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Link from 'next/link';
import AppBar from 'material-ui/AppBar';
import Head from 'next/head';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import WidgetsIcon from 'material-ui/svg-icons/device/widgets';


const muiThemeConfig = getMuiTheme({}, {userAgent: 'all'});

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false, docked: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleWindowResize() {
    if(window.innerWidth < 900) {
      this.setState({ open: false, docked: false});
    } else {
      this.setState({ open: true, docked: true});
    }
  }

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize.bind(this));
  }


  render() {
    return (

      <MuiThemeProvider muiTheme={muiThemeConfig}>
        <div>            
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://use.fontawesome.com/4a9aa864c0.js"></script>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
            </Head>
           <style jsx global>{`
                body {
                    margin: 0;
                    font-family: 'Roboto', sans-serif;

                }
                h3 {
                    font-weight: normal;
                }
                .calculator {
                    font-weight: normal;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 40px;

                }
                .container {
                    margin: 40px;
                   
                }
                .calculatorBox {
                    margin: 20px;
                }
                @media (max-width: 600px) {
                    .container {
                        margin-left: 15px;
                        margin-right: 15px;
                    }
                    .calculatorBox {
                        margin-left: 15px;
                        margin-right: 15px;
                    }
                }
                @media (min-width: 900px) {
                    .container {
                        margin-left: 296px;
                    }
                }
            `}</style>
            <AppBar
                title="SportCalculators"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle}
            />
            <div className="navigation">
                <Drawer  
                    open={this.state.open} 
                    docked={this.state.docked}
                    onRequestChange={this.handleToggle.bind(this)}
                >
                        <AppBar showMenuIconButton={false} title='SportCalculators'/>
                        <List>
                            <Subheader>Bowling</Subheader>
                            <Link href="/bowling-score-calculator">
                                <ListItem
                                    primaryText="Bowling Score Calculator"
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
                            <Subheader>Cycling</Subheader>
                            <Link href="/cycling-speed-calculator">
                                <ListItem
                                    primaryText="Cycling Speed Calculator"
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
            <div className='container'>
                {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>

    );
  }
}