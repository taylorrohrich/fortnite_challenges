import React, { Component } from "react";
import "./../App.css";
import apiRequest from "./../Controllers";
import { Card } from "antd";
import { withRouter } from "react-router-dom";
const { Meta } = Card;

const mapCards = promotedContent => {
  if (!promotedContent) {
    return (
      <Card
        className="PromoteCard"
        cover={
          <span style={{ width: "100%" }}>
            <img
              style={{ width: "100%" }}
              alt="example"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
            />
          </span>
        }
      >
        <Meta
          title={<div style={{ fontSize: ".8em" }}>Loading...</div>}
          description={<div style={{ fontSize: ".7em" }}>Loading...</div>}
        />
      </Card>
    );
  }
  return promotedContent.map((item, index) => {
    const options = item.Options ? JSON.parse(item.Options) : null,
      { title, media, link } = options,
      url = item.URL;
    return (
      <span key={item.title + index}>
        <Card
          className="PromoteCard"
          cover={
            <span style={{ width: "100%" }}>
              <a href={link}>
                <img style={{ width: "100%" }} alt="example" src={url} />
              </a>
            </span>
          }
        >
          <Meta
            title={<div style={{ fontSize: ".8em" }}>{title}</div>}
            description={<div style={{ fontSize: ".7em" }}>{media}</div>}
          />
        </Card>
      </span>
    );
  });
};

class Promote extends Component {
  state = {
    promotedContentList: null
  };
  componentDidMount() {
    apiRequest({ name: "getImageType", parameters: { type: "promote" } }).then(
      response => {
        this.setState({ promotedContentList: response.data });
      }
    );
  }
  render() {
    const promotedContentList = this.state.promotedContentList;
    if (!promotedContentList) {
      return (
        <Card title={"Friends of FortFriend"}>
          <div className="Promote">{mapCards()}</div>
        </Card>
      );
    }

    return (
      <Card title={"Friends of FortFriend"}>
        <div className="Promote">{mapCards(promotedContentList)}</div>
      </Card>
    );
  }
}

export default withRouter(Promote);
