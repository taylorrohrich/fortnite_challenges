import { isEqual } from "lodash";
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

export const handleLocalStorage = season => {
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
    const seasonJSON = localStorage.getItem("season" + season.number),
      parsedSeasonJSON = JSON.parse(seasonJSON),
      updatedSeasonJSON = updateLocalStorageFromData(parsedSeasonJSON, season);
    if (!isEqual(parsedSeasonJSON, updatedSeasonJSON)) {
      localStorage.setItem(
        "season" + season.number,
        JSON.stringify(updatedSeasonJSON)
      );
    }
    return updatedSeasonJSON;
  }
};

export const processData = (data, seasonStorage) => {
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
};

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
