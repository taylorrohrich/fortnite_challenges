import React from "react";
import "./../App.css";
import ChallengeMenuItem from "./ChallengeMenuItem";
import MultiCoordChallenge from "./MultiCoordChallenge";
import { Menu, Switch } from "antd";
import { toggleAll } from "../Utils";
const { SubMenu } = Menu;

const mapChallenges = (
  challenges,
  weekNumber,
  seasonNumber,
  localStorageWeek,
  updateSeason,
  seasonLocalStorage
) => {
  return challenges.map(challenge => {
    const RenderChallenge =
      challenge.locations.length > 1 ? MultiCoordChallenge : ChallengeMenuItem;
    return (
      <RenderChallenge
        key={"week" + weekNumber + "challenge" + challenge.number}
        data={{
          isHard: challenge.isHard,
          challengeNumber: challenge.number,
          name: challenge.name,
          locations: challenge.locations,
          weekNumber,
          seasonNumber,
          localStorageWeek,
          updateSeason,
          seasonLocalStorage
        }}
      />
    );
  });
};
const toggleCheckAll = (
  seasonNumber,
  localStorageWeek,
  updateSeason,
  seasonLocalStorage
) => {
  toggleAll(localStorageWeek, !localStorageWeek.isChecked);
  localStorage.setItem(
    "season" + seasonNumber,
    JSON.stringify(seasonLocalStorage)
  );
  updateSeason(seasonLocalStorage);
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
  const localStorageWeek = seasonLocalStorage.weeks.filter(
    week => week.number === weekNumber
  )[0];
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
              checked={localStorageWeek.isChecked}
              defaultChecked={true}
              style={{ marginRight: "15px" }}
              onChange={() =>
                toggleCheckAll(
                  seasonNumber,
                  localStorageWeek,
                  updateSeason,
                  seasonLocalStorage
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
        localStorageWeek,
        updateSeason,
        seasonLocalStorage
      )}
    </SubMenu>
  );
};

export default Week;
