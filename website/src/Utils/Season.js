import { isEqual } from "lodash";
const updateLocalStorageFromData = (seasonJSON, season, currentWeek) => {
  const weeks = season.weeks;
  if (!weeks) {
    return seasonJSON;
  }
  const updatedSeasonJSON = weeks.reduce((acc, week) => {
    const weekNumber = week.number,
      localStorageWeek = acc.weeks.filter(
        lsWeek => lsWeek.number === week.number
      )[0],
      challenges = week.challenges,
      localStorageChallenges = localStorageWeek.challenges;
    challenges.forEach(challenge => {
      const localStorageChallenge = localStorageChallenges.filter(
        lsChallenge => lsChallenge.number === challenge.number
      )[0];
      localStorageChallenge.locations = challenge.locations.map(
        (item, index) => {
          return {
            isChecked:
              (localStorageChallenge.locations[index] &&
                localStorageChallenge.locations[index].isChecked) ||
              week.number === currentWeek
          };
        }
      );
    });
    return acc;
  }, seasonJSON);
  return updatedSeasonJSON;
};

export const getLocalStorage = season => {
  const currentWeek = season.weeks.reduce((acc, cur) => {
    if (cur.number > acc) acc = cur.number;
    return acc;
  }, 0);
  if (!localStorage.getItem("season" + season.number)) {
    const seasonJSON = {
      number: season.number,
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, index) => {
        const itemNumber = index + 1,
          defaultOpen = itemNumber === currentWeek;
        return {
          number,
          isChecked: defaultOpen,
          challenges: [1, 2, 3, 4, 5, 6, 7, 8].map(number => {
            return { number, isChecked: defaultOpen, locations: [] };
          })
        };
      })
    };
    const updatedSeasonJSON = updateLocalStorageFromData(
      seasonJSON,
      season,
      currentWeek
    );
    localStorage.setItem(
      "season" + season.number,
      JSON.stringify(updatedSeasonJSON)
    );
    return updatedSeasonJSON;
  } else {
    const seasonJSON = localStorage.getItem("season" + season.number),
      parsedSeasonJSON = JSON.parse(seasonJSON),
      updatedSeasonJSON = updateLocalStorageFromData(
        parsedSeasonJSON,
        season,
        currentWeek
      );
    if (!isEqual(parsedSeasonJSON, updatedSeasonJSON)) {
      localStorage.setItem(
        "season" + season.number,
        JSON.stringify(updatedSeasonJSON)
      );
    }
    return updatedSeasonJSON;
  }
};

export const processData = (season, seasonStorage) => {
  if (!season || !season.weeks) {
    return;
  }
  const weeks = season.weeks;
  return seasonStorage
    ? weeks.reduce((acc, week) => {
        const challenges = week.challenges,
          localStorageWeek = seasonStorage.weeks.filter(
            lsWeek => lsWeek.number === week.number
          )[0],
          selectedChallenges = challenges.reduce((acc, challenge) => {
            const locations = challenge.locations,
              localStorageLocations = localStorageWeek.challenges.filter(
                lschallenge => lschallenge.number === challenge.number
              )[0].locations,
              selectedLocations = localStorageLocations.reduce(
                (acc, item, index) => {
                  if (item.isChecked) {
                    return acc.concat(locations[index]);
                  }
                  return acc;
                },
                []
              );
            return acc.concat(selectedLocations);
          }, []);

        return acc.concat(selectedChallenges);
      }, [])
    : [];
};

export const checkIfUpdatedWeek = (localStorage, weekNumber) => {
  const changedWeek = localStorage.weeks.filter(
      week => week.number === weekNumber
    )[0],
    challenges = changedWeek.challenges,
    isCheckedValue = challenges.reduce((acc, challenge) => {
      if (!challenge.isChecked) {
        acc = false;
      }
      return acc;
    }, true);
  changedWeek.isChecked = isCheckedValue;
};

export const checkIfUpdatedChallenge = (
  localStorage,
  weekNumber,
  challengeNumber
) => {
  const changedWeek = localStorage.weeks.filter(
      week => week.number === weekNumber
    )[0],
    changedChallenge = changedWeek.challenges.filter(
      challenge => challenge.number === challengeNumber
    )[0],
    locations = changedChallenge.locations,
    isCheckedValue = locations.reduce((acc, location) => {
      if (!location.isChecked) {
        acc = false;
      }
      return acc;
    }, true);
  if (changedChallenge.isChecked !== isCheckedValue) {
    changedChallenge.isChecked = isCheckedValue;
    checkIfUpdatedWeek(localStorage, weekNumber);
  }
};

export const toggleAll = (localStorage, value) => {
  if (localStorage.challenges) {
    const challenges = localStorage.challenges;
    challenges.forEach(challenge => toggleAll(challenge, value));
  }
  if (localStorage.locations) {
    const locations = localStorage.locations;
    locations.forEach(location => toggleAll(location, value));
  }
  localStorage.isChecked = value;
};
