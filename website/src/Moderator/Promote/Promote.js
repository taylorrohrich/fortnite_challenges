import React, { Component } from "react";
import "./../../App.css";
import PromoteTile from "./PromoteTile";
import apiRequest from "./../../Controllers";
class Promote extends Component {
  state = {
    promotedContentList: null,
    updated: false
  };
  mapPromotedContent = promotedContent => {
    if (promotedContent.length) {
      return promotedContent.map((value, index) => {
        return (
          <PromoteTile
            key={"promotedContent" + index}
            promotedContent={value}
            childDidUpdate={() => this.setState({ updated: true })}
          />
        );
      });
    }
  };
  componentDidMount() {
    apiRequest({ name: "getImageType", parameters: { type: "promote" } }).then(
      response => {
        this.setState({ promotedContentList: response.data });
      }
    );
  }
  componentDidUpdate() {
    if (this.state.updated) {
      apiRequest({
        name: "getImageType",
        parameters: { type: "promote" }
      }).then(response => {
        this.setState({ promotedContentList: response.data, updated: false });
      });
    }
  }
  render() {
    if (!this.state.promotedContentList) {
      return <div>Loading...</div>;
    }
    const promotedContent = this.state.promotedContentList;
    return (
      <div>
        <PromoteTile childDidUpdate={() => this.setState({ updated: true })} />
        <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
        {this.mapPromotedContent(promotedContent)}
      </div>
    );
  }
}

export default Promote;
