import '../src/index.css'
import Head from 'next/head'
import { Provider } from "react-redux";
import store from "../src/app/store";

export default function MyApp({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Peerswap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
