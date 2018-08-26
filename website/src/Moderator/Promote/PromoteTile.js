import React, { Component } from "react";
import "./../../App.css";
import apiRequest from "../../Controllers";
import Dropzone from "./../../Dropzone";
import { Icon, Input, Button, Col, Row, Card } from "antd";

class PromoteTile extends Component {
  state = {
    title: null,
    media: null,
    link: null,
    url: null,
    id: null,
    file: null
  };
  static getDerivedStateFromProps(nextProps) {
    const promotedContent = nextProps.promotedContent;
    if (promotedContent) {
      const { ID, Options, URL } = promotedContent,
        { title, media, link } = JSON.parse(Options);
      return {
        title,
        media,
        link,
        url: URL,
        id: ID
      };
    }
    return {};
  }
  createPromotedContent = () => {
    const { title, media, link, file } = this.state;
    if (title && media && link && file) {
      const formData = {
        options: JSON.stringify({ title, media, link }),
        file,
        type: "promote"
      };
      apiRequest({ name: "postImageCreate", formData }).then(response => {
        this.props.childDidUpdate();
      });
    }
  };

  updatePromotedContent = () => {
    const { id, title, media, link, file } = this.state;
    if (id && title && media && link) {
      const formData = {
        options: JSON.stringify({ title, media, link }),
        file,
        type: "promote",
        imageID: id
      };
      apiRequest({ name: "postImageUpdate", formData }).then(response => {
        this.props.childDidUpdate();
      });
    }
  };
  changeNormalState(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    const { url } = this.state;
    return (
      <Card title={this.state.title} style={{ width: "100%" }}>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Col span={12}>
            <Input
              onChange={e => this.changeNormalState("title", e.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="title"
              value={this.state.title}
            />
          </Col>
          <Col span={12}>
            <Input
              onChange={e => this.changeNormalState("media", e.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="media"
              value={this.state.media}
            />
          </Col>
        </Row>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Dropzone
            callback={file => {
              this.setState({ file });
            }}
          />
          {url && <img src={url} alt="upload" />}
        </Row>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Input
            onChange={e => this.changeNormalState("link", e.target.value)}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="media link"
            value={this.state.link}
          />
        </Row>
        {this.state.id ? (
          <Row gutter={16} type="flex" justify="end">
            <Col span={4}>
              <Button
                onClick={() => this.updatePromotedContent()}
                style={{ width: "100%" }}
                type="primary"
              >
                Update
              </Button>
            </Col>
            <Col span={4}>
              <Button
                onClick={() => {
                  const id = this.state.id;
                  apiRequest({
                    name: "postImageDelete",
                    body: { imageID: id }
                  }).then(response => {
                    this.props.childDidUpdate();
                  });
                }}
                style={{ width: "100%" }}
                type="danger"
              >
                Delete
              </Button>
            </Col>
          </Row>
        ) : (
          <Row gutter={16} type="flex" justify="end">
            <Col span={4}>
              <Button
                onClick={() => this.createPromotedContent()}
                style={{ width: "100%" }}
                type="primary"
              >
                Create
              </Button>
            </Col>
          </Row>
        )}
      </Card>
    );
  }
}

export default PromoteTile;
