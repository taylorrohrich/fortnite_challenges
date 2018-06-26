import React, { Component } from "react";
import "./App.css";
import Map from "./Map.js";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar/Sidebar.js";
import { handleLocalStorage, processData } from "./functions.js";
import github from "./images/github.png";
import reddit from "./images/reddit.png";
import Promote from "./Promote.js";
//node modules
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import { seasonQuery } from "./Database.js";
import ReactGA from "react-ga";
import ContainerDimensions from "react-container-dimensions";

const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

(function() {
  var d = document,
    s = d.createElement("script");
  s.src = "https://fort-friend.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
})();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeason: 4,
      seasons: null,
      localStorage: {},
      height: null
    };
    ReactGA.initialize(googleAnalyticsId);
    ReactGA.pageview(window.location.pathname);
  }

  updateSeason = season => {
    this.setState({ localStorage: season });
  };

  updateHeight = height => {
    this.setState({ height: height });
  };

  updateSelectedSeason = number => {
    this.setState({ selectedSeason: number });
  };

  grabSelectedSeason = number => {
    if (this.state.seasons) {
      return this.state.seasons.find(element => {
        return element.number === number;
      });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.allSeasonQuery &&
      nextProps.allSeasonQuery.allSeasons &&
      !prevState.seasons &&
      prevState.selectedSeason
    ) {
      return {
        seasons: nextProps.allSeasonQuery.allSeasons,
        localStorage: handleLocalStorage(
          nextProps.allSeasonQuery.allSeasons.find(element => {
            return element.number === prevState.selectedSeason;
          })
        )
      };
    } else {
      return {};
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar
          updateSelectedSeason={this.updateSelectedSeason}
          data={this.props.allSeasonQuery.allSeasons}
        />

        <Row type="flex">
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 24, order: 2 }}
            lg={{ span: 10, order: 1 }}
            xl={{ span: 10, order: 1 }}
            xxl={{ span: 8, order: 1 }}
          >
            <Sidebar
              sidebarHeight={this.state.height}
              updateSeason={this.updateSeason}
              data={this.grabSelectedSeason(this.state.selectedSeason)}
              localStorage={this.state.localStorage}
            />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 24, order: 1 }}
            lg={{ span: 14, order: 2 }}
            xl={{ span: 14, order: 2 }}
            xxl={{ span: 16, order: 2 }}
          >
            <ContainerDimensions>
              {({ width }) => (
                <Map
                  mapLength={width}
                  updateHeight={this.updateHeight}
                  data={processData(
                    this.grabSelectedSeason(this.state.selectedSeason),
                    this.state.localStorage
                  )}
                />
              )}
            </ContainerDimensions>
          </Col>
        </Row>
        <Promote />
        <div className="disqusContainer">
          <div id="disqus_thread" />
        </div>
        <Row>
          <div className="footer">
            <a href="https://github.com/20rohrichtt/fortnite_challenges">
              <img
                className="socialMediaIcon"
                src={github}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <a href="https://www.reddit.com/user/tmant1234/">
              <img
                className="socialMediaIcon"
                src={reddit}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <div className="footerText">
              Contact Me: taylorrohrich@fort-friend.com
            </div>
          </div>
          <div className="disclaimer">
            <hr className="separator" />
            <div className="disclaimerText">
              Portions of the materials used are trademarks and/or copyrighted
              works of Epic Games, Inc. All rights reserved by Epic. This
              material is not official and is not endorsed by Epic.
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="https://www.flaticon.com/authors/pixel-perfect"
              >
                {" "}
                Social Media Icons designed by pixel-perfect from Flaticon
              </a>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

const AppWithQuery = graphql(seasonQuery, {
  name: "allSeasonQuery"
})(withRouter(App));

export default AppWithQuery;
