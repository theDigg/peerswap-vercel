import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff3455",
    },
    secondary: {
      main: "#59fb",
    },
    error: {
      main: red.A400,
    },
  },
});

export default darkTheme;
