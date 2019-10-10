import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    link: {
      flex: "0 0 25%",
      alignContent: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      padding: "25px",
      borderRadius: "4px",
      transition: ".35s",
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
      boxSizing: "border-box",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(42,65,232,.2)",
        backgroundColor: theme.palette.primary.main,
        color: "#fff !important",
        "& $counter": {
          background: "rgba(0,0,0,.2)",
          color: "#fff"
        },
        "& h3": {
          color: "#fff !important"
        },
        "& p": {
          color: "rgba(255,255,255,.7) !important"
        }
      }
    },
    iconBox: {
      justifyContent: "center",
      display: "flex"
    },
    icon: {
      textAlign: "center",
      height: "42px",
      display: "block",
      fontSize: "42px !important",
      marginBottom: "12px"
    },
    counter: {
      width: "auto",
      height: "24px",
      fontSize: "14px",
      lineHeight: "25px",
      borderRadius: "4px",
      padding: "0 8px",
      color: "#909090",
      background: "rgba(0,0,0,.06)",
      fontWeight: 600,
      display: "inline-block",
      margin: "0 auto",
      marginBottom: "18px"
    },
    content: {
      "& h3": {
        fontSize: "16px",
        fontWeight: 400,
        color: "#333",
        margin: 0,
        padding: 0,
        transition: ".35s"
      },
      "& p": {
        color: "#888",
        margin: 0,
        padding: 0,
        lineHeight: "24px",
        marginTop: "5px",
        transition: ".35s"
      }
    }
  };
});
