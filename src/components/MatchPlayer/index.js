import React from "react";
import { xor, union, difference, merge, cloneDeep, set } from "lodash";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as Options from "./Options";
import Map from "./Map";
import Roster from "./Roster/index";
import TimeTracker from "./Time/TimeTracker";
import { TimeSlider } from "./Time/TimeSlider";
import MapSettings from "./map-settings";
import MatchInfo from "./MatchInfo";

const styles = {
  scrollbar: {
    "&::-webkit-scrollbar": {
      width: "10px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundImage:
        "-webkit-gradient(linear, 0% 100%, 0% 0%, color-stop(0.44, rgb(254, 195, 62)), color-stop(0.5, rgb(239, 168, 40)), color-stop(0.86, rgb(239, 168, 40)))",
      borderRadius: "10px"
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 6px inset",
      background: "rgba(0, 0, 0, 0)",
      borderRadius: "10px"
    }
  },
  sideBar: {
    background: "inherit",
    overflowY: "auto",
    maxHeight: "80vh"
  }
};

class MatchPlayer extends React.Component {
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);

    this.state = {
      mapSize: 0,
      focusedPlayer: props.playerName,
      // See getDerivedStateFromProps
      prevPlayerName: props.playerName,
      hoveredPlayer: null,
      trackedPlayers: [],
      options: Options.DEFAULT_OPTIONS,
      setOption: null
    };
  }

  marks = {
    focusedPlayer: () => this.state.focusedPlayer,
    isPlayerFocused: playerName => this.state.focusedPlayer === playerName,

    hoveredPlayer: () => this.state.hoveredPlayer,
    isPlayerHovered: playerName => this.state.hoveredPlayer === playerName,
    setHoveredPlayer: playerName => this.setState({ hoveredPlayer: playerName }),

    trackedPlayers: () => this.state.trackedPlayers,
    isPlayerTracked: playerName => this.state.trackedPlayers.includes(playerName),
    toggleTrackedPlayer: (...playerNames) => {
      this.setState(({ trackedPlayers }) => {
        if (playerNames.length > 1 && difference(playerNames, trackedPlayers).length !== 0) {
          return {
            trackedPlayers: union(trackedPlayers, playerNames)
          };
        }

        return {
          trackedPlayers: xor(trackedPlayers, playerNames)
        };
      });
    }
  };

  // -------------------------------------------------------------------------
  // Map Sizing, Lifecycle ---------------------------------------------------
  // -------------------------------------------------------------------------

  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // HACK-ish. Should probably turn this into a controlled component.
  // The functionality isn't needed right now, but I'd rather not break it.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevPlayerName !== nextProps.playerName) {
      return {
        focusedPlayer: nextProps.playerName,
        prevPlayerName: nextProps.playerName
      };
    }

    return null;
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateMapSize.bind(this));
    this.updateMapSize();
    this.loadOptions();
  }

  componentDidUpdate() {
    this.updateMapSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMapSize.bind(this));
  }

  loadOptions = () => {
    const localOptions = JSON.parse(localStorage.getItem(Options.STORAGE_KEY) || "{}");
    const options = merge(Options.DEFAULT_OPTIONS, localOptions);
    const setOption = (key, val) => {
      // TODO : think again
      if (key === "settings.isHeatmapActive" && val) {
        this.setGettingAll(val);
      }
      this.setState(prevState => {
        const newOptions = cloneDeep(prevState.options);
        set(newOptions, key, val);
        localStorage.setItem(Options.STORAGE_KEY, JSON.stringify(newOptions));
        return { options: newOptions };
      });
    };

    this.setState({ options, setOption });
  };

  updateMapSize = () => {
    const stageWrapper = document.getElementById("StageWrapper");

    if (stageWrapper) {
      this.setState(ps => {
        if (ps.mapSize !== stageWrapper.clientWidth) {
          return { mapSize: stageWrapper.clientWidth };
        }

        return null;
      });
    }
  };

  // -------------------------------------------------------------------------
  // Render ------------------------------------------------------------------
  // -------------------------------------------------------------------------

  render() {
    const { match, classes, rawTelemetry, telemetry, rosters, globalState } = this.props;
    const { mapSize, options, setOption, prevPlayerName } = this.state;
    return (
      <Options.Context.Provider value={{ options, setOption }}>
        <CardContent>
          <TimeTracker
            options={options}
            durationSeconds={match.durationSeconds + 5}
            telemetry={telemetry}
            render={({ msSinceEpoch, timeControls, currentTelemetry }) => (
              <Grid container id="MatchContainer" justify="center" spacing={3}>
                <Grid xs={12} md={3} item>
                  <Card className={`${classes.sideBar} ${classes.scrollbar}`} raised>
                    <Grid
                      container
                      alignItems="flex-start"
                      alignContent="flex-start"
                      item
                      xs={12}
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Card>
                          <MatchInfo
                            match={match}
                            marks={this.marks}
                            rawTelemetry={rawTelemetry}
                            playerName={prevPlayerName}
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card style={{ width: "100%", overflow: "initial" }}>
                          <CardContent style={{ paddingBottom: "16px" }}>
                            <TimeSlider
                              timeControls={timeControls}
                              toggleAutoplay={timeControls.toggleAutoplay}
                              autoplaySpeed={timeControls.autoplaySpeed}
                              setAutoplaySpeed={timeControls.setAutoplaySpeed}
                              onChange={timeControls.setMsSinceEpoch}
                              value={msSinceEpoch}
                              durationSeconds={match.durationSeconds + 5}
                              globalState={globalState}
                              options={options}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card>
                          <MapSettings />
                        </Card>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid container justify="center" id="MapContainer" item md={5}>
                  <Card raised style={{ width: "80vh" }}>
                    <Map
                      playerName={prevPlayerName}
                      rawTelemetry={rawTelemetry}
                      match={match}
                      telemetry={currentTelemetry}
                      mapSize={mapSize}
                      marks={this.marks}
                      options={options}
                      msSinceEpoch={msSinceEpoch}
                    />
                  </Card>
                </Grid>

                <Grid xs={12} md={3} item>
                  <Card
                    className={`${classes.sideBar} ${classes.scrollbar}`}
                    raised
                    style={{ overflowY: "scroll", height: "80vh" }}
                  >
                    <Typography align="center" variant="h6">
                      Name / Kills / Damage
                    </Typography>
                    <Grid container direction="column" justify="flex-start" spacing={1}>
                      <Roster
                        match={match}
                        telemetry={currentTelemetry}
                        rosters={rosters}
                        marks={this.marks}
                      />
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            )}
          />
        </CardContent>
      </Options.Context.Provider>
    );
  }
}

export default withStyles(styles)(MatchPlayer);
