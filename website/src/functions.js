import L from "leaflet";
import {
  challengeIcon,
  searchIcon,
  skullIcon,
  xIcon,
  treasureIcon,
  cameraIcon,
  hoprockIcon,
  lettersIcon
} from "./icons.js";

export function getInitialBrowserHeight() {
  let width = window.innerWidth;
  let res = 320;
  if (width > 320) {
    res = width;
  }
  if (width > 480) {
    res = width;
  }
  if (width > 768) {
    res = width;
  }
  if (width > 992) {
    res = 790;
  }
  if (width > 1200) {
    res = 900;
  }

  return res;
}
export function populateMap(data, length, group) {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let chal = data[i];
      if (chal.coord.length) {
        let coords = chal.coord;

        for (let j = 0; j < coords.length; j++) {
          let m = L.marker([coords[j].x * length, coords[j].y * length], {
            // Make the icon dragable
            icon: decideIcon(chal.icon)
          }).bindPopup(chal.description); // Adjust the opacity
          group.addLayer(m);
        }
      }
    }
  }
}

export function decideIcon(icon) {
  if (icon === "challengeIcon") {
    return challengeIcon;
  }
  if (icon === "xIcon") {
    return xIcon;
  }
  if (icon === "searchIcon") {
    return searchIcon;
  }
  if (icon === "treasureIcon") {
    return treasureIcon;
  }
  if (icon === "skullIcon") {
    return skullIcon;
  }
  if (icon === "cameraIcon") {
    return cameraIcon;
  }
  if (icon === "lettersIcon") {
    return lettersIcon;
  }
  if (icon === "hoprockIcon") {
    return hoprockIcon;
  }
}
export function handleLocalStorage(season) {
  if (!localStorage.getItem("season" + season.number)) {
    // localStorage.setItem("lastname", "Smith");
    let seasonJSON = {};
    for (let j = 1; j <= 10; j++) {
      seasonJSON["week" + [j]] = {
        all: true,
        c1: true,
        c2: true,
        c3: true,
        c4: true,
        c5: true,
        c6: true,
        c7: true,
        c8: true
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
  let refinedData = [];
  if (seasonStorage) {
    for (let i = 0; i < data.length; i++) {
      let challenges = data[i].challenges;
      for (let j = 0; j < challenges.length; j++) {
        if (
          seasonStorage["week" + data[i].number]["c" + challenges[j].number]
        ) {
          refinedData.push(challenges[j]);
        }
      }
    }
  }
  return refinedData;
}
