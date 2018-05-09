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
import Navbar from "./Navbar.js";
import Button from "antd/lib/button";
import Sidebar from "./Sidebar.js";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: null
    };
  }
  createProject = () => {
    const variables = {
      weekId: "cjgyc7naa0wnw0186tm8jujuy",
      description: "Hello",
      coord: [{ x: 0.5, y: 0.6 }],
      icon: "challengeIcon"
    };

    this.props.createChallenge({ variables });
  };
  processData = (data, season) => {
    let number = data.number;
    data = data.weeks;
    let refinedData = [];
    let seasonStorage = season;
    console.log(season);
    if (seasonStorage) {
      for (let i = 0; i < data.length; i++) {
        let challenges = data[i].challenges;
        for (let j = 0; j < challenges.length; j++) {
          console.log(seasonStorage["week" + (i + 1)]);
          if (seasonStorage["week" + (i + 1)]["c" + challenges[j].number]) {
            refinedData.push(challenges[j]);
          }
        }
      }
    }
    return refinedData;
  };
  updateSeason = season => {
    this.setState({ season: season });
  };
  render() {
    if (
      this.props.loading ||
      !this.props.allSeasonQuery ||
      !this.props.allSeasonQuery.allSeasons
    ) {
      return <div />;
    } else {
      return (
        <div className="App">
          {console.log(this.props)}
          <Layout>
            <Navbar />
            <Layout>
              <Sidebar
                updateSeason={this.updateSeason}
                data={this.props.allSeasonQuery.allSeasons[0]}
              />
              <Layout style={{}}>
                <Content style={{ padding: "50px" }}>
                  <Map
                    data={this.processData(
                      this.props.allSeasonQuery.allSeasons[0],
                      this.state.season
                    )}
                  />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      );
    }
  }
}

const ALL_SEASON_QUERY = gql`
  query AllSeasonQuery {
    allSeasons {
      number
      weeks {
        number
        challenges {
          number
          icon
          description
          coord
        }
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
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(createChallenge, { name: "createChallenge" })
)(withRouter(App));
