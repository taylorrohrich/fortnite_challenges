import React, { Component } from "react";
import "./../../App.css";
import {
  createPromotedContent,
  updatePromotedContent,
  deletePromotedContent
} from "./../../Database";
import { mutation } from "./../../Utils";
import { Icon, Input, Button, Col, Row, Card } from "antd";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class PromoteTile extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { title, media, link, imageUrl, id } = nextProps.promotedContent;
    return {
      title,
      media,
      link,
      imageUrl,
      id
    };
  }

  changeNormalState(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    const { title, media, link, imageUrl, id } = this.state;
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
          <Input
            onChange={e => this.changeNormalState("imageUrl", e.target.value)}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="image link"
            value={this.state.imageUrl}
          />
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
                style={{ width: "100%" }}
                type="primary"
                onClick={() =>
                  mutation(
                    {
                      title,
                      media,
                      link,
                      imageUrl,
                      id
                    },
                    this.props.updatePromotedContent
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
                    this.props.deletePromotedContent
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
                      title,
                      media,
                      link,
                      imageUrl
                    },
                    this.props.createPromotedContent
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
  graphql(createPromotedContent, {
    name: "createPromotedContent"
  }),
  graphql(updatePromotedContent, {
    name: "updatePromotedContent"
  }),
  graphql(deletePromotedContent, {
    name: "deletePromotedContent"
  })
)(withRouter(PromoteTile));
