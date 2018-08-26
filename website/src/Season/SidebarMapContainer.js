import React, { Component } from "react";
import "./../App.css";
import Map from "../Season/Map";
import Sidebar from "./../Sidebar";
import { getLocalStorage, processData } from "../Utils";
import apiRequest from "./../Controllers";
//node modules
import { withRouter } from "react-router-dom";
import { Row } from "antd";
import ContainerDimensions from "react-container-dimensions";
import Rnd from "react-rnd";

/*TODO*/
class SidebarMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: null,
      localStorage: {},
      height: null
    };
  }

  updateSeason = season => {
    this.setState({ localStorage: season });
  };

  updateHeight = height => {
    this.setState({ height: height });
  };

  updateSelectedSeason = number => {
    this.setState({ selectedSeason: number });
  };

  componentDidMount = () => {
    const seasonNumber = this.props.number;
    if (seasonNumber) {
      apiRequest({ name: "getSeason", parameters: { seasonNumber } }).then(
        response => {
          if (response.data) {
            const season = response.data,
              localStorage = getLocalStorage(season);
            this.setState({
              season,
              localStorage
            });
          } else {
            this.props.history.push(`/error`);
          }
        }
      );
    }
  };
  componentDidUpdate = prevProps => {
    const prevSeasonNumber = prevProps.number,
      seasonNumber = this.props.number;
    if (seasonNumber !== prevSeasonNumber && seasonNumber !== null) {
      apiRequest({ name: "getSeason", parameters: { seasonNumber } }).then(
        response => {
          if (response.data) {
            const season = response.data,
              localStorage = getLocalStorage(season);
            this.setState({
              season,
              localStorage
            });
          } else {
            this.props.history.push(`/error`);
          }
        }
      );
    }
  };
  render() {
    if (window.innerWidth >= 992) {
      return (
        <Row type="flex">
          <Sidebar
            style={{ width: "100%" }}
            sidebarHeight={this.state.height}
            updateSeason={this.updateSeason}
            season={this.state.season}
            localStorage={this.state.localStorage}
          />
          <Rnd
            disableDragging
            enableResizing={{
              bottom: false,
              bottomLeft: false,
              bottomRight: false,
              left: true,
              right: false,
              top: false,
              topLeft: false,
              topRight: false
            }}
            default={{
              width: "60%"
            }}
            maxWidth={"70%"}
            minWidth={"30%"}
            style={{ position: "static" }}
          >
            <ContainerDimensions>
              {({ width }) => {
                return (
                  <Map
                    updateModerator={this.props.updateModerator}
                    mapLength={width}
                    updateHeight={this.updateHeight}
                    number={this.props.number}
                    data={processData(
                      this.state.season,
                      this.state.localStorage
                    )}
                  />
                );
              }}
            </ContainerDimensions>
          </Rnd>
        </Row>
      );
    }
    return (
      <Row type="flex">
        <ContainerDimensions style={{ width: "100%" }}>
          {({ width }) => {
            return (
              <Map
                updateModerator={this.props.updateModerator}
                mapLength={width}
                updateHeight={this.updateHeight}
                number={this.props.number}
                data={processData(this.state.season, this.state.localStorage)}
              />
            );
          }}
        </ContainerDimensions>
        <Sidebar
          style={{ width: "100%" }}
          sidebarHeight={this.state.height}
          updateSeason={this.updateSeason}
          season={this.state.season}
          localStorage={this.state.localStorage}
        />
      </Row>
    );
  }
}

export default withRouter(SidebarMapContainer);
