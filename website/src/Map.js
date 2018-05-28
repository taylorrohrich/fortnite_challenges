import React, { Component } from "react";
import "./App.css";

import fnmap from "./images/fnmap.jpg";
import { populateMap } from "./functions.js";

//node modules
import L from "leaflet";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: null,
      mapLength: null,
      data: null
    };
  }

  init = id => {
    if (this.state.map) return;
    let length = this.props.mapLength;
    let markers = L.layerGroup();
    let map = L.map("mapid", {
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
      layers: markers,
      dragging: false,
      scrollWheelZoom: false
    });
    let imageBounds = [[0, 0], [length, length]];
    let currentImage = L.imageOverlay(fnmap, imageBounds).addTo(map);
    map.fitBounds(imageBounds);
    map.setMaxBounds(imageBounds);
    this.setState({ map: map, markers: markers });
    map.on("resize", data => {
      let length = data.newSize.x;
      if (length !== 0) {
        map.removeLayer(currentImage);
        markers.clearLayers();
        populateMap(this.props.data, length, markers);

        imageBounds = [[0, 0], [length, length]];
        currentImage = L.imageOverlay(fnmap, imageBounds).addTo(map);
        map.setMaxBounds(imageBounds);
        map.fitBounds(imageBounds);
        map.invalidateSize();
      }
    });
    map.on("zoom", data => {
      if (map.getZoom() === 0) {
        map.dragging.disable();
      } else {
        map.dragging.enable();
      }
    });
  };

  componentDidMount() {
    if (!this.state.map) {
      this.init();
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.map) {
      let markers = prevState.markers;
      if (
        !(JSON.stringify(nextProps.data) === JSON.stringify(prevState.data))
      ) {
        let length = nextProps.mapLength;
        let map = prevState.map;
        map.removeLayer(markers);
        markers.clearLayers();
        populateMap(nextProps.data, length, markers);
        map.addLayer(markers);
        map.invalidateSize();
      }
      return {
        mapLength: nextProps.mapLength,
        data: nextProps.data,
        markers: markers
      };
    }
    return {};
  }
  render() {
    return (
      <div>
        <div
          style={{ width: this.props.mapLength, height: this.props.mapLength }}
          id="mapid"
        />
      </div>
    );
  }
}

export default Map;
