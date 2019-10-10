import React from "react";
import styled from "styled-components";
import "rc-slider/assets/index.css";
import { Grid, Icon, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const getDurationFormat = ms => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms - minutes * 60 * 1000) / 1000);
  const timeText = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timeText;
};

const TimePositionedElement = styled.div.attrs({
  style: ({ value, durationSeconds }) => ({
    left: `${(value / (durationSeconds * 1000)) * 100}%`
  })
});

const HoverableTimePositionedElement = TimePositionedElement`
    &:hover:before {
        display: block;
        position: absolute;
        font-size: 12px;
        top: -35px;
        background-color: white;
        white-space: nowrap;
        border: 1px solid #ddd;
        border-radius: 3px;
        transform: translateX(-50%);
        background: #F7F7F7;
        padding: 2px 6px;
    }
`;

const KillMarker = styled(HoverableTimePositionedElement)`
    position: absolute;
    margin-left: -6px;
    width: 12px;
    text-align: center;
    height: ${props => (props.count > 1 ? 10 : 10)}px;
    background: linear-gradient(to right,
        transparent 0%,
        transparent calc(50% - 0.41px),
        ${props => props.color} calc(50% - 0.8px),
        ${props => props.color} calc(50% + 0.8px),
        transparent calc(50% + 0.41px),
        transparent 100%
    );

    &:after {
        content: "${props => (props.count > 1 ? `(${props.count})` : "")}";
        color: ${props => props.color};
        display: block;
        top: 9px;
        position: absolute;
        text-align: center;
        font-size: 11px;
    }

    &:hover:before {
        content: "${props => props.victimNames}";
    }
`;

const useStyles = makeStyles({
  slider: {
    margin: "0px"
    // width: "33vh"
  }
});

export const TimeSlider = ({
  value,
  stopAutoplay,
  onChange,
  durationSeconds,
  globalState,
  options
}) => {
  const classes = useStyles();

  const groupedKills =
    globalState &&
    globalState.kills.reduce((acc, kill, idx) => {
      if (idx === 0) return [[kill]];

      const [previousKill] = acc[acc.length - 1];
      const shouldGroupWithPrevious = kill.msSinceEpoch - previousKill.msSinceEpoch < 1000;

      if (shouldGroupWithPrevious) {
        acc[acc.length - 1].push(kill);
      } else {
        acc.push([kill]);
      }

      return acc;
    }, null);

  let marks;

  if (groupedKills)
    marks = groupedKills.map(kills => ({
      value: kills[0].msSinceEpoch,
      label: (
        <KillMarker
          key={kills[0].msSinceEpoch}
          value={kills[0].msSinceEpoch}
          count={kills.length}
          durationSeconds={durationSeconds}
          color={options.colors.roster.dead}
          victimNames={kills.map(k => k.victimName).join(", ")}
        />
      )
    }));

  return (
    <Grid container item spacing={2} direction="row" alignItems="center" justify="space-between">
      <Grid item xs={1}>
        <Icon>access_time</Icon>
      </Grid>
      <Grid item xs={9}>
        <Slider
          className={classes.slider}
          min={1000}
          max={durationSeconds * 1000}
          step={100}
          marks={marks && marks}
          value={value}
          onChange={(_, val) => onChange(val)}
          aria-labelledby="discrete-slider-always"
          onChangeCommitted={stopAutoplay}
          valueLabelDisplay="on"
          valueLabelFormat={getDurationFormat(value)}
        />
      </Grid>
    </Grid>
  );
};
