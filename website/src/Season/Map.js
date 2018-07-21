import React, { Component } from "react";
import "./../App.css";
import { populateMap, decideMap } from "../Utils";
import { iconQuery } from "./../Database";

//node modules
import L from "leaflet";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: null,
      mapLength: null,
      data: null,
      currentImage: null,
      number: null
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
      attributionControl: false
    });
    let imageBounds = [[0, 0], [length, length]];
    let currentImage = L.imageOverlay(
      decideMap(this.props.number),
      imageBounds
    ).addTo(map);
    map.fitBounds(imageBounds);
    map.setMaxBounds(imageBounds);
    L.control.attribution({ position: "topright" }).addTo(map);
    map.attributionControl.addAttribution(
      'map locations generously provided by <a href="https://www.reddit.com/user/thesquatingdog", class="your_class">/u/thesquatingdog</a>'
    );
    this.setState({ map: map, markers: markers, currentImage: currentImage });
    map.on("click", res => {
      if (window.innerWidth >= 992 && !map.scrollWheelZoom.enabled()) {
        map.scrollWheelZoom.enable();
      }
    });
    const updateModerator = this.props.updateModerator;
    if (updateModerator) {
      map.on("click", e => {
        let coord = e.latlng.toString().split(",");
        let lat = coord[0].split("(");
        let lng = coord[1].split(")");
        let coordDict = { x: lat[1] / length, y: lng[0] / length };
        updateModerator(coordDict);
      });
      map.on("mousemove", e => {
        let coord = e.latlng.toString().split(",");
        let lat = coord[0].split("(");
        let lng = coord[1].split(")");
        console.log(lat[1] / length, lng[0] / length);
      });
    }
    map.on("mouseout", res => {
      if (map.scrollWheelZoom.enabled()) {
        map.scrollWheelZoom.disable();
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
      let currentImage = prevState.currentImage;
      if (
        nextProps.iconQuery.allIcons !== prevState.icons ||
        !(JSON.stringify(nextProps.data) === JSON.stringify(prevState.data))
      ) {
        let length = nextProps.mapLength;
        let map = prevState.map;
        map.removeLayer(markers);
        markers.clearLayers();
        populateMap(
          nextProps.data,
          length,
          markers,
          nextProps.iconQuery.allIcons
        );
        map.addLayer(markers);
      }
      if (
        prevState.mapLength !== nextProps.mapLength ||
        prevState.number !== nextProps.number
      ) {
        if (nextProps.mapLength && nextProps.mapLength !== 0) {
          let length = nextProps.mapLength;
          if (nextProps.updateHeight) nextProps.updateHeight(length);
          let map = prevState.map;
          map.removeLayer(currentImage);
          markers.clearLayers();
          populateMap(
            nextProps.data,
            length,
            markers,
            nextProps.iconQuery.allIcons
          );
          let imageBounds = [[0, 0], [length, length]];
          map.fitBounds(imageBounds);
          map.setMaxBounds(imageBounds);
          map.off("popupclose");
          map.on("popupclose", () => {
            map.setMaxBounds(imageBounds);
          });
          map.off("popupopen");
          map.on("popupopen", () => {
            map.setMaxBounds();
          });
          if (map.scrollWheelZoom.enabled()) {
            map.scrollWheelZoom.disable();
          }
          currentImage = L.imageOverlay(
            decideMap(nextProps.number),
            imageBounds
          ).addTo(map);
          setTimeout(() => {
            map.invalidateSize();
          }, 400);
        }
      }
      return {
        mapLength: nextProps.mapLength,
        data: nextProps.data,
        markers: markers,
        currentImage: currentImage,
        icons: nextProps.iconQuery.allIcons,
        number: nextProps.number
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

const MapWithQuery = graphql(iconQuery, {
  name: "iconQuery"
})(withRouter(Map));

export default MapWithQuery;
