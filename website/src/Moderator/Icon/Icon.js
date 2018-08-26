import React, { Component } from "react";
import "./../../App.css";
import IconTile from "./IconTile";
import apiRequest from "./../../Controllers";
class Icon extends Component {
  state = {
    iconList: null,
    updated: false
  };
  componentDidMount() {
    apiRequest({ name: "getImageType", parameters: { type: "icon" } }).then(
      response => {
        this.setState({ iconList: response.data });
      }
    );
  }
  componentDidUpdate() {
    if (this.state.updated) {
      apiRequest({ name: "getImageType", parameters: { type: "icon" } }).then(
        response => {
          this.setState({ iconList: response.data, updated: false });
        }
      );
    }
  }

  childDidUpdate = () => {
    this.setState({
      updated: true
    });
  };
  mapIcons = icons => {
    if (icons) {
      return icons.map((value, index) => {
        return (
          <IconTile
            key={"icon" + index}
            icon={value}
            childDidUpdate={this.childDidUpdate}
          />
        );
      });
    }
  };
  render() {
    if (!this.state.iconList) {
      return <div />;
    }
    return (
      <div>
        <IconTile childDidUpdate={this.childDidUpdate} />
        <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
        {this.mapIcons(this.state.iconList)}
      </div>
    );
  }
}

export default Icon;
