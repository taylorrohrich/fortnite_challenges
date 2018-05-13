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
          style={{ marginLeft: "5%" }}
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
    return (
      <Header style={{ padding: "0px" }} className="header">
        <div className="logo">
          <h1>FortFriend</h1>
        </div>
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

export default Navbar;
