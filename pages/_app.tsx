import type { AppContext, AppProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import App from "next/app";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

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
    try {
      if (!isLogged && cookieObject) {
        axios.defaults.headers.common["Cookie"] = cookieObject.access_token;
        // console.log(axios.defaults.headers.common);
        const { data } = await meAPI();
        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (e) {
      // console.log(e);
    }
    return { ...myAppInitialProps };
  }
);

export default wrapper.withRedux(app);
