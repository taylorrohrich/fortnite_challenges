import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Map from "./Map.js";
import { ApolloProvider, graphql, compose } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

import Button from "antd/lib/button";

import { Layout, Menu, Breadcrumb, Icon, Checkbox } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compWidth: null,
      season: null
    };
  }
  updateWidth = length => {
    this.setState({ compWidth: window.innerWidth * 3 / 10 });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
    let season = this.props.data;
    console.log(this.props);
    if (season) {
      if (!localStorage.getItem("season" + season.number)) {
        // localStorage.setItem("lastname", "Smith");
        let seasonJSON = {};
        for (let j = 1; j <= 10; j++) {
          seasonJSON["week" + [j]] = {
            all: true,
            c1: true,
            c2: true,
            c3: true,
            c4: true,
            c5: true,
            c6: true,
            c7: true
          };
        }
        localStorage.setItem(
          "season" + season.number,
          JSON.stringify(seasonJSON)
        );
      } else {
        let seasonStorage = localStorage.getItem("season" + season.number);
        seasonStorage = JSON.parse(seasonStorage);
        this.setState({ season: seasonStorage });
        console.log("hfida");
        this.props.updateSeason(seasonStorage);
      }
    }
  }

  toggleCheck = (week, challenge) => {
    console.log(week);
    console.log(challenge);
    let season = this.state.season;
    season[week][challenge] = !season[week][challenge];
    localStorage.setItem(
      "season" + this.props.data.number,
      JSON.stringify(season)
    );
    this.setState({ season: season });

    this.props.updateSeason(season);
  };
  mapWeeks = (data, season) => {
    data = data.weeks;
    let menu = [];
    for (let i = 0; i < 9; i++) {
      if (!data[i]) {
        menu.push(
          <SubMenu
            key={"week" + i + 1}
            title={<span>Week {i + 1} (TBD)</span>}
          />
        );
      } else {
        let challenges = data[i].challenges.map(challenge => {
          return (
            <Menu.Item key={"week" + (i + 1) + "challenge" + challenge.number}>
              {console.log(season["week" + (i + 1)]["c" + challenge.number])}
              <Checkbox
                checked={
                  season["week" + (i + 1)]["c" + challenge.number]
                    ? true
                    : false
                }
                defaultChecked={true}
                style={{ padding: "5px" }}
                onChange={() =>
                  this.toggleCheck("week" + (i + 1), "c" + challenge.number)
                }
              />
              {challenge.description}
            </Menu.Item>
          );
        });
        menu.push(
          <SubMenu key={"week" + i} title={<span>Week {i + 1}</span>}>
            {challenges}
          </SubMenu>
        );
      }
    }
    return menu;
  };
  render() {
    if (this.props.loading || !this.state.season) {
      return <div />;
    }
    return (
      <Sider
        width={
          this.state.compWidth ? this.state.compWidth : window.innerWidth / 4
        }
        style={{ background: "#fff" }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {this.mapWeeks(this.props.data, this.state.season)}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
