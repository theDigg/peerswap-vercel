import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";

// Create a theme instance.
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#202020",
      paper: "#111",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar()
      },
    },
  },
});

export default darkTheme;
