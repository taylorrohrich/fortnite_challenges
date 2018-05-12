import React, { Component } from "react";
import "./App.css";
import Map from "./Map.js";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import { handleLocalStorage, processData } from "./functions.js";

//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import { seasonQuery, createChallenge } from "./Database.js";
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeason: 4,
      seasons: null,
      localStorage: {}
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

  updateSeason = season => {
    this.setState({ localStorage: season });
  };

  updateSelectedSeason = number => {
    this.setState({ selectedSeason: number });
  };

  grabSelectedSeason = number => {
    return this.state.seasons.find(element => {
      return element.number === number;
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.allSeasonQuery && nextProps.allSeasonQuery.allSeasons) {
      return {
        seasons: nextProps.allSeasonQuery.allSeasons,
        localStorage: handleLocalStorage(() => {
          return prevState.seasons.find(element => {
            return element.number === prevState.selectedSeason;
          });
        })
      };
    } else {
      return {};
    }
  }
  render() {
    if (
      this.props.loading ||
      !this.props.allSeasonQuery ||
      this.props.allSeasonQuery.loading
    ) {
      return <div />;
    } else {
      return (
        <div className="App">
          <Layout style={{ height: "100vh" }}>
            <Navbar
              updateSelectedSeason={this.updateSelectedSeason}
              data={this.props.allSeasonQuery.allSeasons}
            />

            <Layout>
              <Sidebar
                updateSeason={this.updateSeason}
                data={this.grabSelectedSeason(this.state.selectedSeason)}
                localStorage={this.state.localStorage}
              />
              <Content>
                <Map
                  data={processData(
                    this.grabSelectedSeason(this.state.selectedSeason),
                    this.state.localStorage
                  )}
                />
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }
  }
}

export default compose(
  graphql(seasonQuery, {
    name: "allSeasonQuery"
  }),
  graphql(createChallenge, { name: "createChallenge" })
)(withRouter(App));
