import React, { Component } from "react";
import "./../../App.css";
import apiRequest from "./../../Controllers";
import WeekTile from "./WeekTile";
import { withRouter } from "react-router-dom";
import { Button, Col, Row, Card } from "antd";
import { Select } from "antd";

const mapWeekOptions = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
    return (
      <Select.Option title={"Create Week"} key={"Week" + number} value={number}>
        Week {number}
      </Select.Option>
    );
  });
};
const mapWeekTiles = (season, childDidUpdate) => {
  return season.map(week => (
    <WeekTile childDidUpdate={childDidUpdate} week={week} />
  ));
};
class Week extends Component {
  state = {
    weekNumber: null
  };

  changeNormalState(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.props.season) {
      return <div />;
    }
    return (
      <div>
        <Card>
          <Row gutter={16}>
            <Col span={20}>
              <Select
                value={this.state.weekNumber}
                onChange={value => this.changeNormalState("weekNumber", value)}
                style={{ width: "100%" }}
              >
                {mapWeekOptions()}
              </Select>
            </Col>
            <Col span={4}>
              <Button
                onClick={() =>
                  apiRequest({
                    name: "postWeekCreate",
                    body: {
                      weekNumber: this.state.weekNumber,
                      seasonID: this.props.seasonID,
                      name: "Week " + this.state.weekNumber
                    }
                  }).then(response => {
                    this.props.childDidUpdate();
                  })
                }
                type="primary"
                style={{ width: "100%" }}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Card>
        {mapWeekTiles(this.props.season, this.props.childDidUpdate)}
      </div>
    );
  }
}

export default withRouter(Week);
