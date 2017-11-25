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
import Navigation from './Navigation.js';


const muiThemeConfig = getMuiTheme({}, {userAgent: 'all'});

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        menuOpen: false,
        menuDocked: false
    };
  }

    handleToggle() {
        this.setState({menuOpen: true});
    }

    handleWindowResize() {
        if(window.innerWidth < 900) {
            this.setState({ menuOpen: false, menuDocked: false});
        } else {
            this.setState({ menuOpen: true, menuDocked: true});
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

                .appBarLink {
                    text-decoration: none;
                    color: white;
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
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                    .calculatorBox {
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                }
                @media (min-width: 900px) {
                    .container {
                        margin-left: 296px;
                    }
                }
            `}</style>
            <AppBar
                title={<a className="appBarLink" href="/">SportCalculators</a>}
                style={{ backgroundColor: '#034f84' }}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            />
            <Navigation menuOpen={this.state.menuOpen} menuDocked={this.state.menuDocked}/>
            <div className='container'>
                {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>

    );
  }
}