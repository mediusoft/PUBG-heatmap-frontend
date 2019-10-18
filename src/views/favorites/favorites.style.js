import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: "calc(100vh - 64px)",
    borderRadius: "0px",
    marginTop: theme.spacing(2)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));
