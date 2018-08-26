import React, { Component } from "react";
import "./../../App.css";
import CoordinateTile from "./CoordinateTile";

class Coordinate extends Component {
  mapLocations = (
    locations,
    iconID,
    challengeID,
    coordinate,
    locationIndex
  ) => {
    return locations.map((location, index) => {
      return (
        <CoordinateTile
          location={location}
          iconID={iconID}
          challengeID={challengeID}
          coordinate={locationIndex === index + 1 ? coordinate : null}
          childDidUpdate={this.props.childDidUpdate}
          index={index}
          changeParentState={this.props.changeParentState}
        />
      );
    });
  };
  render() {
    const {
      locations,
      iconID,
      challengeID,
      locationIndex,
      coordinate
    } = this.props;
    return (
      <div>
        <CoordinateTile
          iconID={iconID}
          challengeID={challengeID}
          childDidUpdate={this.props.childDidUpdate}
          changeParentState={this.props.changeParentState}
          coordinate={locationIndex === 0 ? coordinate : null}
          index={0}
        />
        {this.mapLocations(
          locations,
          iconID,
          challengeID,
          coordinate,
          locationIndex
        )}
      </div>
    );
  }
}

export default Coordinate;
