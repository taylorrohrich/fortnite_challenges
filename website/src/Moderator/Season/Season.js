import React, { Component } from "react";
import "./../../App.css";
import { allSeasonQuery } from "./../../Database";
import SeasonTile from "./SeasonTile";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Row, Col, Card } from "antd";

class Season extends Component {
  mapSeasons = seasons => {
    if (seasons.length) {
      return seasons.map(season => {
        return (
          <Col span={8}>
            <Card title={season.number} />
          </Col>
        );
      });
    }
  };
  render() {
    if (this.props.loading || this.props.allSeasonQuery.loading) {
      return <div>Icon</div>;
    }
    const seasons = this.props.allSeasonQuery.allSeasons;
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <SeasonTile type={"create"} />
          </Col>
          <Col span={8}>
            <SeasonTile type={"changeActive"} seasons={seasons} />
          </Col>
        </Row>
        <hr style={{ marginBottom: "50px", marginTop: "50px" }} />
        <Row gutter={16}>{this.mapSeasons(seasons)}</Row>
      </div>
    );
  }
}

export default compose(
  graphql(allSeasonQuery, {
    name: "allSeasonQuery"
  })
)(withRouter(Season));
