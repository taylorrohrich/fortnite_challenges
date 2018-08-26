import React from "react";
import "./../App.css";
import ChallengeMenuItem from "./ChallengeMenuItem";
import { toggleAll, checkIfUpdatedWeek } from "../Utils";
import { Menu, Switch } from "antd";
const { SubMenu } = Menu;

const toggleCheckAll = (
  weekNumber,
  seasonNumber,
  seasonLocalStorage,
  updateSeason,
  localStorageChallenge
) => {
  toggleAll(localStorageChallenge, !localStorageChallenge.isChecked);
  checkIfUpdatedWeek(seasonLocalStorage, weekNumber);
  localStorage.setItem(
    "season" + seasonNumber,
    JSON.stringify(seasonLocalStorage)
  );
  updateSeason(seasonLocalStorage);
};

const mapCoordinates = (
  locations,
  weekNumber,
  seasonNumber,
  localStorageChallenge,
  challengeNumber,
  updateSeason,
  seasonLocalStorage
) => {
  return locations.map((coordinate, index) => (
    <ChallengeMenuItem
      key={
        "week" + weekNumber + "challenge" + challengeNumber + "coord" + index
      }
      data={{
        locationNumber: index,
        name: coordinate.LocationDescription,
        challengeNumber,
        weekNumber,
        seasonNumber,
        localStorageChallenge,
        seasonLocalStorage,
        updateSeason: updateSeason,
        coordItem: true
      }}
    />
  ));
};

const MultiCoordChallenge = props => {
  const divProps = Object.assign({}, props),
    data = props.data,
    {
      challengeNumber,
      locations,
      name,
      isHard,
      weekNumber,
      seasonNumber,
      localStorageWeek,
      seasonLocalStorage,
      updateSeason
    } = data;
  const localStorageChallenge = localStorageWeek.challenges.filter(
    challenge => challenge.number === challengeNumber
  )[0];
  delete divProps.data;
  return (
    <SubMenu
      style={{ fontSize: ".8em" }}
      {...divProps}
      title={
        <span style={{ fontSize: ".8em" }}>
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Switch
              checked={localStorageChallenge.isChecked}
              defaultChecked={true}
              style={{ marginRight: "15px" }}
              onChange={() =>
                toggleCheckAll(
                  weekNumber,
                  seasonNumber,
                  seasonLocalStorage,
                  updateSeason,
                  localStorageChallenge
                )
              }
            />
          </span>
          {name}
        </span>
      }
    >
      {mapCoordinates(
        locations,
        weekNumber,
        seasonNumber,
        localStorageChallenge,
        challengeNumber,
        updateSeason,
        seasonLocalStorage
      )}
    </SubMenu>
  );
};

export default MultiCoordChallenge;
