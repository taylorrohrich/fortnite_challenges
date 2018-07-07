import React from "react";
import "./../App.css";
import Season from "./Season";
import { activeSeasonNumberQuery } from "./../Database";
//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

const SeasonRouteHandler = props => {
  const seasonNumber = props.match.params.number;
  if (seasonNumber && !Number(seasonNumber)) {
    props.history.push(`/error`);
  }
  if (!seasonNumber && !props.activeSeasonNumberQuery.loading) {
    const activeSeasonNumber =
      props.activeSeasonNumberQuery.allSeasons[0].number;
    props.history.push(`/season/${activeSeasonNumber}`);
  }
  return <Season number={Number(seasonNumber)} />;
};
const SeasonRouteHandlerWithQuery = compose(
  graphql(activeSeasonNumberQuery, {
    name: "activeSeasonNumberQuery"
  })
)(withRouter(SeasonRouteHandler));

export default SeasonRouteHandlerWithQuery;
