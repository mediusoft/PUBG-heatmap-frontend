import React from "react";
import moment from "moment";
import io from "socket.io-client";
import { Grid, SnackbarContent, Icon } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

class RateLimited extends React.Component {
  componentDidMount() {
    if (!this.socket) {
      console.log("Opening socket");
      this.socket = io(
        `${process.env.REACT_APP_API}?playerKey=${this.props.player.rateLimitPlayerKey}`
      );
      this.socket.on("message", m => {
        if (m === "LOADED") {
          this.props.onUnRateLimited();
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      console.log("Closing socket");
      this.socket.close();
      this.socket = null;
    }
  }

  render() {
    const fetchTime = Math.ceil((this.props.player.rateLimitAhead + 1) / 10);
    const fetchEstimate = moment().add(fetchTime + 1, "minute");

    return (
      <SnackbarContent
        style={{ backgroundColor: amber[700], margin: "25px" }}
        aria-describedby="client-snackbar"
        message={
          <Grid spacing={2} id="client-snackbar" container>
            <Grid xs={12} md={1} item container justify="center" alignItems="center">
              <Icon fontSize="large">warning</Icon>
            </Grid>
            <Grid xs={12} md={9} item container justify="center" alignItems="center">
              <p>
                Oh no! We’re currently rate limited by PUBG. (Limit should increase soon)
                <br />
                Sit tight - as long as you keep this page open and connected to the internet, you’re
                in queue to be fetched.
                <br />
                Estimated fetch time is {fetchEstimate.format("h:mm a")}.
              </p>
            </Grid>
          </Grid>
        }
      />
    );
  }
}

export default RateLimited;
