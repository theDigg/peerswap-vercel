import { createTheme } from "@mui/material/styles";
import { red, blue, deepOrange } from "@mui/material/colors";

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#eeeeee",
      paper: "#f0f0f0",
    },
  },
});

export default lightTheme;
