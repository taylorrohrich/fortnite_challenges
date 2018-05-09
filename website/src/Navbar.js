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

import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Navbar extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Season 1</Menu.Item>
          <Menu.Item key="2">Season 2</Menu.Item>
          <Menu.Item key="3">Season 3</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Navbar;
