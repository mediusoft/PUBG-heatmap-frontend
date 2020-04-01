import React, { Component } from "react";
import ReactDOM from "react-dom";
import Heatmap from "heatmap.js/build/heatmap.js";
import { toScale } from "../../../lib/canvas-math.js";

const MAP_SIZES = {
  Erangel_Main: 816000,
  Baltic_Main: 816000,
  Desert_Main: 816000,
  Savage_Main: 408000,
  DihorOtok_Main: 612000,
  Summerland_Main: 204000
};

class ReactHeatmap extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.heatmap = Heatmap.create({
      container: ReactDOM.findDOMNode(this)
    });
    this.setData(this.props.max, this.props.data);
  }

  componentWillReceiveProps(newProps) {
    console.log("clg", newProps);

    this.setData(newProps.max, newProps.data);
  }

  setData(max, data) {
    this.heatmap.setData({
      max,
      data: this.computeData(data)
    });
  }

  computeData(data) {
    const { mapName, mapSize } = this.props;
    const pubgMapSize = MAP_SIZES[mapName];

    if (this.props.unit === "percent") {
      const container = {};
      container.width = ReactDOM.findDOMNode(this).offsetWidth;
      container.height = ReactDOM.findDOMNode(this).offsetHeight;
      const at = data.map(function(values, index) {
        return {
          x: Math.floor(toScale(pubgMapSize, mapSize, values.x)),
          y: Math.abs(toScale(pubgMapSize, mapSize, values.y))
        };
      });
      return at;
    }
    return data;
  }

  render() {
    const { mapName, mapSize } = this.props;
    console.log("mapSize", mapSize);

    return (
      <div
        id="test"
        style={{
          width: `${mapSize || 300}px`,
          postition: "absolute",
          height: `${mapSize || 200}px`
        }}
      />
    );
  }
}

export default ReactHeatmap;
