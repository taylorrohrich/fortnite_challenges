import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Map from "./Map.js";
import { ApolloProvider, graphql, compose } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

class App extends Component {
  createProject = () => {
    const variables = {
      weekId: "cjgyc7naa0wnw0186tm8jujuy",
      description: "Hello",
      coord: [{ x: 0.5, y: 0.6 }],
      icon: "challengeIcon"
    };

    this.props.createChallenge({ variables });
  };
  processData = data => {
    let refinedData = [];
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
      let challenges = data[i].challenges;
      for (let j = 0; j < challenges.length; j++) {
        refinedData.push(challenges[j]);
      }
    }
    return refinedData;
  };
  render() {
    if (this.props.loading || !this.props.allSeasonQuery.allWeeks) {
      return <div />;
    } else {
      return (
        <div className="App">
          {console.log(this.props)}
          <button
            onClick={() => {
              this.createProject();
            }}
          />

          <Map data={this.processData(this.props.allSeasonQuery.allWeeks)} />
        </div>
      );
    }
  }
}

const ALL_SEASON_QUERY = gql`
  query AllSeasonQuery {
    allWeeks(filter: { season: { id: "cjgyc5cel0uo7018848mcg74x" } }) {
      number
      challenges {
        icon
        description
        coord
      }
    }
  }
`;

const createChallenge = gql`
  mutation(
    $weekId: ID!
    $description: String!
    $coord: [Json!]!
    $icon: String!
  ) {
    createChallenge(
      weekId: $weekId
      description: $description
      coord: $coord
      icon: $icon
    ) {
      id
    }
  }
`;
export default compose(
  graphql(ALL_SEASON_QUERY, {
    name: "allSeasonQuery",
    options: {
      fetchPolicy: "network-only"
    }
  }),
  graphql(createChallenge, { name: "createChallenge" })
)(withRouter(App));
