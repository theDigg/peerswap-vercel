import Head from "next/head";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "../next-seo.config";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import store, { persistor } from "app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MiniDrawer from "components/MiniDrawer";
import darkTheme from "style/themes/dark";

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
      <DefaultSeo {...defaultSEOConfig} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={darkTheme}>
            <SnackbarProvider maxSnack={3}>
              <LocalizationProvider dateAdapter={DateFnsAdapter}>
                <CssBaseline />
                <Box sx={{ display: "flex" }}>
                  <MiniDrawer />
                  <Component {...pageProps} />
                </Box>
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
