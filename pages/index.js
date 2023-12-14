/** @jsxImportSource @emotion/react */
import React from "react";
import Head from "next/head";
import { Grid, Typography, Card, CardActionArea, CardHeader, Container } from "@mui/material";
import Layout from "../components/Layout.js";
import { calculators } from "../src/calculators.js";
import AdSenseWidget from "../components/AdSenseWidget.js";

function CalculatorCard({ calc, icon }) {
  return (
    <Grid item xs={6} md={4} sx={{ padding: '8px' }}>
      <Card sx={{ color: 'primary.main' }}>
        <CardActionArea href={calc.href}>
          <CardHeader
            titleTypographyProps={{ variant: "caption", sx: { fontSize: { xs: '0.7rem', sm: '0.8rem', lg: '1rem'} } }}
            avatar={icon}
            title={calc.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
}

function SportCards({ item }) {
  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ padding: '8px' }}>{item.sport}</Typography>
      </Grid>
      {item.calculators.map((calc, index) => (
        <CalculatorCard key={index} calc={calc} icon={item.icon} />
      ))}
    </Grid>
  );
}

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>SportCalculators</title>
        <meta name="description" content="Mobile-Friendly collection of sports related calculators. Calculators for bowling, cycling, running, decathlon, heptathlon and many more." />
      </Head>
      <Container sx={{ flexGrow: 1, color: 'primary.main', textAlign: 'center', padding: '16px', paddingTop: '100px', paddingBottom: '100px' }}>
        <Typography variant="h1" component="h1" sx={{ fontWeight: 300, letterSpacing: { xs: '.3rem', sm: '.7rem'}, fontSize: { xs: '1.125rem', sm: '2rem', lg: '4rem' }, paddingBottom: '20px' }}>
          SPORTCALCULATORS
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'medium', fontSize: { xs: '1.125rem', sm: '2rem', lg: '4rem' } }}>
          The best online collection of sports related calculators
        </Typography>
      </Container>
      <AdSenseWidget />
      {calculators.map((item, index) => (
        <SportCards key={index} item={item} />
      ))}
      <AdSenseWidget />
    </Layout>
  );
}





// /** @jsxImportSource @emotion/react */
// import React from "react";
// import Head from "next/head";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Card from "@mui/material/Card";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardHeader from "@mui/material/CardHeader";
// import { css, useTheme } from '@emotion/react';
// import Layout from "../components/Layout.js";
// import { calculators } from "../src/calculators.js";
// import AdSenseWidget from "../components/AdSenseWidget.js";
// import theme from "../src/theme";






// const styles = {
//   root: css`
//     flex-grow: 1;
//   `,
//   hero: css`
//     padding: ${theme.spacing(2)};
//     padding-top: 100px;
//     padding-bottom: 100px;
//     text-align: center;
//     color: ${theme.palette.primary.main};
//   `,
//   headline: css`
//     font-weight: ${theme.typography.fontWeightLight};
//     letter-spacing: .3rem;
//     font-size: ${theme.typography.pxToRem(18)};
    
//     ${theme.breakpoints.up("sm")} {
//       font-size: ${theme.typography.pxToRem(32)};
//       letter-spacing: .7rem;
//     }
    
//     ${theme.breakpoints.up("lg")} {
//       font-size: ${theme.typography.pxToRem(64)};
//     }
    
//     padding-bottom: 20px;
//   `,
//   subheader: css`
//     font-weight: ${theme.typography.fontWeightMedium};
//     font-size: ${theme.typography.pxToRem(18)};
    
//     ${theme.breakpoints.up("sm")} {
//       font-size: ${theme.typography.pxToRem(32)};
//     }
    
//     ${theme.breakpoints.up("lg")} {
//       font-size: ${theme.typography.pxToRem(64)};
//     }
//   `,
//   cardgrid: css`
//     flex-basis: 100%;
//     width: 100%;
//     padding: ${theme.spacing(1)};
//   `,
//   card: css`
//     font-size: ${theme.typography.pxToRem(9)};
    
//     ${theme.breakpoints.up("sm")} {
//       font-size: ${theme.typography.pxToRem(12)};
//     }
    
//     ${theme.breakpoints.up("lg")} {
//       font-size: ${theme.typography.pxToRem(16)};
//     }
    
//     color: ${theme.palette.primary.main};
//   `,
// };


// function CalculatorCard(props) {
//   const theme = useTheme();
//   return (
//     <Grid item xs={6} md={4} css={styles.cardgrid}>
//       <Card css={styles.card}>
//         <CardActionArea href={props.calc.href}>
//           <CardHeader
//             titleTypographyProps={{
//               variant: "caption",
//               classes: {
//                 caption: styles.card,
//               },
//             }}
//             avatar={props.icon}
//             title={props.calc.title}
//           />
//         </CardActionArea>
//       </Card>
//     </Grid>
//   );
// }

// function SportCards(props){ 
//   const theme = useTheme();
//   return (
//     <Grid container direction="row" justifyContent="flex-start" alignItems="center">
//       <Grid item xs={12} css={styles.cardgrid}>
//         <Typography variant="h6">{props.item.sport}</Typography>
//       </Grid>
//       {props.item.calculators.map((calc, index) => (
//         <CalculatorCard key={index} calc={calc} icon={props.item.icon} />
//       ))}
//     </Grid>
//   );
// }

// export default function Index() {
//   const theme = useTheme();
//   return (
//     <Layout css={styles.root}>
//       <Head>
//         <title>SportCalculators</title>
//         <meta
//           name="description"
//           content="Mobile-Friendly collection of sports related calculators. Calculators for bowling, cycling, running, decathlon, heptathlon and many more."
//         ></meta>
//       </Head>
//       <Grid container direction="row" justifyContent="center" alignItems="center">
//         <Grid item xs={12} css={styles.hero}>
//           <Typography css={styles.headline} variant="h1" component="h1">
//             SPORTCALCULATORS
//           </Typography>
//           <Typography variant="h6" css={styles.subheader}>
//             The best online collection of sports related calculators
//           </Typography>
//         </Grid>
//       </Grid>
//       <AdSenseWidget />
//       {calculators.map((item, index) => (
//         <SportCards key={index} item={item} />
//       ))}
//       <AdSenseWidget />
//     </Layout>
//   );
// }






















// const root = css`
//   flex-grow: 1;
//   color: red;
// `;

// const herostyles = css`
//   paddingTop: 100px;
//   paddingBottom: 100px;
//   padding: theme.spacing(2);
//   textAlign: center;
//   color: red;
// `;
// // color: theme.palette.primary.main,
// const headline = css`
//   fontWeight: theme.typography.fontWeightLight;
//   letterSpacing: ".3rem";
//   fontSize: theme.typography.pxToRem(18);
//   paddingBottom: "20px";
// `;

// const subheader = css`
//   fontWeight: theme.typography.fontWeightMedium;
//   fontSize: theme.typography.pxToRem(18);
// `;


// const HeroContainer = styled(Grid)`
//   padding-top: 100px;
//   padding-bottom: 100px;
//   padding: ${({ theme }) => theme.spacing(2)};
//   text-align: center;
//   color: ${({ theme }) => theme.palette.primary.main};
// `;


// const Headline = styled(Typography)`
//   font-weight: light;
//   letter-spacing: .3rem;
//   font-size: 18px;
  
//   @media (min-width: 600px) {
//     font-size: 32px;
//     letter-spacing: .7rem;
//   }
  
//   @media (min-width: 1280px) {
//     font-size: 64px;
//   }
  
//   padding-bottom: 20px;
// `;

// const Subheader = styled(Typography)`
//   font-weight: medium;
//   font-size: 18px;
  
//   @media (min-width: 600px) {
//     font-size: 32px;
//   }
  
//   @media (min-width: 1280px) {
//     font-size: 64px;
//   }
// `;

// const CardGrid = styled(Grid)`
//   flex-basis: 100%;
//   width: 100%;
//   padding: 20px;
// `;

// const CardWrapper = styled(Card)`
//   font-size: 9px;
  
//   @media (min-width: 600px) {
//     font-size: 12px;
//   }
  
//   @media (min-width: 1280px) {
//     font-size: 16px;
//   }
  
//   color: ${({ theme }) => theme.palette.primary.main};
// `;

// const SportCardsContainer = styled(Grid)`
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SportTitle = styled(Typography)`
//   font-weight: medium;
//   font-size: 18px;

//   @media (min-width: 600px) {
//     font-size: 32px;
//   }

//   @media (min-width: 1280px) {
//     font-size: 64px;
//   }
// `;

// function CalculatorCard(props) {
//   return (
//     <CardGrid item xs={6} md={4}>
//       <CardWrapper className={CardWrapper}>
//         <CardActionArea href={props.calc.href}>
//           <CardHeader
//             titleTypographyProps={{
//               variant: "caption",
//               classes: {
//                 caption: CardWrapper,
//               },
//             }}
//             avatar={props.icon}
//             title={props.calc.title}
//           />
//         </CardActionArea>
//       </CardWrapper>
//     </CardGrid>
//   );
// }

// function SportCards(props) {
//   return (
//     <SportCardsContainer container direction="row" justifyContent="flex-start" alignItems="center">
//       <CardGrid item xs={12}>
//         <SportTitle variant="h6">{props.item.sport}</SportTitle>
//       </CardGrid>
//       {props.item.calculators.map((calc, index) => (
//         <CalculatorCard key={index} calc={calc} icon={props.item.icon} />
//       ))}
//     </SportCardsContainer>
//   );
// }

// function SportCards(props) {
//   const classes = useStyles();
//   return (
//     <Grid container direction="row" justifyContent="flex-start" alignItems="center">
//       <Grid item xs={12} className={classes.cardgrid}>
//         <Typography variant="h6">{props.item.sport}</Typography>
//       </Grid>
//       {props.item.calculators.map((calc, index) => (
//         <CalculatorCard key={index} calc={calc} icon={props.item.icon} />
//       ))}
//     </Grid>
//   );
// }

// export default function Index() {

//   return (
//     //className={classes.root}>
//     <Layout css={root}>
//       <Head>
//         <title>SportCalculators</title>
//         <meta
//           name="description"
//           content="Mobile-Friendly collection of sports related calculators. Calculators for bowling, cycling, running, decathlon, heptathlon and many more."
//         ></meta>
//       </Head>
//       <HeroContainer container direction="row" justifyContent="center" alignItems="center">
//         <Grid item xs={12}>
//           <Headline variant="h1" component="h1">
//             SPORTCALCULATORS
//           </Headline>
//           <Subheader variant="h6" >
//             The best online collection of sports related calculators
//           </Subheader>
//         </Grid>
//       </HeroContainer>
//       <AdSenseWidget />
//       {calculators.map((item, index) => (
//         <SportCards key={index} item={item} />
//       ))}
//       <AdSenseWidget />
//     </Layout>

    // <Layout>
    //   <Head>
    //     <title>SportCalculators</title>
    //     <meta
    //       name="description"
    //       content="Mobile-Friendly collection of sports related calculators. Calculators for bowling, cycling, running, decathlon, heptathlon and many more."
    //     ></meta>
    //   </Head>
    //   <Hero container direction="row" justifyContent="center" alignItems="center">
    //     <CardGrid item xs={12} className={CardGrid}>
    //       <Headline variant="h1" component="h1">
    //         SPORTCALCULATORS
    //       </Headline>
    //       <Subheader variant="h6" className={Subheader}>
    //         The best online collection of sports related calculators
    //       </Subheader>
    //     </CardGrid>
    //   </Hero>
    //   <AdSenseWidget />
    //   {calculators.map((item, index) => (
    //     <SportCards key={index} item={item} />
    //   ))}
    //   <AdSenseWidget />
    // </Layout>
//  );
//}




















// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   hero: {
//     paddingTop: "100px",
//     paddingBottom: "100px",
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.primary.main,
//   },
//   headline: {
//     fontWeight: theme.typography.fontWeightLight,
//     letterSpacing: ".3rem",
//     fontSize: theme.typography.pxToRem(18),
//     [theme.breakpoints.up("sm")]: {
//       fontSize: theme.typography.pxToRem(32),
//       letterSpacing: ".7rem",
//     },
//     [theme.breakpoints.up("lg")]: {
//       fontSize: theme.typography.pxToRem(64),
//     },
//     paddingBottom: "20px",
//   },
//   subheader: {
//     fontWeight: theme.typography.fontWeightMedium,
//     fontSize: theme.typography.pxToRem(18),
//     [theme.breakpoints.up("sm")]: {
//       fontSize: theme.typography.pxToRem(32),
//     },
//     [theme.breakpoints.up("lg")]: {
//       fontSize: theme.typography.pxToRem(64),
//     },
//   },
//   cardgrid: {
//     flexBasis: "100%",
//     width: "100%",
//     padding: theme.spacing(1),
//   },
//   card: {
//     fontSize: theme.typography.pxToRem(9),
//     [theme.breakpoints.up("sm")]: {
//       fontSize: theme.typography.pxToRem(12),
//     },
//     [theme.breakpoints.up("lg")]: {
//       fontSize: theme.typography.pxToRem(16),
//     },
//     color: theme.palette.primary.main,
//   },
// }));


