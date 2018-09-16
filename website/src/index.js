import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
//node modules
import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

// You must run this once before trying to interact with the widget
netlifyIdentity.init();
ReactDOM.render(
  <Router>
    <Routes />
  </Router>,

  document.getElementById("root")
);

// registerServiceWorker();
unregister();
