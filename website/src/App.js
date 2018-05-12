import React, { Component } from "react";
import "./App.css";
import Map from "./Map.js";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import {
  handleLocalStorage,
  processData,
  getInitialBrowserHeight
} from "./functions.js";

//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import { seasonQuery } from "./Database.js";
const { Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeason: 4,
      seasons: null,
      localStorage: {},
      compWidth: window.innerWidth
    };
  }

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
  updateWidth = length => {
    this.setState({
      compWidth: window.innerWidth
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

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
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
          <Layout>
            <Navbar
              updateSelectedSeason={this.updateSelectedSeason}
              data={this.props.allSeasonQuery.allSeasons}
            />
            {this.state.compWidth > 1200 ? (
              <Layout>
                <Sidebar
                  compWidth={this.state.compWidth - getInitialBrowserHeight()}
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
            ) : (
              <Layout>
                <Content>
                  <Map
                    data={processData(
                      this.grabSelectedSeason(this.state.selectedSeason),
                      this.state.localStorage
                    )}
                  />
                  <Sidebar
                    compWidth={this.state.compWidth}
                    updateSeason={this.updateSeason}
                    data={this.grabSelectedSeason(this.state.selectedSeason)}
                    localStorage={this.state.localStorage}
                  />
                </Content>
              </Layout>
            )}
            <Footer style={{ textAlign: "center", fontSize: "12px" }}>
              Taylor Rohrich | github: 20rohrichtt | Made with React.js
            </Footer>
          </Layout>
        </div>
      );
    }
  }
}

export default compose(
  graphql(seasonQuery, {
    name: "allSeasonQuery"
  })
)(withRouter(App));
