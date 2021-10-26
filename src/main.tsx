import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { BrowserRouter as Router } from "react-router-dom";
import App from "app/App";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import store, { persistor } from "app/store";

export default function NextIndexWrapper() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
