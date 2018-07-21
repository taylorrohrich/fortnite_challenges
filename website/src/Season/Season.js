import React, { Component } from "react";
import "./../App.css";
import Navbar from "./../Navbar";
import Footer from "./Footer";
import SidebarMapContainer from "./SidebarMapContainer";
import Promote from "../Season/Promote";
import DisqusThread from "../Disqus";
//node modules
import ReactGA from "react-ga";
import { withRouter } from "react-router-dom";

const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

class Season extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(googleAnalyticsId);
    ReactGA.pageview(props.location.pathname || window.location.pathname);
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <SidebarMapContainer number={this.props.number} />
        <Promote />
        <div className="disqusContainer">
          {this.props.number && (
            <DisqusThread
              title={"Season" + this.props.number}
              path={this.props.location.pathname}
              id={this.props.location.pathname}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Season);
