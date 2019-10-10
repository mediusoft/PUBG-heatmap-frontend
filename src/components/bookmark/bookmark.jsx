import React, { useContext } from "react";
import { IconButton, Icon } from "@material-ui/core";
import { Context } from "contexts/theme-context";
import { MessageType } from "enum";

export const Bookmark = ({ playerName, bookmarked, onClick }) => {
  const { notify } = useContext(Context);
  const message = bookmarked
    ? `${playerName} removed from favorites`
    : `${playerName} added to favorites`;
  return (
    <IconButton
      size="large"
      onClick={() => {
        notify({
          type: MessageType.Success,
          message
        });
        onClick();
      }}
      color={`${bookmarked && "secondary"}`}
    >
      <Icon fontSize="large">star</Icon>
    </IconButton>
  );
};
