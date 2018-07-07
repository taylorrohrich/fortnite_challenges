import L from "leaflet";
import { youtube, challenge } from "./../Images";

export const getIcon = icon => {
  const multiplier = window.innerWidth >= 576 ? 1 : 0.6;
  if (icon) {
    return L.icon({
      iconUrl: icon.imageUrl,
      iconSize: [multiplier * icon.width, multiplier * icon.height]
    });
  }
  return L.icon({
    iconUrl: challenge,
    iconSize: [multiplier * 35, multiplier * 35]
  });
};

function getMarker(coordinate, length, icon, description) {
  const popupWidth = window.innerWidth >= 576 ? 400 : 250;
  const popup = L.popup({ keepInView: true, maxWidth: popupWidth }).setContent(
    coordinate.url
      ? "<div style='width:100%;text-align:center'>" +
        "<img" +
        " style='width:" +
        popupWidth +
        "px;height:auto'" +
        " src=" +
        coordinate.url +
        " />" +
        "<b>" +
        description +
        "</b>" +
        "<br/>" +
        (coordinate.locationDescription
          ? "<i>" + coordinate.locationDescription + "</i>"
          : "") +
        (coordinate.credit
          ? (coordinate.refLink
              ? "<a href=" +
                coordinate.refLink +
                " target='_blank' ><img src=" +
                youtube +
                " style='height:auto;width:15px;margin-left:5px;margin-right:5px'" +
                " /></a>"
              : "") + coordinate.credit
          : "") +
        "</div>"
      : description
  );
  return L.marker([coordinate.x * length, coordinate.y * length], {
    icon: getIcon(icon)
  }).bindPopup(popup);
}
export function populateMap(data, length, group, icons) {
  if (data && icons) {
    const iconDictionary = icons.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: {
          width: item.width,
          height: item.height,
          imageUrl: item.imageUrl
        }
      };
    }, {});
    data.forEach(chal => {
      if (chal.coord.length) {
        const coordinates = chal.coord;
        coordinates.forEach(coordinate => {
          const marker = getMarker(
            coordinate,
            length,
            iconDictionary[chal.icon],
            chal.description
          );
          group.addLayer(marker);
        });
      }
    });
  }
}

const updateLocalStorageFromData = (seasonJSON, season) => {
  const updatedSeasonJSON = season.weeks.reduce((acc, week) => {
    const updatedWeek = week.challenges.reduce((acc, challenge) => {
      if (challenge.coord.length > 0) {
        const updatedChallenge = challenge.coord.reduce((acc, coord, index) => {
          if (acc["coord" + index] === undefined) {
            return { ...acc, ["coord" + index]: acc.all };
          }
          return acc;
        }, seasonJSON["week" + week.number]["c" + challenge.number]);
        return { ...acc, ["c" + challenge.number]: updatedChallenge };
      }
      return acc;
    }, seasonJSON["week" + week.number]);
    return { ...acc, ["week" + week.number]: updatedWeek };
  }, seasonJSON);
  return updatedSeasonJSON;
};

export function handleLocalStorage(season) {
  if (!localStorage.getItem("season" + season.number)) {
    const currentWeek = season.weeks.reduce((accum, curVal) => {
      if (curVal.number > accum) accum = curVal.number;
      return accum;
    }, 0);
    const seasonJSON = Array(10)
      .fill(0)
      .reduce((acc, item, index) => {
        const defaultOpen = index + 1 === currentWeek;
        return {
          ...acc,
          ["week" + (index + 1)]: {
            all: defaultOpen,
            c1: { all: defaultOpen },
            c2: { all: defaultOpen },
            c3: { all: defaultOpen },
            c4: { all: defaultOpen },
            c5: { all: defaultOpen },
            c6: { all: defaultOpen },
            c7: { all: defaultOpen },
            c8: { all: defaultOpen }
          }
        };
      }, {});
    const updatedSeasonJSON = updateLocalStorageFromData(seasonJSON, season);
    localStorage.setItem(
      "season" + season.number,
      JSON.stringify(updatedSeasonJSON)
    );
    return updatedSeasonJSON;
  } else {
    const seasonJSON = localStorage.getItem("season" + season.number);
    const updatedSeasonJSON = updateLocalStorageFromData(
      JSON.parse(seasonJSON),
      season
    );
    if (seasonJSON !== JSON.stringify(updatedSeasonJSON))
      localStorage.setItem(
        "season" + season.number,
        JSON.stringify(updatedSeasonJSON)
      );
    return updatedSeasonJSON;
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
        const selectedChallenges = challenges.reduce((acc, challenge) => {
          if (
            seasonStorage["week" + curVal.number]["c" + challenge.number].all
          ) {
            return acc.concat(challenge);
          }
          if (challenge.coord.length > 1) {
            return acc.concat({
              ...challenge,
              coord: challenge.coord.filter((coordinate, index) => {
                return seasonStorage["week" + curVal.number][
                  "c" + challenge.number
                ]["coord" + index];
              })
            });
          }
          return acc;
        }, []);
        return accum.concat(selectedChallenges);
      }, [])
    : [];
  return refinedData;
}

export const checkIfUpdatedWeek = (localStorage, weekNumber) => {
  const updatedWeek = localStorage[weekNumber];
  const allResult = Object.keys(updatedWeek).reduce((acc, key) => {
    if (key !== "all")
      if (acc && !updatedWeek[key].all) {
        return false;
      }
    return acc;
  }, true);
  const updatedLocalStorage = {
    ...localStorage,
    [weekNumber]: { ...updatedWeek, all: allResult }
  };
  return updatedLocalStorage;
};

export const checkIfUpdatedChallenge = (
  localStorage,
  weekNumber,
  challengeNumber
) => {
  const challenge = localStorage[weekNumber][challengeNumber];
  const allResult = Object.keys(challenge).reduce((acc, key) => {
    if (key !== "all")
      if (acc && !challenge[key]) {
        return false;
      }
    return acc;
  }, true);
  return checkIfUpdatedWeek(
    {
      ...localStorage,
      [weekNumber]: {
        ...localStorage[weekNumber],
        [challengeNumber]: {
          ...localStorage[weekNumber][challengeNumber],
          all: allResult
        }
      }
    },
    weekNumber
  );
};

export const toggleAll = (localStorage, value) => {
  return Object.keys(localStorage).reduce((acc, key) => {
    if (typeof localStorage[key] === "object")
      return { ...acc, [key]: toggleAll(localStorage[key], value) };
    return { ...acc, [key]: value };
  }, {});
};
