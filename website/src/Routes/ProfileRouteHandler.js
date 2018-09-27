import React from "react";
import "./../App.css";
import Profile from "./../Profile";
//node modules
import { withRouter } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

const ProfileRouteHandler = props => {
  const user = netlifyIdentity.currentUser();
  if (!user) {
    props.history.push(`/`);
  }
  return <Profile />;
};

export default withRouter(ProfileRouteHandler);
