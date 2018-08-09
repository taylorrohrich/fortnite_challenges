import React, { Component } from "react";
import "./../../App.css";
import { createIcon, updateIcon, deleteIcon } from "./../../Database";
import { mutation } from "./../../Utils";

import { Icon, Input, Button, Col, Row, Card } from "antd";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class IconTile extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { width, height, name, imageUrl, id } = nextProps.icon;
    return {
      width,
      height,
      name,
      imageUrl,
      id
    };
  }

  changeNormalState(name, value) {
    this.setState({
      [name]: isNaN(value) || value === "" ? value : Number(value)
    });
  }

  render() {
    const { width, height, name, imageUrl, id } = this.state;
    return (
      <Card title={this.state.title} style={{ width: "100%" }}>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Col span={12}>
            <Input
              onChange={e => this.changeNormalState("width", e.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="width"
              value={this.state.width}
            />
          </Col>
          <Col span={12}>
            <Input
              onChange={e => this.changeNormalState("height", e.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="height"
              value={this.state.height}
            />
          </Col>
        </Row>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Input
            onChange={e => this.changeNormalState("imageUrl", e.target.value)}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="image link"
            value={this.state.imageUrl}
          />
        </Row>
        <Row style={{ padding: "15px" }} gutter={16}>
          <Input
            onChange={e => this.changeNormalState("name", e.target.value)}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="name"
            value={this.state.name}
          />
        </Row>
        {this.state.id ? (
          <Row gutter={16} type="flex" justify="end">
            <Col span={4}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={() =>
                  mutation(
                    {
                      width,
                      height,
                      name,
                      imageUrl,
                      id
                    },
                    this.props.updateIcon
                  )
                }
              >
                Update
              </Button>
            </Col>
            <Col span={4}>
              <Button
                style={{ width: "100%" }}
                type="danger"
                onClick={() =>
                  mutation(
                    {
                      id
                    },
                    this.props.deleteIcon
                  )
                }
              >
                Delete
              </Button>
            </Col>
          </Row>
        ) : (
          <Row gutter={16} type="flex" justify="end">
            <Col span={4}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={() =>
                  mutation(
                    {
                      width,
                      height,
                      name,
                      imageUrl
                    },
                    this.props.createIcon
                  )
                }
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

export default compose(
  graphql(createIcon, {
    name: "createIcon"
  }),
  graphql(updateIcon, {
    name: "updateIcon"
  }),
  graphql(deleteIcon, {
    name: "deleteIcon"
  })
)(withRouter(IconTile));
