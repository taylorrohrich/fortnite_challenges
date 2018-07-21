import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
//node modules
import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
const graphcoolKey = process.env.REACT_APP_GRAPHCOOL_API_KEY;
const httpLink = new HttpLink({
  uri: graphcoolKey
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>,

  document.getElementById("root")
);
registerServiceWorker();
