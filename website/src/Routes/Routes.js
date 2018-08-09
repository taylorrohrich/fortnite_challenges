import React from "react";
import SeasonRouteHandler from "./SeasonRouteHandler";
import Moderator from "./../Moderator/Moderator";
import Error from "./Error";
import News from "./../News";
//node modules
import { Route, Redirect, Switch } from "react-router-dom";

const Routes = props => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect exact from="/" to="/season/" />}
      />
      <Route exact path="/season/:number?" component={SeasonRouteHandler} />
      <Route exact path="/moderator" component={Moderator} />
      <Route exact path="/news" component={News} />
      <Route component={Error} />
    </Switch>
  );
};

export default Routes;
