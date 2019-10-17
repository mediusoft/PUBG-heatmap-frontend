import React from "react";
import { downloadJSON, LOCAL_REPLAY_VERSION } from "lib/match-export";
import styled from "styled-components";
import { Icon } from "@material-ui/core";
import MapButton from "../MapButton";

const DownloadIcon = styled(MapButton)`
  top: 15px;
  right: 50px;
  z-index: 998;
  color: "#fff";
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
        <Icon>cloud_download</Icon>
      </DownloadIcon>
    );
  }
}

export default DownloadButton;
