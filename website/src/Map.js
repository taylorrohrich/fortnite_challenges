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
      data: null,
      currentImage: null
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
      scrollWheelZoom: false,
      tap: true,
    });
    let imageBounds = [[0, 0], [length, length]];
    let currentImage = L.imageOverlay(fnmap, imageBounds).addTo(map);
    map.fitBounds(imageBounds);
    map.setMaxBounds(imageBounds);
    this.setState({ map: map, markers: markers, currentImage: currentImage });
    map.on("zoom", data => {
      if (map.getZoom() === 0) {
        map.dragging.disable();
      } else {
        if (!this.props.isMapLocked) {
          map.dragging.enable();
        }
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
      let currentImage = prevState.currentImage;
      if (
        !(JSON.stringify(nextProps.data) === JSON.stringify(prevState.data))
      ) {
        let length = nextProps.mapLength;
        let map = prevState.map;
        map.removeLayer(markers);
        markers.clearLayers();
        populateMap(nextProps.data, length, markers);
        map.addLayer(markers);
      }
      if (prevState.mapLength !== nextProps.mapLength) {
        if (nextProps.mapLength && nextProps.mapLength !== 0) {
          let length = nextProps.mapLength;
          let map = prevState.map;
          map.removeLayer(currentImage);
          markers.clearLayers();
          populateMap(nextProps.data, length, markers);
          let imageBounds = [[0, 0], [length, length]];
          map.fitBounds(imageBounds);
          map.setMaxBounds(imageBounds);
          currentImage = L.imageOverlay(fnmap, imageBounds).addTo(map);
          setTimeout(() => {
            map.invalidateSize();
          }, 400);
        }
      }
      if (nextProps.isMapLocked) {
        let map = prevState.map;
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        map.zoomControl.disable();
        if (map.tap) map.tap.disable();
      } else {
        let map = prevState.map;
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        map.zoomControl.enable();
        if (map.tap) map.tap.enable();
      }
      return {
        mapLength: nextProps.mapLength,
        data: nextProps.data,
        markers: markers,
        currentImage: currentImage
      };
    }
    return {};
  }

  render() {
    return (
      <div
        style={{
          width: this.props.mapLength,
          height: this.props.mapLength
        }}
        id="mapid"
      />
    );
  }
}

export default Map;
