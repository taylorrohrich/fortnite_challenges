import React, { Component } from "react";
import "./../App.css";
import Week from "./Week.js";

//node modules
import { Layout, Menu } from "antd";
const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarLength: null,
      sidebarHeight: null
    };
  }

  mapWeeks = (data, season) => {
    const weeks = new Array(10).fill(0).reduce((acc, item, index) => {
      if (!data) {
        return acc.concat({
          data: {
            loading: true,
            weekNumber: index + 1
          }
        });
      }
      const currentWeek = data.weeks[index];
      if (currentWeek) {
        return acc.concat({
          data: {
            weekNumber: currentWeek.number,
            challenges: currentWeek.challenges,
            seasonNumber: data.number
          }
        });
      } else {
        return acc.concat({
          data: {
            unReleased: true,
            weekNumber: index + 1
          }
        });
      }
    }, []);
    return weeks.map(item => (
      <Week
        key={"week" + item.data.weekNumber}
        data={{
          ...item.data,
          seasonLocalStorage: season,
          updateSeason: this.props.updateSeason
        }}
      />
    ));
  };

  handleSiderStyle = () => {
    return {
      maxHeight: window.innerWidth >= 992 ? this.props.sidebarHeight : "none",
      background: "#fff",
      display: "block",
      left: 0
    };
  };
  render() {
    if (this.props.loading) {
      return <div />;
    }
    if (!this.props.data || !this.props.data.weeks) {
      return (
        <Sider className="Sidebar" width={{}} style={this.handleSiderStyle()}>
          <Menu
            inlineIndent={15}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
          >
            {this.mapWeeks(null)}
          </Menu>
        </Sider>
      );
    }
    return (
      <Sider className="Sidebar" width={{}} style={this.handleSiderStyle()}>
        <Menu
          inlineIndent={15}
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
        >
          {this.mapWeeks(this.props.data, this.props.localStorage)}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
