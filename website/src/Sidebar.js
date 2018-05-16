import React, { Component } from "react";
import "./App.css";

//node modules
import { Layout, Menu, Checkbox } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  toggleCheck = (week, challenge, season) => {
    if (challenge === "all") {
      for (let i = 1; i <= 8; i++) {
        season[week]["c" + i] = !season[week][challenge];
      }
      season[week][challenge] = !season[week][challenge];
    } else {
      season[week][challenge] = !season[week][challenge];
      let allChecked = true;
      for (let i = 1; i <= 8; i++) {
        if (!season[week]["c" + i]) {
          allChecked = false;
        }
      }
      season[week]["all"] = allChecked;
    }
    localStorage.setItem(
      "season" + this.props.data.number,
      JSON.stringify(season)
    );
    this.props.updateSeason(season);
  };
  mapWeeks = (data, season) => {
    if (data === "error") {
      let errorArray = [];
      for (let i = 0; i < 9; i++) {
        errorArray.push(
          <SubMenu key={"error" + i} title={<span>Loading...</span>} />
        );
      }
      return errorArray;
    }
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
            <Menu.Item
              style={{ fontSize: "12px" }}
              key={"week" + +"challenge" + challenge.number}
            >
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
            <Menu.Item
              style={{ fontSize: "12px" }}
              key={"week" + data[i].number + "all"}
            >
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
    if (!this.props.data || !this.props.data.weeks) {
      return (
        <Sider
          width={this.props.compWidth}
          style={{ background: "#fff", display: "block" }}
        >
          <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            {this.mapWeeks("error")}
          </Menu>
        </Sider>
      );
    }
    return (
      <Sider
        width={this.props.compWidth}
        style={{ background: "#fff", display: "block" }}
      >
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          {this.mapWeeks(this.props.data, this.props.localStorage)}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
