import React, { Component } from "react";
import { Card, Icon } from "antd";
import "./News.css";
import { placeholder } from "./../Images";
import AdFooter from "./AdFooter";
const { Meta } = Card;
class PostThumbnail extends Component {
  state = {};

  render() {
    const post = this.props.post,
      { title, imageUrl, description } = post;
    return (
      <div className="postThumbnail">
        <Card
          hoverable
          cover={<img src={imageUrl || placeholder} alt="image" />}
        >
          <Meta title={title} description={description} />
          <div style={{ display: "block" }}>
            <Icon style={{ float: "right" }} type="message" />
          </div>
        </Card>
        <AdFooter />
      </div>
    );
  }
}

export default PostThumbnail;
