import React from 'react'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "app/App";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import store from "app/store";

export default function NextIndexWrapper() {
  return (
    <Router>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </Provider>
    </Router>
  );
}
