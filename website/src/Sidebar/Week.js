import React from "react";
import "./../App.css";
import ChallengeMenuItem from "./ChallengeMenuItem";
import MultiCoordChallenge from "./MultiCoordChallenge";
import { Menu, Switch } from "antd";
import { toggleAll } from "./../functions.js";
const { SubMenu } = Menu;

const mapChallenges = (
  challenges,
  weekNumber,
  seasonNumber,
  seasonLocalStorage,
  updateSeason
) => {
  return challenges.map(challenge => {
    const RenderChallenge =
      challenge.coord.length < 2 ? ChallengeMenuItem : MultiCoordChallenge;
    return (
      <RenderChallenge
        key={"week" + weekNumber + "challenge" + challenge.number}
        data={{
          ...challenge,
          weekNumber: weekNumber,
          seasonNumber: seasonNumber,
          seasonLocalStorage: seasonLocalStorage,
          updateSeason: updateSeason
        }}
      />
    );
  });
};
const toggleCheckAll = (
  weekNumber,
  seasonNumber,
  seasonLocalStorage,
  updateSeason
) => {
  const weekLocalStorage = seasonLocalStorage["week" + weekNumber],
    updatedWeek = toggleAll(weekLocalStorage, !weekLocalStorage.all),
    updatedLocalStorage = {
      ...seasonLocalStorage,
      ["week" + weekNumber]: updatedWeek
    };
  localStorage.setItem(
    "season" + seasonNumber,
    JSON.stringify(updatedLocalStorage)
  );
  updateSeason(updatedLocalStorage);
};

const Week = props => {
  const divProps = Object.assign({}, props),
    data = props.data,
    {
      loading,
      unReleased,
      weekNumber,
      challenges,
      seasonNumber,
      seasonLocalStorage,
      updateSeason
    } = data;
  delete divProps.data;
  if (unReleased || loading) {
    const text = loading ? "Loading..." : "Week " + weekNumber + " TBD";
    return (
      <SubMenu
        style={{ fontsize: "1em" }}
        {...divProps}
        disabled
        title={
          <span>
            <Switch disabled style={{ marginRight: "15px" }} />
            {text}
          </span>
        }
      />
    );
  }
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
                seasonLocalStorage["week" + data.weekNumber].all ? true : false
              }
              defaultChecked={true}
              style={{ marginRight: "15px" }}
              onChange={() =>
                toggleCheckAll(
                  weekNumber,
                  seasonNumber,
                  seasonLocalStorage,
                  updateSeason
                )
              }
            />
          </span>
          Week {weekNumber}
        </span>
      }
    >
      {mapChallenges(
        challenges,
        weekNumber,
        seasonNumber,
        seasonLocalStorage,
        updateSeason
      )}
    </SubMenu>
  );
};

export default Week;
