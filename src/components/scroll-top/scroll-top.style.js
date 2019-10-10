import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    container: {
      position: "fixed",
      bottom: theme.spacing(3),
      right: theme.spacing(3)
    }
  };
});
