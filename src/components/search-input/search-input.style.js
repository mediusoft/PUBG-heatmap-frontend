import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    container: {
      display: "flex",
      width: "100%",
      position: "relative",
      height: "55px",
      boxShadow: "0 2px 12px rgba(0,0,0,.09)",
      "& button": {
        height: "100%",
        lineHeight: "57px",
        padding: "0 30px",
        fontSize: "18px",
        background: theme.palette.primary.main,
        border: "none",
        color: theme.palette.common.white,
        cursour: "pointer"
      }
    },
    input: {
      height: "55px",
      lineHeight: "48px",
      padding: "0 20px",
      outline: "none",
      fontSize: "16px",
      color: theme.palette.common.grey,
      width: "100%",
      boxSizing: "border-box",
      display: "block",
      fontWeight: "500",
      border: "none"
    },
    alignRight: {
      order: 0
    },
    alignLeft: {
      order: 1
    },
    icon: {
      fontSize: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.common.white,
      background: theme.palette.primary.main,
      height: "100%",
      width: "65px"
    }
  };
});
