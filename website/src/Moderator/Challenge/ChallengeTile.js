import React, { Component } from "react";
import "./../../App.css";
import Coordinate from "./Coordinate";
import apiRequest from "./../../Controllers";
import { Select, Row, Col, Card, Input, Button, Checkbox } from "antd";
class ChallengeTile extends Component {
  state = {
    seasonID: null,
    challegeNumber: null,
    challengeID: null,
    weekID: null,
    name: null,
    iconID: null,
    iconList: null,
    isHard: null,
    updated: false,
    locations: []
  };
  childDidUpdate = () => {
    this.setState({
      updated: true
    });
  };
  mapIcons = iconList => {
    if (iconList)
      return iconList.map(icon => {
        const { name } = JSON.parse(icon.Options);
        return <Select.Option value={icon.ID}>{name}</Select.Option>;
      });
  };
  static getDerivedStateFromProps(nextProps) {
    const { challenge, seasonID, challengeNumber, weekID } = nextProps;
    if (challenge) {
      const { name, isHard, locations, iconID, id } = challenge;
      return {
        challenge,
        seasonID,
        challengeNumber,
        weekID,
        name,
        isHard,
        locations,
        iconID,
        challengeID: id
      };
    }
    return {
      challenge,
      seasonID,
      challengeNumber,
      weekID,
      name: null,
      isHard: null,
      locations: [],
      iconID: null
    };
  }
  render() {
    const {
      name,
      iconList,
      challenge,
      challengeNumber,
      weekID,
      isHard,
      locations,
      iconID,
      challengeID
    } = this.state;
    return (
      <div>
        <Card title={"Challenge " + challengeNumber}>
          <Row style={{ padding: "15px" }} gutter={16}>
            <Col span={8}>
              <Input
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="name"
                value={this.state.name}
              />
            </Col>
            <Col span={8}>
              <Select
                onFocus={() => {
                  if (!this.state.iconList) {
                    apiRequest({
                      name: "getImageType",
                      parameters: { type: "icon" }
                    }).then(response => {
                      this.setState({ iconList: response.data });
                    });
                  }
                }}
                value={this.state.iconID}
                style={{ width: "100%" }}
                onChange={e => this.setState({ iconID: e })}
              >
                {this.mapIcons(iconList)}
              </Select>
            </Col>
            <Col span={4}>
              <Checkbox
                style={{ width: "100%" }}
                checked={this.state.isHard}
                onChange={() => {
                  this.setState({
                    isHard: !this.state.isHard
                  });
                }}
              >
                Hard Challenge
              </Checkbox>
            </Col>
            <Col span={4}>
              <Button
                onClick={() => {
                  apiRequest({
                    name: "postChallengeCreate",
                    body: {
                      name,
                      isHard,
                      weekID,
                      challengeNumber,
                      iconID
                    }
                  }).then(response => this.props.childDidUpdate());
                }}
                style={{ width: "100%" }}
              >
                {challenge ? "Update" : "Submit"}
              </Button>
            </Col>
          </Row>
        </Card>
        {challenge && (
          <Coordinate
            locations={locations}
            iconID={iconID}
            challengeID={challengeID}
            childDidUpdate={this.props.childDidUpdate}
            coordinate={this.props.coordinate}
            locationIndex={this.props.locationIndex}
            changeParentState={this.props.changeParentState}
          />
        )}
      </div>
    );
  }
}

export default ChallengeTile;
