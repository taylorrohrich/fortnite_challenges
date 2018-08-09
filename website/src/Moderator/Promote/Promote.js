import React, { Component } from "react";
import "./../../App.css";
import { promotedContentQuery } from "./../../Database";
import PromoteTile from "./PromoteTile";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class Promote extends Component {
  mapPromotedContent = promotedContent => {
    if (promotedContent.length) {
      return promotedContent.map((value, index) => {
        return (
          <PromoteTile
            key={"promotedContent" + index}
            promotedContent={value}
          />
        );
      });
    }
  };
  render() {
    if (this.props.loading || this.props.promotedContentQuery.loading) {
      return <div>Promote</div>;
    }
    const promotedContent = this.props.promotedContentQuery.allPromotedContents;
    return (
      <div>
        <PromoteTile promotedContent={{}} />
        <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
        {this.mapPromotedContent(promotedContent)}
      </div>
    );
  }
}

export default compose(
  graphql(promotedContentQuery, {
    name: "promotedContentQuery"
  })
)(withRouter(Promote));
