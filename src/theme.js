import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = type =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#2f3545"
      },
      secondary: {
        main: "rgb(254, 195, 62)"
      },
      error: {
        main: red.A400
      }
    }
  });

export default theme;
