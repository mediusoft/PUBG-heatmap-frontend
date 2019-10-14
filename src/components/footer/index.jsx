import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

export const Footer = () => {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright ©
        <Link color="inherit" href="https://material-ui.com/">
          Pubgheatmap
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
