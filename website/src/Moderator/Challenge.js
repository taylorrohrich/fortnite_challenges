import React, { Component } from "react";
import "./../App.css";
import { createChallenge, iconQuery } from "./../Database";
import { mutation } from "./../Utils";
import { Form, Icon, Input, Button, Col, Row, Card } from "antd";
import { Select } from "antd";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { cloneDeep } from "lodash";
const FormItem = Form.Item;
const Option = Select.Option;

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: "",
      week: null,
      icon: "",
      challenge: "",
      description: "",
      selectedCoords: [],
      coordIndex: null
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      seasons: nextProps.seasons,
      selectedCoords: nextProps.selectedCoords,
      coordIndex: nextProps.coordIndex
    };
  }
  deleteCoordinate = coord => {
    let newCoords = cloneDeep(this.state.selectedCoords);
    newCoords.splice(coord, 1);
    this.props.changeModeratorState("selectedCoords", newCoords);
  };
  updateCoordType = (e, index, type) => {
    let newCoords = cloneDeep(this.state.selectedCoords);
    if (newCoords[index]) {
      let newCoordsIndex = newCoords[index];
      newCoordsIndex[type] = e.target.value;
      newCoords[index] = newCoordsIndex;
      this.props.changeModeratorState("selectedCoords", newCoords);
    }
  };

  getSelectorOptions = type => {
    let data = "";
    switch (type) {
      case "icon":
        const icons = this.props.iconQuery.allIcons;
        data = icons.reduce((accum, curVal) => {
          accum.push({ value: curVal.name, description: curVal.name });
          return accum;
        }, []);
        break;
      case "season":
        data = this.state.seasons.reduce((accum, curVal) => {
          accum.push({
            value: curVal.id,
            description: "Season " + curVal.number
          });
          return accum;
        }, []);
        break;
      case "week":
        data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((accum, curVal, i) => {
          accum.push({ value: curVal, description: "Week " + curVal });
          return accum;
        }, []);
        break;
      case "challenge":
        data = [1, 2, 3, 4, 5, 6, 7, 8].reduce((accum, curVal, i) => {
          accum.push({
            value: curVal,
            description: "Challenge " + curVal
          });
          return accum;
        }, []);
        break;
      default:
        data = [];
    }
    return data.map((item, i) => {
      return (
        <Option title={type} key={item + i} value={item.value}>
          {item.description}
        </Option>
      );
    });
  };

  grabDefault = (challenge, week, season, type) => {
    if (challenge && week && season) {
      const seasons = this.state.seasons;
      return seasons.reduce((accum, curVal) => {
        if (curVal.id === season) {
          accum = curVal.weeks.reduce((accum1, curWeek) => {
            if (curWeek.number === week) {
              accum1 = curWeek.challenges.reduce((accum2, c) => {
                if (c.number === challenge) {
                  accum2 = c[type];
                }
                return accum2;
              }, []);
            }
            return accum1;
          }, []);
        }
        return accum;
      }, []);
    }
  };

  getDefault = () => {
    this.setState(
      {
        description: this.grabDefault(
          this.state.challenge,
          this.state.week,
          this.state.season,
          "description"
        ),
        icon: this.grabDefault(
          this.state.challenge,
          this.state.week,
          this.state.season,
          "icon"
        )
      },
      this.props.changeModeratorState(
        "selectedCoords",
        this.grabDefault(
          this.state.challenge,
          this.state.week,
          this.state.season,
          "coord"
        )
      )
    );
  };

  mapInput = index => {
    const input = [
      { name: "url", description: "url" },
      { name: "credit", description: "provided by" },
      { name: "refLink", description: "referral Link" },
      { name: "locationDescription", description: "location Description" }
    ];
    return input.map(item => (
      <Row
        key={item.name + index + "input"}
        style={{ padding: "15px" }}
        gutter={16}
      >
        <Input
          onChange={e => this.updateCoordType(e, index, item.name)}
          prefix={<Icon style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder={item.description}
          value={this.state.selectedCoords[index][item.name]}
        />
      </Row>
    ));
  };
  mapCoords = coord => {
    if (coord.length) {
      return coord.map((value, index) => {
        return (
          <Card
            key={index + "card"}
            title={"x: " + value.x + ", y: " + value.y}
            extra={
              <div>
                <Button
                  type={this.state.index === index ? "primary" : "default"}
                  onClick={() =>
                    this.props.changeModeratorState("coordIndex", index)
                  }
                >
                  Update Index
                </Button>
                <Button
                  type={"danger"}
                  onClick={() => this.deleteCoordinate(index)}
                >
                  Delete Index
                </Button>
              </div>
            }
            style={{ width: "100%" }}
          >
            {this.mapInput(index)}
          </Card>
        );
      });
    }
  };

  changeNormalState(name, value) {
    this.setState({
      [name]: value
    });
  }

  changeSelectorState(name, value) {
    this.setState(
      {
        [name]: value
      },
      () => {
        if (
          name !== "icon" &&
          this.state.challenge &&
          this.state.week &&
          this.state.season
        ) {
          this.getDefault(
            this.state.challenge,
            this.state.week,
            this.state.season,
            "description"
          );
        }
      }
    );
  }

  mapSelect = () => {
    const select = [
      { name: "season", description: "select season" },
      { name: "week", description: "select week" },
      { name: "challenge", description: "select challenge" },
      { name: "icon", description: "select icon" }
    ];
    return select.map((item, index) => (
      <Col span={6} key={item.name + index}>
        <Select
          onChange={(val, e) => {
            this.changeSelectorState(e.props.title, val);
          }}
          defaultValue={item.description}
          style={{ width: "100%" }}
          value={this.state[item.name]}
        >
          {this.getSelectorOptions(item.name)}
        </Select>
      </Col>
    ));
  };
  render() {
    if (this.props.loading || this.props.iconQuery.loading) {
      return <div>loading...</div>;
    }
    const {
        description,
        icon,
        week,
        season,
        selectedCoords,
        challenge
      } = this.state,
      variables = {
        description: description,
        icon: icon,
        week: week,
        season: season,
        coord: selectedCoords,
        number: challenge
      };
    return (
      <div>
        <Row
          style={{
            padding: "15px"
          }}
          gutter={16}
        >
          {this.mapSelect()}
        </Row>
        <Row
          style={{
            padding: "15px"
          }}
          gutter={16}
        >
          <Col span={18}>
            <Input
              title={"description"}
              value={this.state.description}
              onChange={e =>
                this.changeNormalState("description", e.target.value)
              }
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Description"
            />
          </Col>
          <Col span={6}>
            <Button
              disabled={
                !this.state.description ||
                !this.state.icon ||
                !this.state.season ||
                !this.state.week ||
                !this.state.challenge
              }
              style={{ width: "100%" }}
              onClick={() =>
                mutation(variables, this.props.createChallenge, () => {
                  this.setState(
                    {
                      coordIndex: null
                    },
                    this.props.changeModeratorState("selectedCoords", [])
                  );
                })
              }
            >
              Submit
            </Button>
          </Col>
        </Row>
        <FormItem>{this.mapCoords(this.state.selectedCoords)}</FormItem>
      </div>
    );
  }
}

export default compose(
  graphql(createChallenge, { name: "createChallenge" }),
  graphql(iconQuery, {
    name: "iconQuery"
  })
)(withRouter(Challenge));
