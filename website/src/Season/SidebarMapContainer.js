import React, { Component } from "react";
import "./../App.css";
import Map from "../Season/Map";
import Sidebar from "./../Sidebar";
import { handleLocalStorage, processData } from "../Utils";
//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Row } from "antd";
import { seasonQuery } from "./../Database";
import ContainerDimensions from "react-container-dimensions";
import Rnd from "react-rnd";

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

  grabSelectedSeason = number => {
    if (this.state.seasons) {
      return this.state.seasons.find(element => {
        return element.number === number;
      });
    }
  };

  static getDerivedStateFromProps(nextProps) {
    const seasonQuery = nextProps.seasonQuery;
    if (seasonQuery && seasonQuery.allSeasons) {
      const selectedSeason = seasonQuery.allSeasons;
      if (!selectedSeason.length) {
        nextProps.history.push(`/error`);
      } else {
        return {
          season: selectedSeason[0],
          localStorage: handleLocalStorage(selectedSeason[0])
        };
      }
    } else {
      return {};
    }
  }
  render() {
    if (window.innerWidth >= 992) {
      return (
        <Row type="flex">
          <Sidebar
            sidebarHeight={this.state.height}
            updateSeason={this.updateSeason}
            data={this.state.season}
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
          data={this.state.season}
          localStorage={this.state.localStorage}
        />
      </Row>
    );
  }
}
const SidebarMapContainerWithQuery = compose(
  graphql(seasonQuery, {
    name: "seasonQuery",
    skip: props => !props.number,
    options: props => ({
      variables: {
        number: props.number
      }
    })
  })
)(withRouter(SidebarMapContainer));

export default SidebarMapContainerWithQuery;
