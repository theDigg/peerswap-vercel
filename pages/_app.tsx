import "../src/index.css";
import Head from "next/head";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Peerswap</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </>
  );
}
