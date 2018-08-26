import React, { Component } from "react";
import "./../../App.css";
import apiRequest from "./../../Controllers";
import Dropzone from "./../../Dropzone";
import { Input, Button, Col, Row, Card } from "antd";

class IconTile extends Component {
  state = {
    id: null,
    url: null,
    width: null,
    height: null,
    name: null,
    file: null
  };

  static getDerivedStateFromProps(nextProps) {
    const icon = nextProps.icon;
    if (icon) {
      const { ID, Options, URL } = nextProps.icon,
        options = JSON.parse(Options),
        { width, height, name } = options;
      return {
        id: ID,
        width,
        height,
        name,
        url: URL
      };
    }
    return {};
  }

  createIcon = () => {
    const { width, height, name, file } = this.state;
    if (width && height && name && file) {
      const formData = {
        options: JSON.stringify({ name, width, height }),
        file,
        type: "icon"
      };
      apiRequest({ name: "postImageCreate", formData }).then(response => {
        this.props.childDidUpdate();
      });
    }
  };

  updateIcon = () => {
    const { id, width, height, name, file } = this.state;
    if (width && height && name) {
      const formData = {
        options: JSON.stringify({ name, width, height }),
        file,
        type: "icon",
        imageID: id
      };
      apiRequest({ name: "postImageUpdate", formData }).then(response => {
        this.props.childDidUpdate();
      });
    }
  };

  changeNormalState(name, value) {
    this.setState({
      [name]: isNaN(value) || value === "" ? value : Number(value)
    });
  }

  render() {
    const { width, height, name, url } = this.state;
    return (
      <Card title={this.state.title} style={{ width: "100%" }}>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Col span={12}>
            <Input
              onChange={e => this.changeNormalState("width", e.target.value)}
              placeholder="width"
              value={width}
            />
          </Col>
          <Col span={12}>
            <Input
              onChange={e => this.changeNormalState("height", e.target.value)}
              placeholder="height"
              value={height}
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
            onChange={e => this.changeNormalState("name", e.target.value)}
            placeholder="name"
            value={name}
          />
        </Row>
        {this.state.id ? (
          <Row gutter={16} type="flex" justify="end">
            <Col span={4}>
              <Button
                onClick={() => this.updateIcon()}
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
                onClick={() => this.createIcon()}
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
export default IconTile;
