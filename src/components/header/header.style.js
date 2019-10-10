import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    header: {
      boxShadow: "0 0 18px 0 rgba(0, 0, 0, .12)",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
      fontSize: "16px",
      lineHeight: "27px",
      transition: "background .3s",
      height: "82px",
      display: "flex",
      padding: "0 35px"
    }
  };
});
