import React from "react";
import { Link } from "@material-ui/core/";
import Icon from "@material-ui/core/Icon";
import { useStyles } from "./arrowButton.style";

export const ArrowButton = ({ style, text, href, type, icon = "remove_red_eye" }) => {
  const classes = useStyles();

  return (
    <Link
      style={{ ...style }}
      underline="none"
      className={`${classes.link} ${type === "icon" ? classes.slidingIcon : classes.color}`}
      href={href}
    >
      {text}
      {type === "icon" && <Icon className={classes.icon}> {icon} </Icon>}
    </Link>
  );
};
