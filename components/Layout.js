import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Link from 'next/link';
import AppBar from 'material-ui/AppBar';
import Head from 'next/head';

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
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
                title="SportCalculators"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle}
            />
            {/*<RaisedButton
                label="Toggle Drawer"
                onClick={this.handleToggle}
            />*/}
            <div className="navigation">
                <Drawer  
                    open={this.state.open} 
                    docked={this.state.docked}
                    onRequestChange={(open) => this.setState({open})}
                >
                        <AppBar showMenuIconButton={false} title='SportCalculators'/>
                        <MenuItem><Link href="/"><a>Home</a></Link></MenuItem>
                        <MenuItem><Link href="/calculator"><a>Calculator</a></Link></MenuItem>
                        <MenuItem onClick={this.handleToggle}>Close</MenuItem>
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