import React, { Component } from "react";
import "./../../App.css";
import { iconQuery } from "./../../Database";
import IconTile from "./IconTile";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class Icon extends Component {
  mapIcons = icons => {
    if (icons.length) {
      return icons.map((value, index) => {
        return <IconTile key={"icon" + index} icon={value} />;
      });
    }
  };
  render() {
    if (this.props.loading || this.props.iconQuery.loading) {
      return <div>Icon</div>;
    }
    const icons = this.props.iconQuery.allIcons;
    return (
      <div>
        <IconTile icon={{}} />
        <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
        {this.mapIcons(icons)}
      </div>
    );
  }
}

export default compose(
  graphql(iconQuery, {
    name: "iconQuery"
  })
)(withRouter(Icon));
