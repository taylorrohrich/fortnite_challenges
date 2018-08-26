import React from "react";
import "./../App.css";
import {
  checkIfUpdatedChallenge,
  checkIfUpdatedWeek,
  toggleAll
} from "../Utils";
import { Menu, Switch, Checkbox } from "antd";

const toggleCheck = (
  weekNumber,
  seasonNumber,
  challengeNumber,
  seasonLocalStorage,
  updateSeason,
  localStorageItem,
  coordItem
) => {
  const checkIfUpdated = coordItem
    ? checkIfUpdatedChallenge
    : checkIfUpdatedWeek;
  toggleAll(localStorageItem, !localStorageItem.isChecked);
  checkIfUpdated(seasonLocalStorage, weekNumber, challengeNumber);
  localStorage.setItem(
    "season" + seasonNumber,
    JSON.stringify(seasonLocalStorage)
  );
  updateSeason(seasonLocalStorage);
};

const ChallengeMenuItem = props => {
  const divProps = Object.assign({}, props),
    data = props.data,
    {
      challengeNumber,
      locationNumber,
      name,
      weekNumber,
      seasonNumber,
      localStorageWeek,
      localStorageChallenge,
      seasonLocalStorage,
      updateSeason,
      coordItem
    } = data,
    Toggle = coordItem ? Checkbox : Switch;
  delete divProps.data;
  const localStorageItem = coordItem
    ? localStorageChallenge.locations[locationNumber]
    : localStorageWeek.challenges.filter(
        challenge => challenge.number === challengeNumber
      )[0];
  return (
    <Menu.Item
      style={{ fontSize: ".8em" }}
      {...divProps}
      key={"week" + weekNumber + "challenge" + challengeNumber}
    >
      <Toggle
        checked={localStorageItem.isChecked}
        style={{ marginRight: "15px" }}
        onChange={() =>
          toggleCheck(
            weekNumber,
            seasonNumber,
            challengeNumber,
            seasonLocalStorage,
            updateSeason,
            localStorageItem,
            coordItem
          )
        }
      />
      {name}
    </Menu.Item>
  );
};

export default ChallengeMenuItem;
