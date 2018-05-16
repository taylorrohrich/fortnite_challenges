import React, { Component } from "react";
import "./App.css";

import fnmap from "./images/fnmap.jpg";
import { getInitialBrowserHeight, populateMap } from "./functions.js";

//node modules
import L from "leaflet";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: null
    };
  }

  init = id => {
    if (this.state.map) return;

    let length = getInitialBrowserHeight();
    let markers = L.layerGroup();
    populateMap(this.props.data, length, markers);
    let map = L.map("mapid", {
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
      layers: markers,
      dragging: false,
      scrollWheelZoom: false
    });
    let imageUrl = fnmap;
    let imageBounds = [[0, 0], [length, length]];
    let currentimage = L.imageOverlay(imageUrl, imageBounds).addTo(map);
    map.fitBounds(imageBounds);
    map.setMaxBounds(imageBounds);
    this.setState({ map: map, markers: markers });
    map.on("resize", data => {
      let length = data.newSize.x;
      if (length !== 0) {
        map.removeLayer(currentimage);
        markers.clearLayers();
        populateMap(this.props.data, length, markers);
        imageBounds = [[0, 0], [length, length]];
        currentimage = L.imageOverlay(imageUrl, imageBounds).addTo(map);
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
  componentDidUpdate() {
    if (this.state.map && this.state.markers) {
      let length = getInitialBrowserHeight();
      let markers = this.state.markers;
      markers.clearLayers();
      populateMap(this.props.data, length, markers);
      this.state.map.invalidateSize();
    }
  }
  render() {
    if (this.props.loading) {
      return <div />;
    }
    return <div id="mapid" />;
  }
}

export default Map;
