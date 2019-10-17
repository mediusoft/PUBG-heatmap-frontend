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
      direction="column"
      spacing={1}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Grid item>
        <CircularProgress disableShrink={disableShrink} color="secondary" />
      </Grid>

      <Grid item>
        <Typography> {title}</Typography>
      </Grid>
    </Grid>
  );
};
