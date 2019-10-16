import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = type =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#063980"
      },
      secondary: {
        main: "#f66a0f"
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
