import React, { Component } from "react";
import "./../../App.css";
import { createActiveSeason, createSeason } from "./../../Database";
import { mutation } from "./../../Utils";
import { Input, Button, Col, Row, Card, Select } from "antd";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
const Option = Select.Option;
class SeasonTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      season: null
    };
  }

  changeNormalState(name, value) {
    this.setState({
      [name]: isNaN(value) || value === "" ? value : Number(value)
    });
  }

  mapSeasons = seasons => {
    return seasons.map((season, index) => {
      return (
        <Option value={season.id} key={season.number + index}>
          {season.number}
        </Option>
      );
    });
  };
  createMutation = () => {
    let { season } = this.state;
    if (!season) {
      alert("not all fields filled out");
    } else {
      const variables = {
        seasonId: season
      };
      this.props.createActiveSeason({ variables }).then(response => {
        console.log(response);
      });
    }
  };
  render() {
    const { type, seasons } = this.props,
      variables =
        type === "create"
          ? { number: this.state.number }
          : { seasonId: this.state.season },
      mutationFunction =
        type === "create"
          ? this.props.createSeason
          : this.props.createActiveSeason;
    return (
      <Card
        title={type === "create" ? "Create Season" : "Change Active Season"}
        style={{ width: "100%" }}
      >
        <Row style={{ padding: "15px" }} gutter={16}>
          <Col span={12}>
            {type === "create" ? (
              <Input
                value={this.props.number || this.state.number}
                onChange={e => {
                  this.changeNormalState(
                    "number",
                    Number(e.target.value) || ""
                  );
                }}
              />
            ) : (
              seasons && (
                <Select
                  onChange={e => {
                    this.changeNormalState("season", e);
                  }}
                  style={{ width: "100%" }}
                  value={this.state.season}
                >
                  {this.mapSeasons(seasons)}
                </Select>
              )
            )}
          </Col>
          <Col span={12}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={() => mutation(variables, mutationFunction)}
            >
              {type === "create" ? "Create" : "Update Active"}
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default compose(
  graphql(createActiveSeason, {
    name: "createActiveSeason"
  }),
  graphql(createSeason, {
    name: "createSeason"
  })
)(withRouter(SeasonTile));
