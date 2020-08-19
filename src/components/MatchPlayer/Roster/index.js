import React from "react";
import styled from "styled-components";
import { Tooltip, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Loadout from "./Loadout";
import * as Options from "../Options";

const getRosterColor = ({ colors }, marks, player) => {
  const dead = player.status === "dead";
  const knocked = player.status !== "dead" && player.health === 0;

  if (knocked) {
    return colors.roster.knocked;
  }
  if (marks.focusedPlayer() === player.name) {
    return dead ? colors.roster.deadTeammate : colors.roster.focused;
  }
  if (player.teammates.includes(marks.focusedPlayer())) {
    return dead ? colors.roster.deadTeammate : colors.roster.teammate;
  }

  return dead ? colors.roster.dead : colors.roster.enemy;
};

const PlayerItem = styled.li`
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 15px 25px;
  grid-column-gap: 5px;

  i {
    margin-left: 5px;
    font-size: 1.1rem;
    line-height: 0.5rem;
  }
`;

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const Roster = ({ telemetry, marks, rosters }) => {
  return (
    <Options.Context.Consumer>
      {({ options }) =>
        rosters.map(r => {
          return (
            <Grid item xs>
              <Card key={`roster-${r[0]}`}>
                <CardContent style={{ padding: "10px" }}>
                  {r.map(playerName => {
                    const p = telemetry.players[playerName];
                    if (!p) return null;
                    return (
                      <PlayerItem
                        key={p.name}
                        onClick={() => marks.toggleTrackedPlayer(p.name)}
                        onMouseEnter={() => marks.setHoveredPlayer(p.name)}
                        onMouseLeave={() => marks.setHoveredPlayer(null)}
                        style={{
                          color: getRosterColor(options, marks, p),
                          textDecoration: marks.isPlayerTracked(p.name) ? "underline" : ""
                        }}
                      >
                        <LightTooltip placement="right" title={<Loadout items={p.items} />}>
                          <Typography variant="body2">{p.name}</Typography>
                        </LightTooltip>
                        <Typography variant="body2">{p.kills}</Typography>
                        <Typography variant="body2">{Math.round(p.damageDealt)}</Typography>
                      </PlayerItem>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          );
        })
      }
    </Options.Context.Consumer>
  );
};

export default Roster;
