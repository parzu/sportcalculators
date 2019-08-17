/****
 * Layout for all the pages.
 * Creates navigation drawer and the appbar on top.
 * 
 * 
 */

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import InformationOutline from 'mdi-material-ui/InformationOutline';
import EmailOutline from 'mdi-material-ui/EmailOutline';
import ShieldKeyOutline from 'mdi-material-ui/ShieldKeyOutline'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { calculators } from '../src/calculators.js';

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
  nested: {
    paddingLeft: theme.spacing(2),
  },
  menuHeader: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

function Layout(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function ListItemLink(props) {
    return (
        <ListItem button component="a" href={props.href} >
            <Typography className={classes.nested} variant="Subtitle1" noWrap>
                {props.linkText}
            </Typography>
        </ListItem>
    );
  }

  function ListItemHeader(props) {
      return (
      <ListItem>
        <ListItemText 
          primary={props.title}
          classes={{
            primary: classes.menuHeader
          }}
        />
        {/* <Typography variant="subtitle2" noWrap>
            {props.title}
        </Typography> */}
      </ListItem>
      );
  }
/*Navigation contents so that they could be reused*/
  const calcList = calculators.map((item) =>
    <List>
      <ListItemHeader title={item.sport} />
      {item.calculators.map((calc) =>
        <ListItemLink  href={calc.href} linkText={calc.title} />
      )}
    </List>
  );


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
        {calcList}
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
      <ListItem button component="a" href="about">
        <ListItemIcon>
          <InformationOutline />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button component="a" href="contact">
        <ListItemIcon>
        <EmailOutline />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
      <ListItem button component="a" href="privacy">
        <ListItemIcon>
        <ShieldKeyOutline />
        </ListItemIcon>
        <ListItemText primary="Privacy" />
      </ListItem>

    </List>

    </div>
   );

  return (
    <div className={classes.root}>
      <CssBaseline />
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
            SportCalculators
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="js">
          <Drawer
            container={container}
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
      
      <Container>
      <div className={classes.toolbar} />
          {props.children}
      </Container>
    </div>
  );
}


export default Layout;