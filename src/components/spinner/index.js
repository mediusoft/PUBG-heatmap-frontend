import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

export const Spinner = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <CircularProgress color="secondary" />
    </Grid>
  );
};
