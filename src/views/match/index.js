/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import DocumentTitle from "react-document-title";
import MatchPlayer from "components/MatchPlayer";
import Telemetry from "models/Telemetry";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Card } from "@material-ui/core";
import { Spinner } from "components";

const { TelemetryWorker } = require("models/Telemetry.worker");

export const Match = ({ match }) => {
  const { params } = match;

  const [state, setState] = useState({
    rawTelemetry: null,
    telemetry: null,
    telemetryLoaded: false,
    telemetryError: false,
    rosters: null,
    globalState: null
  });

  const GET_MATCH_DETAIL = gql`
    query($matchId: String!) {
      match(id: $matchId) {
        id
        shardId
        gameMode
        playedAt
        mapName
        durationSeconds
        telemetryUrl
        players {
          id
          name
          rosterId
          stats {
            kills
            winPlace
          }
        }
      }
    }
  `;

  // -------------------------------------------------------------------------
  // Telemetry, Lifecycle ----------------------------------------------------
  // -------------------------------------------------------------------------

  const { loading, error, data } = useQuery(GET_MATCH_DETAIL, {
    fetchPolicy: "network-only",
    variables: {
      matchId: match.params.matchId
    }
  });

  useEffect(() => {
    if (data && data.match) {
      loadTelemetry();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.match]);

  const loadTelemetry = useCallback(async () => {
    if (data) {
      setState({ ...state, telemetry: null, telemetryLoaded: false, telemetryError: false });

      const {
        success,
        error: telemetryError,
        state: telemetryState,
        globalState,
        rawTelemetry
      } = await TelemetryWorker({
        match: data.match,
        focusedPlayer: params.playerName
      });

      if (!success) {
        console.error(`Error loading telemetry: ${telemetryError}`);

        setState({
          ...state,
          telemetryError: true
        });

        return;
      }

      const telemetry = Telemetry(telemetryState);

      setState(prev => {
        return {
          ...prev,
          rawTelemetry,
          telemetry,
          telemetryLoaded: true,
          rosters: telemetry.finalRoster(params.playerName),
          globalState
        };
      });
    }
  }, [data]);

  const { telemetry, rawTelemetry, telemetryLoaded, telemetryError, rosters, globalState } = state;

  let content;

  if (loading) {
    content = <Spinner title="Loading match data..." />;
  } else if (error || telemetryError) {
    content = <div>An error occurred :(</div>;
  } else if (!data.match) {
    content = <div>Match not found</div>;
  } else if (!telemetryLoaded) {
    content = <Spinner disableShrink title="Loading telemetry data..." />;
  } else {
    content = (
      <MatchPlayer
        match={data.match}
        rawTelemetry={rawTelemetry}
        telemetry={telemetry}
        rosters={rosters}
        globalState={globalState}
        playerName={params.playerName}
      />
    );
  }

  return (
    <Card style={{ borderRadius: "0px", minHeight: "calc(100vh - 64px" }}>
      <DocumentTitle title="Replay | pubgheatmap.net" />
      {content}
    </Card>
  );
};
