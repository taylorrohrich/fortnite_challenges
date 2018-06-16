import React, { Component } from "react";
import "./App.css";
import { Card } from "antd";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { promotedContentQuery } from "./Database.js";
const { Meta } = Card;

const loadingPromotedContent = [
  {
    title: "Loading...",
    media: "Loading...",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  }
];

const mapCards = promotedContent => {
  return promotedContent.map((item, index) => {
    return (
      <a key={item.title + index} href={item.link}>
        <Card
          className="PromoteCard"
          cover={<img alt="example" src={item.imageUrl} />}
        >
          <Meta
            title={<div style={{ fontSize: ".8em" }}>{item.title}</div>}
            description={<div style={{ fontSize: ".7em" }}>{item.media}</div>}
          />
        </Card>
      </a>
    );
  });
};

class Promote extends Component {
  render() {
    if (this.props.promotedContentQuery.loading) {
      return (
        <Card title={"Friends of FortFriend"}>
          <div className="Promote">{mapCards(loadingPromotedContent)}</div>
        </Card>
      );
    }

    const promotedContent = this.props.promotedContentQuery.allPromotedContents;
    return (
      <Card title={"Friends of FortFriend"}>
        <div className="Promote">{mapCards(promotedContent)}</div>
      </Card>
    );
  }
}

const PromoteWithQuery = graphql(promotedContentQuery, {
  name: "promotedContentQuery"
})(withRouter(Promote));

export default PromoteWithQuery;
