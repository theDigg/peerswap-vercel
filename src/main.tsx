// import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./app/App";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import "fontsource-roboto";

export default function NextIndexWrapper() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </Provider>
  );
}
