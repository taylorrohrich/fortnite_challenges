import L from "leaflet";
import {
  challengeIcon,
  searchIcon,
  skullIcon,
  xIcon,
  treasureIcon,
  cameraIcon,
  hoprockIcon,
  lettersIcon,
  duckIcon,
  discoIcon,
  vendingIcon,
  posterIcon
} from "./icons.js";
import youtube from "./images/youtube.png";

function getMarker(coordinate, length, icon, description) {
  const popup = L.popup({ keepInView: true }).setContent(
    coordinate.url
      ? "<img" +
        " style='height:auto;width:100%'" +
        " src=" +
        coordinate.url +
        " />" +
        "<b>" +
        description +
        "</b>" +
        "<br/>" +
        (coordinate.credit
          ? "credit: " +
            (coordinate.refLink
              ? "<a href=" +
                coordinate.refLink +
                " target='_blank' ><img src=" +
                youtube +
                " style='height:auto;width:15px;margin-left:5px;margin-right:5px'" +
                " /></a>"
              : "") +
            coordinate.credit
          : "")
      : description
  );
  return L.marker([coordinate.x * length, coordinate.y * length], {
    icon: decideIcon(icon)
  }).bindPopup(popup);
}
export function populateMap(data, length, group) {
  if (data) {
    data.forEach(chal => {
      if (chal.coord.length) {
        const coordinates = chal.coord;
        coordinates.forEach(coordinate => {
          const marker = getMarker(
            coordinate,
            length,
            chal.icon,
            chal.description
          );
          group.addLayer(marker);
        });
      }
    });
  }
}

export function decideIcon(icon) {
  switch (icon) {
    case "challengeIcon":
      return challengeIcon;
    case "xIcon":
      return xIcon;
    case "searchIcon":
      return searchIcon;
    case "treasureIcon":
      return treasureIcon;
    case "skullIcon":
      return skullIcon;
    case "cameraIcon":
      return cameraIcon;
    case "lettersIcon":
      return lettersIcon;
    case "hoprockIcon":
      return hoprockIcon;
    case "duckIcon":
      return duckIcon;
    case "discoIcon":
      return discoIcon;
    case "vendingIcon":
      return vendingIcon;
    case "posterIcon":
      return posterIcon;
    default:
      return challengeIcon;
  }
}

export function handleLocalStorage(season) {
  if (!localStorage.getItem("season" + season.number)) {
    const currentWeek = season.weeks.reduce((accum, curVal) => {
      if (curVal.number > accum) accum = curVal.number;
      return accum;
    }, 0);
    let seasonJSON = {};
    for (let j = 1; j <= 10; j++) {
      let defaultOpen = j === currentWeek;
      seasonJSON["week" + [j]] = {
        all: defaultOpen,
        c1: defaultOpen,
        c2: defaultOpen,
        c3: defaultOpen,
        c4: defaultOpen,
        c5: defaultOpen,
        c6: defaultOpen,
        c7: defaultOpen,
        c8: defaultOpen
      };
    }
    localStorage.setItem("season" + season.number, JSON.stringify(seasonJSON));
    return seasonJSON;
  } else {
    let seasonStorage = localStorage.getItem("season" + season.number);
    seasonStorage = JSON.parse(seasonStorage);
    return seasonStorage;
  }
}

export function processData(data, seasonStorage) {
  if (!data || !data.weeks) {
    return;
  }
  data = data.weeks;
  const refinedData = seasonStorage
    ? data.reduce((accum, curVal) => {
        const challenges = curVal.challenges;
        challenges.forEach(challenge => {
          if (seasonStorage["week" + curVal.number]["c" + challenge.number])
            accum.push(challenge);
        });
        return accum;
      }, [])
    : [];
  return refinedData;
}
