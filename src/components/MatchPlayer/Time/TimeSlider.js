import React from "react";
import "rc-slider/assets/index.css";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { VideoSeekSlider } from "react-video-seek-slider";
import "./Slider.css";

const getDurationFormat = ms => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms - minutes * 60 * 1000) / 1000);
  const timeText = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timeText;
};

const TogglePlayButton = ({ autoplay, toggleAutoplay }) => {
  if (autoplay) {
    return (
      <IconButton size="small" onClick={toggleAutoplay}>
        <Icon fontSize="small">pause</Icon>
      </IconButton>
    );
  }
  return (
    <IconButton size="small" onClick={toggleAutoplay}>
      <Icon fontSize="small">play_arrow</Icon>
    </IconButton>
  );
};

export const TimeSlider = ({
  value,
  durationSeconds,
  timeControls: { autoplay, toggleAutoplay, autoplaySpeed, setAutoplaySpeed, setMsSinceEpoch }
}) => {
  return (
    <Grid container item direction="row" alignItems="center" justify="space-between">
      <Grid item xs={12}>
        <VideoSeekSlider
          className="slider"
          min={1000}
          max={durationSeconds}
          currentTime={value / 1000}
          isThumbActive={false}
          limitTimeTooltipBySides
          onChange={time => {
            setMsSinceEpoch(time * 1000);
          }}
          offset={0}
          secondsPrefix="00:00:"
          minutesPrefix=""
        />
        <div style={{ display: "block" }}>
          <TogglePlayButton toggleAutoplay={toggleAutoplay} autoplay={autoplay} />
          <IconButton size="small" onClick={() => setAutoplaySpeed(autoplaySpeed - 1)}>
            <Icon fontSize="small">fast_rewind</Icon>
          </IconButton>
          <span style={{ padding: "1px" }}>{autoplaySpeed}x</span>
          <IconButton size="small" onClick={() => setAutoplaySpeed(autoplaySpeed + 1)}>
            <Icon fontSize="small">fast_forward</Icon>
          </IconButton>
          <div style={{ float: "right" }}>
            <span>{`${getDurationFormat(value)} `}</span>/
            <span>{` ${getDurationFormat(durationSeconds * 1000)}`}</span>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
