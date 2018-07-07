import React from "react";
import { x } from "./../Images";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import { SeasonNumberQuery } from "../Database/Season";
import { graphql, compose } from "react-apollo";

class HamburgerMenu extends React.Component {
  handleClickOutside = e => {
    this.props.toggleMenu();
  };
  mapSeasonNumbers = seasonNumberQuery => {
    if (seasonNumberQuery.loading) {
      return <div />;
    }
    const seasonNumberArray = seasonNumberQuery.allSeasons;
    return seasonNumberArray.map(season => (
      <div
        key={"season" + season.number}
        onClick={() => {
          this.props.history.push(`/season/${season.number}`);
          this.props.toggleMenu();
        }}
        className="menuItem"
      >
        Season {season.number}
      </div>
    ));
  };
  render() {
    return (
      <div className="hamburgerMenu">
        <div
          style={{
            backgroundColor: "rgb(47, 47, 48)",
            borderStyle: "solid",
            borderColor: "rgb(212, 212, 214)",
            borderWidth: "0px 0px 2px 0px"
          }}
        >
          <img
            onClick={() => this.props.toggleMenu()}
            style={{
              width: "73px",
              height: "73px",
              padding: "20px",
              cursor: "pointer"
            }}
            src={x}
            alt=""
          />
        </div>
        <div onClick={() => this.props.history.push("/")} className="menuItem">
          Home
        </div>
        <div onClick={() => this.props.toggleModal()} className="menuItem">
          Donate
        </div>
        {this.mapSeasonNumbers(this.props.seasonNumberQuery)}
      </div>
    );
  }
}

const HamburgerMenuWithQuery = compose(
  graphql(SeasonNumberQuery, {
    name: "seasonNumberQuery"
  })
)(withRouter(onClickOutside(HamburgerMenu)));

export default HamburgerMenuWithQuery;
