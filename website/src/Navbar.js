import React, { Component } from "react";
import "./App.css";

//node modules
import { Layout, Menu } from "antd";
const { Header } = Layout;

class Navbar extends Component {
  mapSeasons = () => {
    let seasons = this.props.data;
    return seasons.map(season => {
      return (
        <Menu.Item
          style={{ paddingLeft: "1%", paddingRight: "1%" }}
          onClick={() => {
            this.props.updateSelectedSeason(season.number);
          }}
          key={season.number}
        >
          Season {season.number}
        </Menu.Item>
      );
    });
  };
  render() {
    if (this.props.loading) {
      return <div />;
    }
    if (!this.props.data) {
      return (
        <Header style={{ padding: "0px" }} className="header">
          <div className="logo">FortFriend</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item style={{ paddingLeft: "1%", paddingRight: "1%" }}>
              Loading...
            </Menu.Item>
          </Menu>
        </Header>
      );
    } else {
      return (
        <Header style={{ padding: "0px" }} className="header">
          <div className="logo">FortFriend</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            style={{ lineHeight: "64px" }}
          >
            {this.mapSeasons()}
          </Menu>
        </Header>
      );
    }
  }
}

export default Navbar;
