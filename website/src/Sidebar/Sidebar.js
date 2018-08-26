import React, { Component } from "react";
import "./../App.css";
import Week from "./Week";

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

  mapWeeks = (season, localStorage) => {
    const weeks = new Array(10).fill(0).reduce((acc, item, index) => {
      const currentItem = index + 1;
      if (!season) {
        return acc.concat({
          data: {
            loading: true,
            weekNumber: currentItem
          }
        });
      }
      const currentWeek = season.weeks.filter(
        week => week.number === currentItem
      )[0];
      if (currentWeek) {
        return acc.concat({
          data: {
            weekNumber: currentWeek.number,
            challenges: currentWeek.challenges,
            seasonNumber: season.number
          }
        });
      } else {
        return acc.concat({
          data: {
            unReleased: true,
            weekNumber: currentItem
          }
        });
      }
    }, []);
    return weeks.map(item => (
      <Week
        key={"week" + item.data.weekNumber}
        data={{
          ...item.data,
          seasonLocalStorage: localStorage,
          updateSeason: this.props.updateSeason
        }}
      />
    ));
  };

  handleSiderStyle = () => {
    const style =
      window.innerWidth >= 992
        ? {
            maxHeight:
              window.innerWidth >= 992 ? this.props.sidebarHeight : "none",
            background: "#fff",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            left: 0
          }
        : {
            maxHeight:
              window.innerWidth >= 992 ? this.props.sidebarHeight : "none",
            background: "#fff",
            flexGrow: 1,
            left: 0
          };
    return style;
  };
  render() {
    if (this.props.loading) {
      return <div />;
    }
    const season = this.props.season;
    if (!season || !season.weeks) {
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
          inlineIndent={10}
          mode="inline"
          style={{
            width: "100%",
            textOverflow: "elipsis",
            height: "100%",
            borderRight: 0
          }}
        >
          {this.mapWeeks(season, this.props.localStorage)}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
