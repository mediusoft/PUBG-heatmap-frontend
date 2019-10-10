import React from "react";
import { Link, Icon } from "@material-ui/core";
import { useStyles } from "./html-list.style";

export const HtmlList = ({ style, className, header, data, icon, headerIcon }) => {
  const classes = useStyles();
  return (
    <div className={`${className} ${classes.footerList}`} style={{ ...style }}>
      {header && (
        <div className={classes.header}>
          {headerIcon && <Icon>{headerIcon}</Icon>} {header}
        </div>
      )}
      <ul>
        {data &&
          data.map(link => (
            <li key={link.label}>
              {icon && <Icon>{icon}</Icon>}
              <Link underline="none" href={link.link}>
                {link.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
