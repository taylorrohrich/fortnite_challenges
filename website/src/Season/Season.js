import React, { Component } from "react";
import "./../App.css";
import Map from "../Season/Map";
import Navbar from "./../Navbar";
import Sidebar from "./../Sidebar";
import { handleLocalStorage, processData } from "../Utils/functions";
import { github, reddit } from "./../Images";
import Promote from "../Season/Promote";
//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import { seasonQuery } from "./../Database";
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

class Season extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: null,
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
    const seasonQuery = nextProps.seasonQuery;
    if (seasonQuery && seasonQuery.allSeasons) {
      const selectedSeason = seasonQuery.allSeasons;
      if (!selectedSeason.length) {
        nextProps.history.push(`/error`);
      } else {
        return {
          season: selectedSeason[0],
          localStorage: handleLocalStorage(selectedSeason[0])
        };
      }
    } else {
      return {};
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar />

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
              data={this.state.season}
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
                  updateModerator={this.props.updateModerator}
                  mapLength={width}
                  updateHeight={this.updateHeight}
                  data={processData(this.state.season, this.state.localStorage)}
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
const SeasonWithQuery = compose(
  graphql(seasonQuery, {
    name: "seasonQuery",
    skip: props => !props.number,
    options: props => ({
      variables: {
        number: props.number
      }
    })
  })
)(withRouter(Season));

export default SeasonWithQuery;
