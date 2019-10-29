/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import HeatmapFactory from "lib/heatmap-factory";
import { toScale } from "lib/canvas-math";

const HEATMAP_RADIUS = 15;
const HEATMAP_MAX_DATA = 100;

export const HeatMap = ({ allLocations, pubgMapSize, mapSize, mapScale, offsetX, offsetY }) => {
  const nodeRef = useRef();
  const [heatmap, setHeatMap] = useState();

  useEffect(() => {
    const heatmapInstance = HeatmapFactory.create({
      container: nodeRef.current,
      radius: HEATMAP_RADIUS
    });
    heatmapInstance.setDataMax(HEATMAP_MAX_DATA);
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
      const locations = Object.values(allLocations);
      const allPlayer = [];
      for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        for (let index = 0; index < location.length; index++) {
          const element = location[index];
          allPlayer.push(element);
        }
      }
      const data = computeData(allPlayer);
      heatmap.setData({ data, max: HEATMAP_MAX_DATA });
    }
  }, [allLocations]);

  useEffect(() => {
    if (mapSize) {
      const canvas = document.getElementById("HeatMapWrapper");
      canvas.width = mapSize;
      canvas.height = mapSize;
    }
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
