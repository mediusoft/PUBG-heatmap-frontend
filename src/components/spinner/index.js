import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

export const Spinner = ({ title, disableShrink }) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <CircularProgress disableShrink={disableShrink} color="secondary" />
      <Typography> {title}</Typography>
    </Grid>
  );
};
