import L from "leaflet";
import challenge from "./images/challenge.png";
import search from "./images/search.png";
import x from "./images/x.png";
import treasure from "./images/treasure.png";
import skull from "./images/skull.png";
import camera from "./images/camera.png";
import letters from "./images/letters.png";
import hoprock from "./images/hoprock.png";
export const challengeIcon = L.icon({
  iconUrl: challenge,
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
export const searchIcon = L.icon({
  iconUrl: search,
  iconAnchor: [18, 35],
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
export const treasureIcon = L.icon({
  iconUrl: treasure,
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
export const xIcon = L.icon({
  iconUrl: x,
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
export const skullIcon = L.icon({
  iconUrl: skull,
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
export const cameraIcon = L.icon({
  iconUrl: camera,
  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});

export const hoprockIcon = L.icon({
  iconUrl: hoprock,
  iconSize: [90, 60], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
export const lettersIcon = L.icon({
  iconUrl: letters,
  iconSize: [70, 44], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
