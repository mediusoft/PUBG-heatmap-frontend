import React from "react";
import { Link, Icon } from "@material-ui/core";
import { useStyles } from "./category.style";

export const Category = ({ icon, counter, title, content, style }) => {
  const classes = useStyles();
  return (
    <Link
      underline="none"
      className={classes.link}
      style={{ ...style }}
      href="https://material-ui.com/"
    >
      <div className={classes.iconBox}>
        <Icon className={classes.icon}>{icon}</Icon>
      </div>
      <div className={classes.counter}>{counter}</div>
      <div className={classes.content}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </Link>
  );
};
