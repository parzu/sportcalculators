import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache';
import theme from "../src/theme";

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
         {/* Head code that is common for all pages goes here. */}
        <Head> 
         
           <meta charSet="utf-8" />

           {/* PWA primary color */}
           <meta name="theme-color" content={theme.palette.primary.main} />

           {/* Global site tag (gtag.js) - Google Analytics */}
           <script
             async
             src="https://www.googletagmanager.com/gtag/js?id=UA-45614829-1"
           ></script>
           <script
             dangerouslySetInnerHTML={{
               __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'UA-45614829-1');
         `,
             }}
           />

           <link
             rel="stylesheet"
             href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
           />

           <link rel="icon" href="/favicon.png"></link>

           <script
             data-ad-client="ca-pub-3093798853216759"
             async
             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
           ></script>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}



// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};



export default MyDocument;





// MyDocument.getInitialProps = async (ctx) => {
//   // ...

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [
//       <React.Fragment key="styles">
//         {initialProps.styles}
//       </React.Fragment>,
//     ],
//   };
// };


// import React from "react";
// import Document, { Head, Main, NextScript } from "next/document";
// import { ServerStyleSheets } from "@mui/styles";
// import theme from "../src/theme";

// class MyDocument extends Document {
//   // En muista lisänneeni alla olevaa. Voi olla että olen lisännyt joskus vuosia sitten. Publisher koodi ei ole minun.
//   // componentDidMount() {
//   //   (adsbygoogle = window.adsbygoogle || []).push({
//   //     google_ad_client: "ca-pub-9142841210062390",
//   //     enable_page_level_ads: true,
//   //   });
//   // }

//   render() {
//     return (
//       <html lang="en">
//         <Head>
//           <meta charSet="utf-8" />

//           {/* PWA primary color */}
//           <meta name="theme-color" content={theme.palette.primary.main} />

//           {/* Global site tag (gtag.js) - Google Analytics */}
//           <script
//             async
//             src="https://www.googletagmanager.com/gtag/js?id=UA-45614829-1"
//           ></script>
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'UA-45614829-1');
//         `,
//             }}
//           />

//           <link
//             rel="stylesheet"
//             href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
//           />

//           <link rel="icon" href="/favicon.png"></link>

//           <script
//             data-ad-client="ca-pub-3093798853216759"
//             async
//             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//           ></script>
          
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     );
//   }
// }

// MyDocument.getInitialProps = async (ctx) => {
//   // Resolution order
//   //
//   // On the server:
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. document.getInitialProps
//   // 4. app.render
//   // 5. page.render
//   // 6. document.render
//   //
//   // On the server with error:
//   // 1. document.getInitialProps
//   // 2. app.render
//   // 3. page.render
//   // 4. document.render
//   //
//   // On the client
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. app.render
//   // 4. page.render

//   // Render app and page and get the context of the page with collected side effects.
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [
//       <React.Fragment key="styles">
//         {initialProps.styles}
//         {sheets.getStyleElement()}
//       </React.Fragment>,
//     ],
//   };
// };

// export default MyDocument;
