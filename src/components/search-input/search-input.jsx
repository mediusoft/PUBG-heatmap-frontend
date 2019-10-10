import React from "react";
import { Icon } from "@material-ui/core";
import { useStyles } from "./search-input.style";

export const SearchInput = props => {
  const {
    type,
    icon = "my_location",
    placeholder,
    onClick,
    onChange,
    value,
    align,
    buttonText
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <input
        type="text"
        value={value && value}
        onChange={onChange}
        className={`${classes.input} ${align === "right" ? classes.alignRight : classes.alignLeft}`}
        placeholder={placeholder}
      />
      {type === "icon" ? (
        <Icon className={classes.icon}> {icon} </Icon>
      ) : (
        <button onClick={onClick} type="submit">
          {buttonText || "Search"}
        </button>
      )}
    </div>
  );
};
