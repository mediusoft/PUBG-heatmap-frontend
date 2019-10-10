import React, { useRef, useState } from "react";
import { IconButton, Icon, InputAdornment, TextField } from "@material-ui/core";
import { useStyles } from "./copy-to-clipboard.style";

export const CopyToClipboard = ({ value = "", onCopied, style }) => {
  const classes = useStyles();

  const [newValue, setNewValue] = useState(value);
  const textAreaRef = useRef(null);

  const copyToClipboard = e => {
    textAreaRef.current.lastChild.children[1].select();
    document.execCommand("copy");
    e.target.focus();
    if (onCopied) {
      onCopied(true);
    }
  };

  const handleChange = () => event => {
    setNewValue(event.target.value);
  };

  return (
    <div className={classes.container} style={{ ...style }}>
      <TextField
        id="outlined-adornment"
        className={`${classes.margin}, ${classes.textField}`}
        variant="outlined"
        onChange={handleChange()}
        ref={textAreaRef}
        type="text"
        label="Copy Link"
        value={newValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton className={classes.icon} edge="end" onClick={copyToClipboard}>
                <Icon>file_copy</Icon>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};
