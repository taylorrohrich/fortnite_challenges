import React, { Component } from "react";
import "./../../App.css";
import apiRequest from "./../../Controllers";
import { Card, Button, Row, Col } from "antd";

class WeekTile extends Component {
  render() {
    const week = this.props.week;

    return (
      <Card title={week.name}>
        <Row gutter={16} type="flex" justify="end">
          <Col span={4}>
            <Button
              onClick={() =>
                apiRequest({
                  name: "postWeekDelete",
                  body: {
                    weekID: week.id
                  }
                }).then(response => {
                  this.props.childDidUpdate();
                })
              }
              style={{ width: "100%" }}
              type="danger"
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default WeekTile;
