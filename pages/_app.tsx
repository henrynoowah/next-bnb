import type { AppContext, AppInitialProps, AppProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import App from "next/app";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { GetStaticProps, NextPage, NextPageContext } from "next";

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

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     try {
//       const { data } = await getTodosAPI();
//       store.dispatch(todosSliceActions.setTodo(data));
//       return { props: { todos: data } };
//     } catch (e) {
//       return { props: { todos: [] } };
//     }
//   }
// );

// public static getInitialProps = wrapper.getInitialAppProps(store => async context => {
//   // 1. Wait for all page actions to dispatch
//   const pageProps = {
//     // https://nextjs.org/docs/advanced-features/custom-app#caveats
//     ...(await App.getInitialProps(context)).pageProps,
//   };

// app.getInitialProps = wrapper.getInitialAppProps(
//   (store) => async (ctx) => {
//     const
//     // const myAppInitialProps = await ap
//     // const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
//     // return { ...myAppInitialProps };
//     console.log(ctx);
//     console.log(store);
//   }
// );

// app.getInitialProps = async (context: AppContext) => {
//   const myAppInitialProps = await App.getInitialProps(context);
//   const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
//   console.log(context.ctx);
//   return { ...myAppInitialProps };
// };

app.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const myAppInitialProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    const { isLogged } = store.getState().user;
    try {
      if (!isLogged && cookieObject.access_token) {
        // axios.defaults.headers.cookie = cookieObject.access_token;
      }
    } catch (e) {}
    return { ...myAppInitialProps };
  }
);

export default wrapper.withRedux(app);
