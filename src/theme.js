import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = type =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#9046ff"
      },
      secondary: {
        main: "#e91916"
      },
      error: {
        main: red.A400
      },
      background: {
        default: "#fff"
      }
    }
  });

export default theme;
