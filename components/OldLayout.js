/*

!!!!!!*************!!!!!!!!!!

This is an old version, shouldn't be used anymore.

Can be removed when the whole renewal is done.

!!!!!!*************!!!!!!!!!!

/*Top bar and left navigation for all pages*/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';

/*Component styles*/
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
      },
      drawer: {
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(2),
        
      },
  }));
  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }


/*Starts the created Navigation class which is exported
-->changed to function
class Navigation extends React.Component {
  constructor(props) { 
    super(props);
    this.state = { 
     };
  }
  */
  
function Layout(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    /*Navigation contents so that they could be reused*/
const drawer = (
    <div className={classes.list}>
    <List>
        <ListItem>
            <Typography variant="subtitle2" noWrap>
                Bowlig
            </Typography>
        </ListItem>
        <ListItemLink  href="/bowling-score-calculator">
            <Typography className={classes.nested} variant="caption" noWrap>
                Bowling Score Calculator
            </Typography>
        </ListItemLink>
    </List>
    </div>
);
/*
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





    <Divider />
    <List>
        <ListSubheader>Combined Events</ListSubheader>
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
        <ListSubheader>Cycling</ListSubheader>
        <Link href="/cycling-speed-calculator">
            <ListItem
                primaryText="Cycling Speed Calculator"
            />
        </Link>
    </List>
    <Divider />
    <List>
        <ListSubheader>Multisports</ListSubheader>
        <Link href="/triathlon-calculator">
            <ListItem
                primaryText="Triathlon Calculator"
            />
        </Link>
    </List>
    <Divider />
    <List>
        <ListSubheader>Running</ListSubheader>
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
    </div>
);*/

    return (
        <div className={classes.root}>
        
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        SportCalculator
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                </Hidden>
                <Hidden smDown implementation="js">
                <div className={classes.toolbar} />
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
                </Hidden>    
            </nav>
            <div className='container'>
                {container}
            </div>
        </div>
    );
};

    /*
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
                            //showMenuIconButton={false} 
                            //title={<a className="appBarLink" href="/">SportCalculators</a>}
                            //style={{ backgroundColor: '#034f84' }}
                            />
                        
                    </Drawer>
            </div>*/


export default Layout;











/*

const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (

      <ThemeProvider theme={theme}>
        <div>            
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
                <script src="https://use.fontawesome.com/4a9aa864c0.js"></script>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
                 
                
            <Navigation/>
            <div className='container'>
                {this.props.children}
            </div>
        </div>
      </ThemeProvider>

    );
  }
}


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
 */