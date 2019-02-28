import React, { Component } from "react";
import "./../App.css";
import SidebarMapContainer from "./../Season/SidebarMapContainer";
import Week from "./Week";
import Icon from "./Icon/Icon";
import Promote from "./Promote/Promote";
import SeasonTab from "./Season/Season";
import News from "./News";
import Challenge from "./Challenge";
import apiRequest from "./../Controllers";
//node modules
import { withRouter } from "react-router-dom";
import { Form, Icon as AntdIcon, Input, Modal, Card, Select } from "antd";
const moderatorUsername = process.env.REACT_APP_USERNAME;
const moderatorPassword = process.env.REACT_APP_PASSWORD;
const FormItem = Form.Item;
const tabList = [
  {
    key: "Challenge",
    tab: "Challenge"
  },
  {
    key: "Week",
    tab: "Week"
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
      seasonID: null,
      season: null,
      localStorage: {},
      key: "Challenge",
      coordinate: null,
      locationIndex: null,
      authenticated: false,
      username: "",
      password: "",
      seasonNumber: 8
    };
  }

  componentDidMount() {
    apiRequest({ name: "getSeasonList" }).then(response => {
      this.setState({
        seasonList: response.data
      });
    });
  }
  changeNormalState(name, value) {
    this.setState({
      [name]: value
    });
  }
  childDidUpdate = () => {
    this.setState({
      updated: true
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.seasonID !== this.state.seasonID || this.state.updated) {
      apiRequest({
        name: "getSeason",
        parameters: { seasonID: this.state.seasonID }
      }).then(response => {
        this.setState({
          season: response.data,
          updated: false
        });
      });
    }
  }
  pushCoordinate = coordinate => {
    this.setState({ coordinate });
  };

  contentList = type => {
    if (type === "Challenge") {
      return (
        <Challenge
          seasonID={this.state.seasonID}
          season={this.state.season ? this.state.season.weeks : null}
          coordinate={this.state.coordinate}
          locationIndex={this.state.locationIndex}
          childDidUpdate={this.childDidUpdate}
          changeParentState={locationIndex =>
            this.setState({
              locationIndex
            })
          }
        />
      );
    }
    if (type === "Week") {
      return (
        <Week
          changeModeratorState={(name, value) => {
            this.setState({
              [name]: value
            });
          }}
          seasonID={this.state.seasonID}
          season={this.state.season ? this.state.season.weeks : null}
          childDidUpdate={this.childDidUpdate}
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

  mapSeasonListOptions = () => {
    const seasonList = this.state.seasonList;
    return seasonList.map((season, i) => {
      return (
        <Select.Option
          title={"Select Season"}
          key={season.ID + i}
          value={season.ID}
        >
          {season.name}
        </Select.Option>
      );
    });
  };
  render() {
    if (!this.state.seasonList) {
      return <div />;
    }
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
                number={this.state.seasonNumber}
                updateModerator={this.pushCoordinate}
              />
              <Select
                value={this.state.seasonID}
                onChange={seasonID => {
                  this.setState({ seasonID: seasonID });
                }}
              >
                {this.mapSeasonListOptions()}
              </Select>
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

export default withRouter(Moderator);
