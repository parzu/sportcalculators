import React, { useState } from "react";
import {
  AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem,
  ListItemIcon, ListItemText, Toolbar, Typography, Link, Container, Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InformationOutline from "mdi-material-ui/InformationOutline";
import EmailOutline from "mdi-material-ui/EmailOutline";
import ShieldKeyOutline from "mdi-material-ui/ShieldKeyOutline";
import { calculators } from "../src/calculators.js";

const drawerWidth = 240;

function Layout(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const ListItemLink = ({ href, linkText }) => (
    <ListItem button component="a" href={href}>
      <Typography variant="subtitle1" noWrap sx={{ paddingLeft: '16px' }}>
        {linkText}
      </Typography>
    </ListItem>
  );

  const ListItemHeader = ({ title }) => (
    <ListItem>
      <ListItemText primary={title} primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
    </ListItem>
  );

  const calcList = calculators.map((item, index) => (
    <List key={index}>
      <ListItemHeader title={item.sport} />
      {item.calculators.map((calc, index) => (
        <ListItemLink key={index} href={calc.href} linkText={calc.title} />
      ))}
    </List>
  ));

  const drawerContent = (
    <div>
      <Toolbar sx={{paddingLeft: {xs: "0px"} }}>
      
      <Typography sx={{ margin: '0px', paddingLeft: '15px', textAlign: "left", fontSize: "1em", fontWeight: "bold" }}>
        MENU
      </Typography>
      </Toolbar>
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
         <ListItem button component="a" href="privacy-policy">
           <ListItemIcon>
             <ShieldKeyOutline />
           </ListItemIcon>
           <ListItemText primary="Privacy" />
         </ListItem>
             </List>
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{padding: '12px', marginRight: '16px', display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" variant="h6" noWrap sx={{ color: 'white', textDecoration: 'none' }}>
            SportCalculators
          </Link>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          container={props.container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      
      <Container sx={{ flexGrow: 1 }}>
        {/* Content goes here */}
        <Toolbar />
        {props.children}
        <Toolbar />
      </Container>
    </div>
  );
}

export default Layout;


















// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import Hidden from "@mui/material/Hidden";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import InformationOutline from "mdi-material-ui/InformationOutline";
// import EmailOutline from "mdi-material-ui/EmailOutline";
// import ShieldKeyOutline from "mdi-material-ui/ShieldKeyOutline";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import { calculators } from "../src/calculators.js";
// import theme from "../src/theme";
// import { Weight } from "mdi-material-ui";


// const drawerWidth = 240;

// // const Root = styled(div)`
// //   display: flex
// // `;

// const DrawerContainer = styled(Container)(({theme}) => ({
//   [theme.breakpoints.up('md')]: {
//     width: `${drawerWidth}px`,
//     flexShrink: 0
//   }
// }));


// const AppBarStyled = styled(AppBar)`
//   margin-left: ${drawerWidth};
//   @media (min-width: 900px) {
//     width: calc(100% - ${drawerWidth}px);
//   }
// `;

// const ToolbarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

// const ContentContainer = styled(Container)(({theme}) => ({
//   flexGrow: 1,
//   padding: '20px',
//   [theme.breakpoints.up('md')]: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//   }
// }));

// const NestedTypography = styled(Typography)`
//   padding-left: 20px;
// `;

// // const MenuHeader = styled.div`
// //   font-weight: bold;
// // `;

// const HomeLink = styled(Link)`
//   align-items: center;
//   font-weight: bold;
//   color: white;
//   text-decoration: none;
//   padding-left: 12px;
// `;

// // const List = styled.ul`
// //   margin: 0;
// // `;

// // const ListItem = styled.li`
// //   margin: 0;
// //   padding: 0;
// // `;

// function Layout(props) {
//   const { container } = props;
//   //const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   function handleDrawerToggle() {
//     setMobileOpen(!mobileOpen);
//   }

//   function ListItemLink(props) {
//     return (
//       <ListItem button component="a" href={props.href}>
//         <NestedTypography variant="subtitle1" noWrap>
//           {props.linkText}
//         </NestedTypography>
//       </ListItem>
//     );
//   }

//     function ListItemHeader(props) {
//     return (
//       <ListItem>
//         <ListItemText
//           primary={props.title}
//           css={{ color: 'red', fontWeight: 'bold'}}
//         />
//       </ListItem>
//     );
//   }

//   const calcList = calculators.map((item, index) => (
//     <List key={index}>
//       <ListItemHeader title={item.sport} />
//       {item.calculators.map((calc, index) => (
//         <ListItemLink key={index} href={calc.href} linkText={calc.title} />
//       ))}
//     </List>
//   ));

//   const drawer = (
//     <div>
//       <Toolbar />
//         <h6
//           sx={{
//             margin: '0px',
//             paddingTop: '20px',
//             paddingLeft: '15px',
//             textAlign: "left",
//             fontSize: "1em",
//           }}
//         >
//           MENU
//         </h6>
//       <Divider />
//       {calcList}
//       <Divider />
//       <List component="nav" aria-label="main mailbox folders">
//         <ListItem button component="a" href="about">
//           <ListItemIcon>
//             <InformationOutline />
//           </ListItemIcon>
//           <ListItemText primary="About" />
//         </ListItem>
//         <ListItem button component="a" href="contact">
//           <ListItemIcon>
//             <EmailOutline />
//           </ListItemIcon>
//           <ListItemText primary="Contact" />
//         </ListItem>
//         <ListItem button component="a" href="privacy-policy">
//           <ListItemIcon>
//             <ShieldKeyOutline />
//           </ListItemIcon>
//           <ListItemText primary="Privacy" />
//         </ListItem>
//       </List>
//     </div>
//   );

  

//   return (
//     <div css={{display: 'flex'}}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           ml: { md: `${drawerWidth}px` },
//         }}
//       >
//         <ToolbarOffset
//         sx={{ 
//           position: 'relative',
//           alignItems: 'center',
          

          
//         }}
//         >
//         <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ 
//               marginRight: '12px',
//               marginLeft: '12px',
//               display: { md: 'none' } 
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <HomeLink href="/" variant="h6" noWrap>
//             SportCalculators
//           </HomeLink>
//         </ToolbarOffset>
//       </AppBar>
//       <DrawerContainer aria-label="mailbox folders">
//       <Box
//         component="nav"
//         sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       </DrawerContainer>
//       <ContentContainer>
//         <ToolbarOffset /> 
//         {props.children}
//         <ToolbarOffset /> 
//       </ContentContainer>
//     </div>
//   );
// }

// export default Layout;





//Old version below


// /****
//  * Layout for all the pages.
//  * Creates navigation drawer and the appbar on top.
//  *
//  *
//  */

// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import Hidden from "@mui/material/Hidden";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import InformationOutline from "mdi-material-ui/InformationOutline";
// import EmailOutline from "mdi-material-ui/EmailOutline";
// import ShieldKeyOutline from "mdi-material-ui/ShieldKeyOutline";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Container from "@mui/material/Container";
// import { useTheme } from "@mui/material/styles";
// import makeStyles from '@mui/styles/makeStyles';
// import { calculators } from "../src/calculators.js";
// import { indigo } from "@mui/material/colors";

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   drawer: {
//     [theme.breakpoints.up("md")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     marginLeft: drawerWidth,
//     [theme.breakpoints.up("md")]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("md")]: {
//       display: "none",
//     },
//   },
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   nested: {
//     paddingLeft: theme.spacing(2),
//   },
//   menuHeader: {
//     fontWeight: theme.typography.fontWeightBold,
//   },
//   homeLink: {
//     color: "white",
//     textDecoration: "none",
//   },
//   List: {
    
//     margin: "0px",
//   },
//   ListItem: {
//     margin: "0px",
//     padding: "0px",
//   }
// }));

// function Layout(props) {
//   const { container } = props;
//   const classes = useStyles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   function handleDrawerToggle() {
//     setMobileOpen(!mobileOpen);
//   }

//   function ListItemLink(props) {
//     return (
//       <ListItem button component="a" href={props.href}>
//         <Typography className={classes.nested} variant="subtitle1" noWrap>
//           {props.linkText}
//         </Typography>
//       </ListItem>
//     );
//   }

//   function ListItemHeader(props) {
//     return (
//       <ListItem>
//         <ListItemText
//           primary={props.title}
//           classes={{
//             primary: classes.menuHeader,
//           }}
//         />
//         {/* <Typography variant="subtitle2" noWrap>
//             {props.title}
//         </Typography> */}
//       </ListItem>
//     );
//   }
//   /*Navigation contents so that they could be reused*/
//   const calcList = calculators.map((item, index) => (
//     <List key={index}>
//       <ListItemHeader title={item.sport} />
//       {item.calculators.map((calc, index) => (
//         <ListItemLink key={index} href={calc.href} linkText={calc.title} />
//       ))}
//     </List>
//   ));

//   const drawer = (
//     <div>
//       <div className={classes.toolbar}>
//         {/* <Link href="/" variant="h6" color="textSecondary" className={classes.homeLink}>
//           SportCalculators
//         </Link> */}
//         <h6
//           style={{
//             margin: "0px",
//             paddingTop: "20px",
//             paddingLeft: "15px",
//             textAlign: "left",
//             fontSize: "1em",
//           }}
//         >
//           MENU
//         </h6>
//       </div>
//       <Divider />
//       {calcList}
//       <Divider />
//       <List component="nav" aria-label="main mailbox folders">
//         <ListItem button component="a" href="about">
//           <ListItemIcon>
//             <InformationOutline />
//           </ListItemIcon>
//           <ListItemText primary="About" />
//         </ListItem>
//         <ListItem button component="a" href="contact">
//           <ListItemIcon>
//             <EmailOutline />
//           </ListItemIcon>
//           <ListItemText primary="Contact" />
//         </ListItem>
//         <ListItem button component="a" href="privacy-policy">
//           <ListItemIcon>
//             <ShieldKeyOutline />
//           </ListItemIcon>
//           <ListItemText primary="Privacy" />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//             size="large">
//             <MenuIcon />
//           </IconButton>
//           <Link href="/" variant="h6" noWrap className={classes.homeLink}>
//             SportCalculators
//           </Link>
//         </Toolbar>
//       </AppBar>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Hidden mdUp implementation="js">
//           <Drawer
//             container={container}
//             variant="temporary"
//             anchor={theme.direction === "rtl" ? "right" : "left"}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//         <Hidden mdDown implementation="js">
//           <Drawer
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             variant="permanent"
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//       </nav>

//       <Container>
//         <div className={classes.toolbar} />
//         {props.children}
//         <div className={classes.toolbar} />
//       </Container>
//     </div>
//   );
// }

// export default Layout;
