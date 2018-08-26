import React from "react";
import "./../App.css";
import Season from "./../Season";
//node modules
import { withRouter } from "react-router-dom";
import apiRequest from "./../Controllers";

const SeasonRouteHandler = props => {
  const seasonNumber = props.match.params.number;
  if (seasonNumber && !Number(seasonNumber)) {
    props.history.push(`/error`);
  } else if (!seasonNumber) {
    apiRequest({ name: "getSeasonActive" }).then(response => {
      const number = response.data && response.data[0].Number;
      props.history.push(number ? `/season/${number}` : `/error`);
    });
  }
  return <Season number={seasonNumber} />;
};

export default withRouter(SeasonRouteHandler);
