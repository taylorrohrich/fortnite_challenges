import React, { Component } from "react";
import "./../../App.css";
// import CoordinateTile from "CoordinateTile.js";
import ChallengeTile from "./ChallengeTile";
import { Select, Row, Col } from "antd";

class Challenge extends Component {
  state = {
    updated: false,
    weekID: null,
    seasonID: null,
    season: null,
    challengeNumber: null
  };
  mapWeeks = season => {
    return season.map(week => {
      return <Select.Option value={week.id}>{week.name} </Select.Option>;
    });
  };
  mapChallenges = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(challenge => {
      return (
        <Select.Option value={challenge}>Challenge {challenge}</Select.Option>
      );
    });
  };
  static getDerivedStateFromProps(nextProps) {
    const { season, seasonID } = nextProps;
    return {
      season,
      seasonID
    };
  }
  findChallenge = season => {
    const { weekID, challengeNumber } = this.state,
      week = season.filter(week => week.id === weekID)[0],
      challenge = week.challenges.filter(
        challenge => challenge.number === challengeNumber
      );
    if (challenge.length) {
      return challenge[0];
    }
    return null;
  };
  render() {
    const { challengeNumber, weekID, season, seasonID } = this.state;
    if (!season) return <div />;
    return (
      <div>
        <Row>
          <Col span={12}>
            <Select
              value={this.state.weekID}
              style={{ width: "100%" }}
              onChange={e => this.setState({ weekID: e })}
            >
              {this.mapWeeks(season)}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              value={this.state.challengeNumber}
              style={{ width: "100%" }}
              onChange={e => this.setState({ challengeNumber: e })}
            >
              {this.mapChallenges()}
            </Select>
          </Col>
        </Row>

        {seasonID &&
          season &&
          challengeNumber &&
          weekID && (
            <ChallengeTile
              challenge={this.findChallenge(season)}
              coordinate={this.props.coordinate}
              changeParentState={this.props.changeParentState}
              locationIndex={this.props.locationIndex}
              seasonID={seasonID}
              challengeNumber={challengeNumber}
              weekID={weekID}
              childDidUpdate={this.props.childDidUpdate}
            />
          )}
      </div>
    );
  }
}

export default Challenge;
