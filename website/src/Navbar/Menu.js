import React from "react";
import { x } from "./../Images";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import netlifyIdentity from "netlify-identity-widget";

class HamburgerMenu extends React.Component {
  handleClickOutside = e => {
    this.props.toggleMenu();
  };
  mapSeasonNumbers = seasonList => {
    if (seasonList) {
      return seasonList.map(season => (
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
    }
  };
  render() {
    const seasonList = this.props.seasonList;
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
        <div
          onClick={() => this.props.history.push("/news")}
          className="menuItem"
        >
          News
        </div>
        <div onClick={() => this.props.toggleModal()} className="menuItem">
          Donate
        </div>
        <div
          onClick={() =>
            this.props.history.push(
              `/authentication/${
                netlifyIdentity.currentUser() ? "logout" : "login"
              }`
            )
          }
          className="menuItem"
        >
          {netlifyIdentity.currentUser() ? "Logout" : "Login"}
        </div>
        {this.mapSeasonNumbers(seasonList)}
      </div>
    );
  }
}

export default withRouter(onClickOutside(HamburgerMenu));
