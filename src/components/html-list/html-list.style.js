import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    footerList: {
      "& ul": {
        margin: 0,
        padding: 0,
        listStyle: "none",
        "& li": {
          padding: "5px 0",
          fontSize: "16px",
          position: "relative",
          "& a": {
            color: "#C0C0C0",
            cursor: "pointer",
            fontWeight: "100"
          },
          "& span": {
            position: "relative",
            fontSize: "15px",
            top: "1px",
            left: "-3px"
          }
        }
      }
    },
    header: {
      fontSize: "17px",
      marginBottom: "10px",
      color: theme.palette.common.white,
      "& span": {
        position: "relative",
        top: "3px",
        fontSize: "19px"
      }
    }
  };
});
