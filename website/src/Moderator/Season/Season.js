import React, { Component } from "react";
import "./../../App.css";
import SeasonTile from "./SeasonTile";
import apiRequest from "./../../Controllers";

import { Button } from "antd";

import { Row, Col, Card } from "antd";
class Season extends Component {
  state = {
    seasonList: null,
    updated: false
  };
  mapSeasons = seasons => {
    if (seasons.length) {
      return seasons.map(season => {
        return (
          <Col span={8}>
            <Card
              title={
                <div style={{ color: season.IsActive ? "green" : "red" }}>
                  {season.number}
                </div>
              }
            >
              <Button
                onClick={() => {
                  apiRequest({
                    name: "postSeasonDelete",
                    body: { seasonID: season.ID }
                  }).then(response => {
                    this.setState({ updated: true });
                  });
                }}
              >
                Delete
              </Button>
            </Card>
          </Col>
        );
      });
    }
  };
  componentDidMount() {
    apiRequest({ name: "getSeasonList" }).then(response => {
      this.setState({
        seasonList: response.data
      });
    });
  }
  componentDidUpdate() {
    if (this.state.updated) {
      apiRequest({ name: "getSeasonList" }).then(response => {
        this.setState({
          seasonList: response.data,
          updated: false
        });
      });
    }
  }
  render() {
    const seasons = this.state.seasonList;
    if (!seasons) {
      return <div> loading...</div>;
    }
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <SeasonTile
              childDidUpdate={() =>
                this.setState({
                  updated: true
                })
              }
              type={"create"}
            />
          </Col>
          <Col span={8}>
            <SeasonTile
              childDidUpdate={() =>
                this.setState({
                  updated: true
                })
              }
              type={"changeActive"}
              seasons={seasons}
            />
          </Col>
        </Row>
        <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
        <Row gutter={16}>{this.mapSeasons(seasons)}</Row>
      </div>
    );
  }
}

export default Season;
