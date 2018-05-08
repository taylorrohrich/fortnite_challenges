import L from "leaflet";
import challenge from "./images/challenge.png";
export const challengeIcon = L.icon({
  iconUrl: challenge,

  iconSize: [35, 35], // size of the icon
  shadowSize: [50, 64] // size of the shadow
});
