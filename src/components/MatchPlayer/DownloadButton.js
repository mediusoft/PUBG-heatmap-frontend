import React from "react";
import { downloadJSON, LOCAL_REPLAY_VERSION } from "lib/match-export";
import styled from "styled-components";
import MapButton from "../MapButton";

const DownloadIcon = styled(MapButton)`
  top: 63px;
  right: 50px;
  z-index: 998;

  @media (-moz-touch-enabled: 1), (pointer: coarse) {
    display: none;
  }
`;

class DownloadButton extends React.PureComponent {
  downloadMatch = () => {
    const { match, rawTelemetry, playerName } = this.props;

    downloadJSON({
      version: LOCAL_REPLAY_VERSION,
      match,
      rawTelemetry,
      playerName
    });
  };

  render() {
    return (
      <DownloadIcon onClick={this.downloadMatch}>
        <i className="fi-download" />
      </DownloadIcon>
    );
  }
}

export default DownloadButton;
