import React from "react";
import { map, clamp, sortBy } from "lodash";
import { Stage, Layer } from "react-konva";
import styled from "styled-components";
import MapButton from "components/MapButton";
import BackgroundLayer from "./BackgroundLayer";
import { Safezone, Bluezone, Redzone } from "./ZoneCircle";
import PlayerDot from "./PlayerDot";
import CarePackage from "./CarePackage";
import Tracer from "./Tracer";
import { HeatMap } from "./heatmap";
import HelpModal from "../HelpModal";
import DownloadButton from "../DownloadButton";

const SCALE_STEP = 1.2;
const MIN_SCALE = 1;
const MAX_SCALE = 50;
const CLAMP_MAP = true; // TODO: This should be a configurable option
const MAP_SIZES = {
  Erangel_Main: 816000,
  Baltic_Main: 816000,
  Desert_Main: 816000,
  Savage_Main: 408000,
  DihorOtok_Main: 612000,
  Summerland_Main: 204000,
  Chimera_Main: 306000,
  Heaven_Main: 102000,
};

const StageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const StyledStage = styled(Stage)`
  div.konvajs-content {
    overflow: hidden;
    border-radius: 4px;
    position: absolute !important;
  }
`;

const ZoomControls = styled.div`
  position: absolute;
  z-index: 999;
  right: 0px;
  bottom: 0px;
`;

const ZoomInButton = styled(MapButton)`
  bottom: 50px;
  right: 15px;
`;

const ZoomOutButton = styled(MapButton)`
  bottom: 15px;
  right: 15px;
`;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = { mapScale: 1, offsetX: 0, offsetY: 0 };
  }

  static getDerivedStateFromProps(props) {
    if (props.options.tools.enabled) {
      const { offsetX, offsetY, mapScale } = props.options.tools.map;
      return {
        offsetX,
        offsetY,
        mapScale
      };
    }
    return {};
  }

  componentDidMount() {
    const transparentLayer = document.querySelectorAll(".konvajs-content>canvas")[1];
    transparentLayer.style.zIndex = 100;
  }

  handleDragEnd = e => {
    this.setState({
      offsetX: e.target.x(),
      offsetY: e.target.y()
    });
  };

  dragBoundFunc = pos => {
    const { mapScale } = this.state;
    const { mapSize } = this.props;
    let { x, y } = pos;
    if (CLAMP_MAP) {
      x = clamp(x, -(mapScale - 1) * mapSize, 0);
      y = clamp(y, -(mapScale - 1) * mapSize, 0);
    }

    this.setState({
      offsetX: x,
      offsetY: y
    });

    return { x, y };
  };

  handleMousewheel = e => {
    e.evt.preventDefault();
    const scaleDelta = e.evt.deltaY > 0 ? 1 / SCALE_STEP : SCALE_STEP;
    this.handleZoom(scaleDelta, e.evt.layerX, e.evt.layerY);
  };

  handleZoom = (scaleDelta, layerX, layerY) => {
    const { mapSize } = this.props;
    if (!layerX) layerX = mapSize / 2; // eslint-disable-line
    if (!layerY) layerY = mapSize / 2; // eslint-disable-line
    this.setState(prevState => {
      const newScale = clamp(prevState.mapScale * scaleDelta, MIN_SCALE, MAX_SCALE);

      const mousePointX = layerX / prevState.mapScale - prevState.offsetX / prevState.mapScale;
      const mousePointY = layerY / prevState.mapScale - prevState.offsetY / prevState.mapScale;

      let offsetX = -(mousePointX - layerX / newScale) * newScale;
      let offsetY = -(mousePointY - layerY / newScale) * newScale;

      if (CLAMP_MAP) {
        offsetX = clamp(offsetX, -(newScale - 1) * mapSize, 0);
        offsetY = clamp(offsetY, -(newScale - 1) * mapSize, 0);
      }

      return {
        mapScale: newScale,
        offsetX,
        offsetY
      };
    });
  };

  render() {
    const {
      match: { mapName },
      match,
      playerName,
      rawTelemetry,
      telemetry,
      mapSize,
      marks,
      msSinceEpoch,
      options
    } = this.props;
    const { mapScale, offsetX, offsetY } = this.state;
    const scale = { x: mapScale, y: mapScale };

    const pubgMapSize = MAP_SIZES[mapName];

    const sortedPlayers =
      telemetry &&
      sortBy(telemetry.players, player => {
        const { name } = player;

        if (marks.isPlayerFocused(name)) return "~z";
        if (marks.isPlayerTracked(name)) return `~y${name}`;
        if (telemetry.players[marks.focusedPlayer()].teammates.includes(name)) return `~x${name}`;
        if (player.status === "dead") return `@y${name}`;
        if (player.health === 0) return `@z${name}`;
        return name;
      });

    return (
      <StageWrapper id="StageWrapper">
        <StyledStage
          width={mapSize}
          height={mapSize}
          scale={scale}
          x={offsetX}
          y={offsetY}
          dragBoundFunc={this.dragBoundFunc}
          onDragEnd={this.handleDragEnd}
          onWheel={this.handleMousewheel}
          draggable="true"
          hitGraphEnabled={false}
        >
          <BackgroundLayer mapName={mapName} mapSize={mapSize} />
          {telemetry && (
            <Layer style={{ zIndex: 100 }}>
              {telemetry.safezone && options.settings.isSafeZoneActive && (
                <Safezone
                  mapSize={mapSize}
                  pubgMapSize={pubgMapSize}
                  mapScale={mapScale}
                  circle={telemetry.safezone}
                />
              )}
              {telemetry.bluezone && options.settings.isBlueZoneActive && (
                <Bluezone
                  mapSize={mapSize}
                  pubgMapSize={pubgMapSize}
                  mapScale={mapScale}
                  circle={telemetry.bluezone}
                />
              )}
              {telemetry.redzone && options.settings.isRedZoneActive && (
                <Redzone
                  mapSize={mapSize}
                  pubgMapSize={pubgMapSize}
                  mapScale={mapScale}
                  circle={telemetry.redzone}
                />
              )}
              {options.settings.isCarePackageActive &&
                telemetry.carePackages.map(carePackage => (
                  <CarePackage
                    key={carePackage.key}
                    mapSize={mapSize}
                    pubgMapSize={pubgMapSize}
                    mapScale={mapScale}
                    carePackage={carePackage}
                  />
                ))}
              {options.settings.isPlayersActive &&
                map(sortedPlayers, player => (
                  <PlayerDot
                    options={options}
                    player={player}
                    mapSize={mapSize}
                    pubgMapSize={pubgMapSize}
                    mapScale={mapScale}
                    key={`dot-${player.name}`}
                    marks={marks}
                    showName={marks.isPlayerTracked(player.name)}
                  />
                ))}
              {telemetry.tracers.map(tracer => (
                <Tracer
                  key={tracer.key}
                  mapSize={mapSize}
                  pubgMapSize={pubgMapSize}
                  mapScale={mapScale}
                  players={telemetry.players}
                  tracer={tracer}
                  msSinceEpoch={msSinceEpoch}
                />
              ))}
            </Layer>
          )}
        </StyledStage>
        {options.settings.isHeatmapActive && mapSize && (
          <HeatMap
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...{ pubgMapSize, mapSize, mapScale, offsetX, offsetY }}
            players={telemetry.players}
            allLocations={telemetry.allLocations}
          />
        )}
        <ZoomControls>
          <ZoomInButton onClick={() => this.handleZoom(1.3)}>+</ZoomInButton>
          <ZoomOutButton onClick={() => this.handleZoom(1 / 1.3)}>-</ZoomOutButton>
        </ZoomControls>
        <HelpModal mapSize={mapSize} />
        <DownloadButton match={match} playerName={playerName} rawTelemetry={rawTelemetry} />
      </StageWrapper>
    );
  }
}

export default Map;
