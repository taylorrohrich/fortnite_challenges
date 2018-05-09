import L from "leaflet";
import { icons, challengeIcon } from "./icons.js";
export function getInitialBrowserHeight() {
  let width = window.innerWidth;
  let res = 0;
  console.log(window.innerWidth);
  if (width > 320) {
    res = 255;
  }
  if (width > 480) {
    res = 385;
  }
  if (width > 768) {
    res = 615;
  }
  if (width > 992) {
    res = 795;
  }
  if (width > 1200) {
    res = 960;
  }
  return res;
}

export function populateMap(data, length, group) {
  for (let i = 0; i < data.length; i++) {
    let chal = data[i];
    if (chal.coord.length) {
      let coords = chal.coord;

      for (let j = 0; j < coords.length; j++) {
        let m = L.marker([coords[j].x * length, coords[j].y * length], {
          // Make the icon dragable
          icon: challengeIcon
        }).bindPopup(chal.description); // Adjust the opacity
        group.addLayer(m);
      }
    }
  }
}
