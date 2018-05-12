import React, { Component } from "react";
import "./App.css";
import { getInitialBrowserHeight } from "./functions.js";
//node modules
import { Layout, Menu, Checkbox } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compWidth: window.innerWidth - getInitialBrowserHeight()
    };
  }
  updateWidth = length => {
    this.setState({ compWidth: window.innerWidth - getInitialBrowserHeight() });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }
  toggleCheck = (week, challenge, season) => {
    if (challenge === "all") {
      for (let i = 1; i <= 7; i++) {
        season[week]["c" + i] = !season[week][challenge];
      }
    }
    season[week][challenge] = !season[week][challenge];
    localStorage.setItem(
      "season" + this.props.data.number,
      JSON.stringify(season)
    );
    this.props.updateSeason(season);
  };
  mapWeeks = (data, season) => {
    data = data.weeks;
    let menu = [];
    for (let i = 0; i < 9; i++) {
      if (!data[i]) {
        menu.push(
          <SubMenu
            disabled
            key={"week" + (i + 1)}
            title={<span>Week {i + 1} (TBD)</span>}
          />
        );
      } else {
        let challenges = data[i].challenges.map(challenge => {
          return (
            <Menu.Item key={"week" + +"challenge" + challenge.number}>
              <Checkbox
                disabled={!challenge.coord.length}
                checked={
                  season["week" + data[i].number]["c" + challenge.number]
                    ? true
                    : false
                }
                defaultChecked={true}
                style={{ padding: "5px" }}
                onChange={() =>
                  this.toggleCheck(
                    "week" + data[i].number,
                    "c" + challenge.number,
                    season
                  )
                }
              />
              {challenge.description}
            </Menu.Item>
          );
        });
        menu.push(
          <SubMenu
            key={"week" + data[i].number}
            title={<span>Week {data[i].number} </span>}
          >
            <Menu.Item key={"week" + data[i].number + "all"}>
              <Checkbox
                checked={season["week" + data[i].number]["all"] ? true : false}
                defaultChecked={true}
                style={{ padding: "5px" }}
                onChange={() =>
                  this.toggleCheck("week" + data[i].number, "all", season)
                }
              />
              Check all
            </Menu.Item>
            {challenges}
          </SubMenu>
        );
      }
    }
    return menu;
  };

  render() {
    if (this.props.loading) {
      return <div />;
    }
    return (
      <Sider
        width={
          this.state.compWidth ? this.state.compWidth : window.innerWidth / 4
        }
        style={{ background: "#fff" }}
      >
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          {this.props.data && this.props.data.weeks ? (
            this.mapWeeks(this.props.data, this.props.localStorage)
          ) : (
            <SubMenu
              key={"error"}
              title={<span>Having Trouble Loading Data :/</span>}
            />
          )}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
