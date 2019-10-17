import React, { useContext } from "react";
import { isEmpty, groupBy } from "lodash";
import DocumentTitle from "react-document-title";
import { Context } from "contexts/settings";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Grid, CardContent, Icon, Avatar, Typography } from "@material-ui/core";
import { Bookmark, Spinner } from "components";
import { makeStyles } from "@material-ui/core/styles";
import MatchesList from "./matches-list";
import RateLimited from "./rate-limited";
import { PlayerNotFound } from "./player-not-found";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1, 2)
  }
}));

export const Player = ({ match }) => {
  const classes = useStyles();
  const { toggleFavoritePlayer, isFavoritePlayer } = useContext(Context);
  const GET_PLAYER_MATCHES = gql`
    query($shardId: String!, $playerName: String!) {
      player(shardId: $shardId, name: $playerName) {
        id
        name
        lastFetchedAt
        rateLimitReset
        rateLimitAhead
        rateLimitPlayerKey
        matches {
          id
          playedAt
          gameMode
          mapName
          durationSeconds
          stats {
            winPlace
            kills
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PLAYER_MATCHES, {
    fetchPolicy: "network-only",
    variables: {
      shardId: match.params.shardId,
      playerName: match.params.playerName
    }
  });

  if (loading) return <Spinner title="Loading player data..." />;
  if (error) return <p>An error occurred :(</p>;

  if (!data || !data.player || (isEmpty(data.player.matches) && !data.player.rateLimitReset)) {
    return <PlayerNotFound match={match} />;
  }

  const { player, refetch } = data;

  const matchTypes = groupBy(player.matches, m => {
    if (m.gameMode.includes("normal")) return "c";
    if (m.gameMode.includes("solo")) return 1;
    if (m.gameMode.includes("duo")) return 2;
    if (m.gameMode.includes("squad")) return 4;
    return "unknown";
  });

  const hasCustom = !isEmpty(matchTypes.c);
  const playerName = player.name;
  const { shardId } = match.params;

  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      <DocumentTitle title={`${player.name} | pubgheatmap.net`} />

      <CardContent>
        <Grid container justify="center" alignItems="center">
          <Grid item justify="center" alignItems="center" spacing={2} container xs={12}>
            <Avatar className={classes.avatar}>
              <Icon fontSize="large">flash_on</Icon>
            </Avatar>
            <Typography variant="h5">{player.name}</Typography>
          </Grid>
          <Grid justify="center" container item alignItems="center" xs={12}>
            <Bookmark
              playerName={playerName}
              onClick={() => toggleFavoritePlayer(playerName, shardId)}
              bookmarked={isFavoritePlayer(playerName, shardId)}
            />
          </Grid>
          <Grid justify="center" container item alignItems="center" xs={12}>
            <Typography paragraph />
            {player.rateLimitReset && <RateLimited player={player} onUnRateLimited={refetch} />}
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <MatchesList
            col={hasCustom ? 3 : 4}
            header="Solo"
            baseUrl={match.url}
            matches={matchTypes["1"]}
          />
          <MatchesList
            col={hasCustom ? 3 : 4}
            header="Duos"
            baseUrl={match.url}
            matches={matchTypes["2"]}
          />
          <MatchesList
            col={hasCustom ? 3 : 4}
            header="Squad"
            baseUrl={match.url}
            matches={matchTypes["4"]}
          />
          {hasCustom && (
            <MatchesList col={3} header="Custom" baseUrl={match.url} matches={matchTypes.c} />
          )}
        </Grid>
      </CardContent>
    </div>
  );
};
