import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as Theme from "contexts/theme-context";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { ThemeMode, MessageType } from "enum";
import Routes from "routes";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { Snackbar, Icon, IconButton, SnackbarContent } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import customTheme from "./theme";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  }
}));

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API}/graphql`
});

function App() {
  const classes = useStyles();
  const [themeType, setThemeType] = useState(localStorage.getItem("themeType") || ThemeMode.Dark);
  const [snack, setSnack] = React.useState({
    open: false,
    duration: 6000,
    message: "",
    type: MessageType.Success
  });

  // we change the palette type of the theme in state
  const toggleThemeType = () => {
    const type = themeType === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    setThemeType(type);
    localStorage.setItem("themeType", type);
  };

  // notification
  const notify = ({ duration, message, type }) => {
    const newSnack = {
      open: true,
      message
    };
    newSnack.duration = message || "";
    newSnack.duration = duration || 6000;
    newSnack.type = type || MessageType.Info;
    setSnack(newSnack);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const variantIcon = {
    success: "check",
    warning: "warning",
    error: "error",
    info: "info"
  };
  // we generate a MUI-theme from state's theme object
  const muiTheme = customTheme(themeType);
  return (
    <ApolloProvider client={client}>
      <Theme.Context.Provider
        value={{ toggleThemeType, notify, isDarkMode: themeType === ThemeMode.Dark }}
      >
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Routes toggleThemeType={toggleThemeType} />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={snack.open}
            autoHideDuration={snack.duration}
            onClose={handleClose}
          >
            <SnackbarContent
              className={classes[snack.type]}
              aria-describedby="client-snackbar"
              message={
                <span className={classes.message} id="client-snackbar">
                  <Icon className={`${classes.icon} ${classes.iconVariant}`}>
                    {variantIcon[snack.type]}
                  </Icon>
                  {snack.message}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  className={classes.close}
                  onClick={handleClose}
                >
                  <Icon className={classes.icon}>close</Icon>
                </IconButton>
              ]}
            />
          </Snackbar>
        </ThemeProvider>
      </Theme.Context.Provider>
    </ApolloProvider>
  );
}

export default App;
