import React from "react";
import "./../App.css";
import {
  checkIfUpdatedWeek,
  checkIfUpdatedChallenge
} from "../Utils/functions";
import { Menu, Switch, Checkbox } from "antd";

const toggleCheck = (
  weekNumber,
  seasonNumber,
  challengeNumber,
  seasonLocalStorage,
  coordItem,
  coordinates,
  updateSeason
) => {
  const weekLocalStorage = seasonLocalStorage["week" + weekNumber],
    updatedWeek = {
      ...weekLocalStorage,
      ["c" + challengeNumber]: {
        ...weekLocalStorage["c" + challengeNumber],
        [coordItem ? "coord" + coordinates.number : "all"]: !weekLocalStorage[
          "c" + challengeNumber
        ][coordItem ? "coord" + coordinates.number : "all"]
      }
    },
    checkIfUpdated = coordItem ? checkIfUpdatedChallenge : checkIfUpdatedWeek,
    updatedLocalStorage = checkIfUpdated(
      {
        ...seasonLocalStorage,
        ["week" + weekNumber]: updatedWeek
      },
      "week" + weekNumber,
      "c" + challengeNumber
    );
  localStorage.setItem(
    "season" + seasonNumber,
    JSON.stringify(updatedLocalStorage)
  );
  updateSeason(updatedLocalStorage);
};

const ChallengeMenuItem = props => {
  const divProps = Object.assign({}, props),
    data = props.data,
    {
      number,
      coord,
      description,
      weekNumber,
      seasonNumber,
      seasonLocalStorage,
      updateSeason,
      coordItem
    } = data,
    Toggle = coordItem ? Checkbox : Switch;
  delete divProps.data;
  return (
    <Menu.Item
      {...divProps}
      style={{ fontsize: "1em" }}
      key={"week" + weekNumber + "challenge" + number}
    >
      <Toggle
        checked={
          coordItem
            ? seasonLocalStorage["week" + weekNumber]["c" + number][
                "coord" + coord.number
              ]
            : seasonLocalStorage["week" + weekNumber]["c" + number].all
        }
        defaultChecked={true}
        style={{ marginRight: "15px" }}
        onChange={() =>
          toggleCheck(
            weekNumber,
            seasonNumber,
            number,
            seasonLocalStorage,
            coordItem,
            coord,
            updateSeason
          )
        }
      />
      {description}
    </Menu.Item>
  );
};

export default ChallengeMenuItem;
