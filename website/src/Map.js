import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import L from "leaflet";
import fnmap from "./images/fnmap.jpg";
import { getInitialBrowserHeight, populateMap } from "./functions.js";
const dummydata = [
  {
    coord: {
      x_multiplier: 0.54,
      y_multiplier: 0.64
    },
    icon: "challenge",
    description: "kill 5 people"
  }
];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      subwayLinesFilter: "*",
      numEntrances: null,
      markers: []
    };
  }

  componentDidMount() {
    // code to run just after the component "mounts" / DOM elements are created
    // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
    // create the Leaflet map object
    if (!this.state.map) this.init();
  }

  init = id => {
    if (this.state.map) return;
    let length = getInitialBrowserHeight();
    let map = L.map("mapid", {
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1
    });
    let imageUrl = fnmap;
    let imageBounds = [[0, 0], [length, length]];
    let currentimage = L.imageOverlay(imageUrl, imageBounds).addTo(map);
    map.fitBounds(imageBounds);
    map.setMaxBounds(imageBounds);
    var markers = L.layerGroup().addTo(map);
    populateMap(dummydata, length, markers);
    map.on("click", function(e) {
      var coord = e.latlng.toString().split(",");
      var lat = coord[0].split("(");
      var lng = coord[1].split(")");
      console.log(
        "You clicked the map at latitude: " +
          lat[1] +
          " and longitude: " +
          lng[0]
      );
    });
    map.on("resize", data => {
      console.log(data);
      let length = data.newSize.x;
      map.removeLayer(currentimage);
      markers.clearLayers();
      populateMap(dummydata, length, markers);
      imageBounds = [[0, 0], [length, length]];
      currentimage = L.imageOverlay(imageUrl, imageBounds).addTo(map);
      map.setMaxBounds(imageBounds);
      map.fitBounds(imageBounds);
      map.invalidateSize();
      //marker.setLatLng([length / 2, length / 2]);
    });
    this.setState({ map });
  };
  render() {
    return (
      <div className="App">
        <div className="mapContainer">
          <div id="mapid" />
        </div>
      </div>
    );
  }
}

export default Map;
