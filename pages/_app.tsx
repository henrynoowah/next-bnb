import type { AppContext, AppInitialProps, AppProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import App from "next/app";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { GetStaticProps, NextPage, NextPageContext } from "next";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import user from "../lib/data/user";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const myAppInitialProps = App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    const { isLogged } = store.getState().user;
    console.log(!!cookieObject);
    console.log(!isLogged);
    try {
      console.log("hello");
      if (!isLogged && cookieObject) {
        console.log("if");
        axios.defaults.headers.common["Cookie"] = cookieObject.access_token;
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (e) {
      // console.log(e);
    }
    return { ...myAppInitialProps };
  }
);

// class MyApp extends App<AppInitialProps> {

//   public static getInitialProps = wrapper.getInitialAppProps(store => async context => {

//       store.dispatch({type: 'TOE', payload: 'was set in _app'});

//       return {
//           pageProps: {
//               // https://nextjs.org/docs/advanced-features/custom-app#caveats
//               ...(await App.getInitialProps(context)).pageProps,
//               // Some custom thing for all pages
//               pathname: ctx.pathname,
//           },
//       };

//   });

//   public render() {
//       const {Component, pageProps} = this.props;

//       return (
//           <Component {...pageProps} />
//       );
//   }
// }

// class app extends App<AppInitialProps> {
//   public static getInitialProps = wrapper.getInitialAppProps(
//     (store) => async (context) => {
//       const myAppInitialProps = await App.getInitialProps(context);
//       const cookieObject = cookieStringToObject(
//         context.ctx.req?.headers.cookie
//       );
//       const { isLogged } = store.getState().user;
//       console.log(cookieObject);
//       try {
//         if (!isLogged && cookieObject.access_token) {
//           axios.defaults.headers.common["Cookie"] = cookieObject.access_token;
//           const { data } = await meAPI();
//           store.dispatch(userActions.setLoggedUser(data));
//         }
//       } catch (e) {
//         // console.log(e);
//       }
//       return { ...myAppInitialProps };
//     }
//   );

//   public render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <>
//         <GlobalStyle />
//         <Header />
//         <Component {...pageProps} />
//         <div id="root-modal" />
//       </>
//     );
//   }
// }

export default wrapper.withRedux(app);
