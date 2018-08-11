import React, { Component } from "react";
import "./../App.css";
import { handleLocalStorage } from "../Utils";
import { allSeasonQuery } from "./../Database";
import SidebarMapContainer from "./../Season/SidebarMapContainer";
import Challenge from "./Challenge";
import Icon from "./Icon/Icon";
import Promote from "./Promote/Promote";
import SeasonTab from "./Season/Season";
import News from "./News";
//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Form, Icon as AntdIcon, Input, Modal, Card } from "antd";
import { cloneDeep } from "lodash";
const moderatorUsername = process.env.REACT_APP_USERNAME;
const moderatorPassword = process.env.REACT_APP_PASSWORD;
const FormItem = Form.Item;
const tabList = [
  {
    key: "Map",
    tab: "Map"
  },
  {
    key: "PromotedContent",
    tab: "Promoted Content"
  },
  {
    key: "Icon",
    tab: "Icon"
  },
  {
    key: "Season",
    tab: "Season"
  },
  {
    key: "News",
    tab: "News"
  }
];

class Moderator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeason: null,
      seasons: null,
      localStorage: {},
      key: "Map",
      selectedCoords: [],
      coordIndex: null,
      authenticated: false,
      username: "",
      password: ""
    };
  }

  changeNormalState(name, value) {
    this.setState({
      [name]: value
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.allSeasonQuery &&
      nextProps.allSeasonQuery.allSeasons &&
      !prevState.seasons
    ) {
      const selectedSeason = nextProps.allSeasonQuery.allSeasons.filter(
        element => element.isActive === true
      )[0].number;
      return {
        seasons: nextProps.allSeasonQuery.allSeasons,
        localStorage: handleLocalStorage(
          nextProps.allSeasonQuery.allSeasons.find(element => {
            return element.number === selectedSeason;
          })
        ),
        selectedSeason
      };
    } else {
      return {};
    }
  }
  pushCoordinate = coord => {
    let newCoords = cloneDeep(this.state.selectedCoords),
      coordIndex = this.state.coordIndex;
    if (coordIndex != null) {
      newCoords[coordIndex] = coord;
      this.setState({ selectedCoords: newCoords, coordIndex: null });
    } else {
      newCoords.push(coord);
      this.setState({ selectedCoords: newCoords });
    }
  };

  contentList = type => {
    if (type === "Map") {
      return (
        <Challenge
          changeModeratorState={(name, value) => {
            this.setState({
              [name]: value
            });
          }}
          seasons={this.state.seasons}
          coordIndex={this.state.coordIndex}
          selectedCoords={this.state.selectedCoords}
        />
      );
    }
    if (type === "PromotedContent") {
      return <Promote />;
    }
    if (type === "Icon") {
      return <Icon />;
    }
    if (type === "Season") {
      return <SeasonTab />;
    }
    if (type === "News") {
      return <News />;
    }
  };
  handleAuthentication = () => {
    const { username, password } = this.state;
    if (username === moderatorUsername && password === moderatorPassword) {
      this.setState({
        authenticated: true
      });
    } else {
      window.location = "/";
    }
  };

  render() {
    if (
      this.props.loading ||
      !this.props.allSeasonQuery ||
      this.props.allSeasonQuery.loading
    ) {
      return <div />;
    } else {
      return (
        <div className="App">
          {!this.state.authenticated ? (
            <Modal
              visible={true}
              title="Moderator Login"
              okText="Login"
              onOk={() => this.handleAuthentication()}
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {
                    <Input
                      onChange={e =>
                        this.changeNormalState("username", e.target.value)
                      }
                      value={this.state.username}
                      prefix={
                        <AntdIcon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  }
                </FormItem>
                <FormItem>
                  {
                    <Input
                      onChange={e =>
                        this.changeNormalState("password", e.target.value)
                      }
                      value={this.state.password}
                      prefix={
                        <AntdIcon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  }
                </FormItem>
              </Form>
            </Modal>
          ) : (
            <div>
              <SidebarMapContainer
                number={this.state.selectedSeason}
                updateModerator={this.pushCoordinate}
              />
              <Card
                style={{ width: "100%" }}
                title="Moderator Page"
                tabList={tabList}
                onTabChange={key => {
                  this.changeNormalState("key", key);
                }}
              >
                {this.contentList(this.state.key)}
              </Card>
            </div>
          )}
        </div>
      );
    }
  }
}

export default compose(
  graphql(allSeasonQuery, {
    name: "allSeasonQuery"
  })
)(withRouter(Moderator));
