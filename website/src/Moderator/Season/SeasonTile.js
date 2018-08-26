import React, { Component } from "react";
import "./../../App.css";
import { Input, Button, Col, Row, Card, Select } from "antd";
import apiRequest from "../../Controllers";
const Option = Select.Option;
class SeasonTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      seasonID: null
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
        <Option value={season.ID} key={season.number + index}>
          {season.number}
        </Option>
      );
    });
  };
  render() {
    const { type, seasons } = this.props;
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
                    this.changeNormalState("seasonID", e);
                  }}
                  style={{ width: "100%" }}
                  value={this.state.seasonID}
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
              onClick={
                type === "create"
                  ? () =>
                      apiRequest({
                        name: "postSeasonCreate",
                        body: { seasonNumber: this.state.number }
                      }).then(response => {
                        this.props.childDidUpdate();
                      })
                  : () =>
                      apiRequest({
                        name: "postSeasonUpdate",
                        body: { seasonID: this.state.seasonID, isActive: true }
                      }).then(response => {
                        this.props.childDidUpdate();
                      })
              }
            >
              {type === "create" ? "Create" : "Update Active"}
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default SeasonTile;
