import React from 'react';;
import { ThemeProvider } from '@material-ui/styles';
/*

!!!!!!*************!!!!!!!!!!

This is an old version, shouldn't be used anymore.

Can be removed when the whole renewal is done.

!!!!!!*************!!!!!!!!!!


*/
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
//import getMuiTheme from '@material-ui/core/styles/getMuiTheme';
import AppBar from '@material-ui/core/AppBar';
import Head from 'next/head';
import Navigation from './Navigation.js';


const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });
  //{userAgent: 'all'};

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        menuOpen: false
    };
  }

    handleToggle() {
        this.setState({menuOpen: true});
    }



  render() {
    return (

      <ThemeProvider theme={theme}>
        <div>            
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://use.fontawesome.com/4a9aa864c0.js"></script>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
            </Head>
           <style jsx global>{`
                body {
                    margin: 0;
                    font-family: 'Roboto', sans-serif;

                }
                a {
                    text-decoration: none;
                }
                header {
                    background-color: #f7786b; 
                    //#92a8d1;
                    height: 350px;
                    widht: 100%;
                    display: flex;
                    justify-content: center;
                }
                .headerTitles {
                    align-self: flex-end;
                    color: white;
                    font-family: 'Open Sans';
                    text-align: center;
                    margin-bottom: 100px;
                }

                .headerTitles h1 {
                    font-size: 3.5em;
                    font-weight: 300;
                    margin-bottom: 0px;
                }

                .headerTitles h2 {
                    margin-top: 0px;
                }

                .headerTitles h1 span {
                    font-size: 1.5em;
                }

                .appBarLink {
                    text-decoration: none;
                    color: white;
                }
                h3 {
                    font-weight: normal;
                }
                .container {
                    margin: 40px auto;
                    max-width: 900px;
                   
                }
                @media (max-width: 600px) {
                    .headerTitles h1 {
                        font-size: 1.5em;
                        font-weight: 300;
                        margin-bottom: 0px;
                    }
    
                    .headerTitles h2 {
                        margin-top: 0px;
                    }
                }
            `}</style>
            <Navigation />
            <header>
            
                <div className="headerTitles">
                    <h1><span className="bigLetter">S</span>PORT<span className="bigLetter">C</span>ALCULATORS</h1>
                    <h2>The best collection of sports related calculators</h2>
                </div>
            </header>
            
            <div className='container'>
                {this.props.children}
            </div>
        </div>
      </ThemeProvider>

    );
  }
}