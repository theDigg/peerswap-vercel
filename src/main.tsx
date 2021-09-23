import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./app/store";
import "./index.css";
import "fontsource-roboto";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
