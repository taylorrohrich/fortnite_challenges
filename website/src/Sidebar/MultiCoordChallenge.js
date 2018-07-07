import React from "react";
import "./../App.css";
import ChallengeMenuItem from "./ChallengeMenuItem";
import { toggleAll, checkIfUpdatedWeek } from "../Utils/functions";
import { Menu, Switch } from "antd";
const { SubMenu } = Menu;

const toggleCheckAll = (
  weekNumber,
  seasonNumber,
  seasonLocalStorage,
  challengeNumber,
  updateSeason
) => {
  const weekLocalStorage = seasonLocalStorage["week" + weekNumber],
    updatedChallenge = toggleAll(
      weekLocalStorage["c" + challengeNumber],
      !weekLocalStorage["c" + challengeNumber].all
    ),
    updatedLocalStorage = checkIfUpdatedWeek(
      {
        ...seasonLocalStorage,
        ["week" + weekNumber]: {
          ...weekLocalStorage,
          ["c" + challengeNumber]: updatedChallenge
        }
      },
      "week" + weekNumber
    );
  localStorage.setItem(
    "season" + seasonNumber,
    JSON.stringify(updatedLocalStorage)
  );
  updateSeason(updatedLocalStorage);
};

const mapCoordinates = (
  coordinates,
  weekNumber,
  seasonNumber,
  seasonLocalStorage,
  challengeNumber,
  description,
  updateSeason
) => {
  return coordinates.map((coordinate, index) => (
    <ChallengeMenuItem
      key={
        "week" + weekNumber + "challenge" + challengeNumber + "coord" + index
      }
      data={{
        coord: { ...coordinate, number: index },
        description:
          coordinate.locationDescription || description + ": " + (index + 1),
        number: challengeNumber,
        weekNumber: weekNumber,
        seasonNumber: seasonNumber,
        seasonLocalStorage: seasonLocalStorage,
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
      number,
      coord,
      description,
      weekNumber,
      seasonNumber,
      seasonLocalStorage,
      updateSeason
    } = data;
  delete divProps.data;
  return (
    <SubMenu
      style={{ fontsize: "1em" }}
      {...divProps}
      title={
        <span>
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Switch
              checked={
                seasonLocalStorage["week" + weekNumber]["c" + number].all
                  ? true
                  : false
              }
              defaultChecked={true}
              style={{ marginRight: "15px" }}
              onChange={() =>
                toggleCheckAll(
                  weekNumber,
                  seasonNumber,
                  seasonLocalStorage,
                  number,
                  updateSeason
                )
              }
            />
          </span>
          {description}
        </span>
      }
    >
      {mapCoordinates(
        coord,
        weekNumber,
        seasonNumber,
        seasonLocalStorage,
        number,
        description,
        updateSeason
      )}
    </SubMenu>
  );
};

export default MultiCoordChallenge;
