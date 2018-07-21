import React, { Component } from "react";
import "./../App.css";
import Map from "../Season/Map";
import Sidebar from "./../Sidebar";
import { handleLocalStorage, processData } from "../Utils";
//node modules
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import { seasonQuery } from "./../Database";
import ContainerDimensions from "react-container-dimensions";

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
    return (
      <Row type="flex">
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 10, order: 1 }}
          xl={{ span: 10, order: 1 }}
          xxl={{ span: 8, order: 1 }}
        >
          <Sidebar
            sidebarHeight={this.state.height}
            updateSeason={this.updateSeason}
            data={this.state.season}
            localStorage={this.state.localStorage}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 14, order: 2 }}
          xl={{ span: 14, order: 2 }}
          xxl={{ span: 16, order: 2 }}
        >
          <ContainerDimensions>
            {({ width }) => (
              <Map
                updateModerator={this.props.updateModerator}
                mapLength={width}
                updateHeight={this.updateHeight}
                number={this.props.number}
                data={processData(this.state.season, this.state.localStorage)}
              />
            )}
          </ContainerDimensions>
        </Col>
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
