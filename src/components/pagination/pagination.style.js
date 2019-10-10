import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  return {
    container: {
      marginBottom: "60px !important",
      marginTop: "30px !important"
    },
    pagination: {
      margin: 0,
      textAlign: "center",
      "& ul": {
        margin: 0,
        padding: 0,
        "& li": {
          display: "inline-block",
          margin: 0,
          padding: 0,
          "& button": {
            borderRadius: "4px",
            width: "44px",
            height: "44px",
            padding: 0,
            borderBottom: "none",
            display: "inline-block",
            color: "#333",
            background: "transparent",
            fontWeight: 700,
            margin: 0,
            transition: "all 200ms ease-in-out",
            float: "left",
            textDecoration: "none",
            "&:hover": {
              background: "#333",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,.2)"
            }
          }
        }
      }
    },
    current: {
      background: `${theme.palette.primary.main} !important`,
      color: "#fff !important"
    },
    paginationArrow: {
      background: "#f0f0f0",
      "& a": {
        display: "flex !important",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  };
});
