/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import HeatmapFactory from "lib/heatmap-factory";
import { toScale } from "lib/canvas-math";

const HEATMAP_RADIUS = 15;

export const HeatMap = ({
  allLocations,
  playerLocations,
  pubgMapSize,
  mapSize,
  mapScale,
  offsetX,
  offsetY
}) => {
  const nodeRef = useRef();
  const [heatmap, setHeatMap] = useState();
  useEffect(() => {
    const heatmapInstance = HeatmapFactory.create({
      container: nodeRef.current,
      radius: HEATMAP_RADIUS
    });
    heatmapInstance.setDataMax(200);
    setHeatMap(heatmapInstance);
  }, []);

  const computeData = data => {
    return data.map(values => {
      return {
        x: Math.floor(toScale(pubgMapSize, mapSize, values.x)),
        y: Math.abs(Math.floor(toScale(pubgMapSize, mapSize, values.y)))
      };
    });
  };

  useEffect(() => {
    if (heatmap) {
      if (allLocations) {
        heatmap.setData({ data: computeData(allLocations) });
      } else {
        const data = Object.values(playerLocations);
        heatmap.addData(computeData(data));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerLocations, allLocations]);

  useEffect(() => {
    if (mapSize) {
      const canvas = document.getElementById("HeatMapWrapper");
      canvas.width = mapSize;
      canvas.height = mapSize;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapSize]);

  return (
    <div
      id="HeatMapWrapper"
      style={{
        position: "absolute",
        width: `${mapSize}px`,
        height: `${mapSize}px`,
        transform: `scale(${mapScale})`,
        top: `${offsetY}px`,
        left: `${offsetX}px`,
        overflow: "hidden",
        transformOrigin: "top left"
      }}
      ref={nodeRef}
    />
  );
};

export default HeatMap;
