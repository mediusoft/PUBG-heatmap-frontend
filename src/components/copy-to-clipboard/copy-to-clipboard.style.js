import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    container: {
      display: "flex",
      width: "100%"
    },
    margin: {
      margin: theme.spacing(1)
    },
    textField: {
      width: "100%"
    },
    icon: {
      color: theme.palette.primary.main
    }
  };
});
