import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const AboutIcon = ({ isDarkMode, ...props }) => {
  return (
    <SvgIcon {...props}>
      <path fill="#ffffff" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </SvgIcon>
  );
};
