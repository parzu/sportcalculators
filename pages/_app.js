import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from '../src/createEmotionCache';
import theme from "../src/theme";
//import CookieConsent from "react-cookie-consent";

//Create Emotion cache
const clientSideEmotionCache = createEmotionCache();

//class SportCalculators extends App {
// componentDidMount() {
//   // Remove the server-side injected CSS.
//   const jssStyles = document.querySelector("#jss-server-side");
//   if (jssStyles) {
//     jssStyles.parentNode.removeChild(jssStyles);
//   }
// }

const SportCalculators = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <div>
      <CacheProvider value={emotionCache}>
        <Head>
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <title>SportCalculators</title>
        </Head>
        {/* <CookieConsent
          location="bottom"
          buttonText="Got it!"
          cookieName="sportcalculators"
          style={{ alignItems: "center", zIndex: 10000, background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "18px" }}
          contentStyle={{ paddingRight: "20px" }}
          expires={180}
        >
          This website uses cookies to ensure you get the best experience on our website. By continuing to browse the site, you are agreeing to our use of cookies. {" "}
          <a style={{ color: "#00b0ff" }} href="/privacy-policy">
            More info here
          </a>
        </CookieConsent> */}


        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>

    </div>
  );
}

export default SportCalculators;
