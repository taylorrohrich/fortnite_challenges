import L from "leaflet";
import challenge from "./images/challenge.png";
import search from "./images/search.png";
import x from "./images/x.png";
import treasure from "./images/treasure.png";
import skull from "./images/skull.png";
import camera from "./images/camera.png";
import letters from "./images/letters.png";
import hoprock from "./images/hoprock.png";
import duck from "./images/duck.png";
import disco from "./images/disco.png";
import vending from "./images/vending.png";
import poster from "./images/poster.png";
import soccer from "./images/soccer.png";
import consumable from "./images/consumable.png";

export function decideIcon(icon) {
  const multiplier = window.innerWidth >= 576 ? 1 : 0.6;
  switch (icon) {
    case "challengeIcon":
      return getIcon(challenge, 35, 35, multiplier);
    case "xIcon":
      return getIcon(x, 35, 35, multiplier);
    case "searchIcon":
      return getIcon(search, 35, 35, multiplier);
    case "treasureIcon":
      return getIcon(treasure, 35, 35, multiplier);
    case "skullIcon":
      return getIcon(skull, 35, 35, multiplier);
    case "cameraIcon":
      return getIcon(camera, 35, 35, multiplier);
    case "lettersIcon":
      return getIcon(letters, 70, 44, multiplier);
    case "hoprockIcon":
      return getIcon(hoprock, 90, 60, multiplier);
    case "duckIcon":
      return getIcon(duck, 25, 34, multiplier);
    case "discoIcon":
      return getIcon(disco, 25, 25, multiplier);
    case "vendingIcon":
      return getIcon(vending, 20, 35, multiplier);
    case "posterIcon":
      return getIcon(poster, 25, 35, multiplier);
    case "consumableIcon":
      return getIcon(consumable, 25, 25, multiplier);
    case "soccerIcon":
      return getIcon(soccer, 25, 25, multiplier);
    default:
      return getIcon(challenge, 35, 35, multiplier);
  }
}
export const getIcon = (type, x, y, multiplier) => {
  return L.icon({
    iconUrl: [type],
    iconSize: [multiplier * x, multiplier * y] // size of the icon
  });
};

export const iconArray = [
  "challengeIcon",
  "searchIcon",
  "treasureIcon",
  "xIcon",
  "skullIcon",
  "cameraIcon",
  "hoprockIcon",
  "lettersIcon",
  "duckIcon",
  "discoIcon",
  "vendingIcon",
  "posterIcon",
  "soccerIcon",
  "consumableIcon"
];
