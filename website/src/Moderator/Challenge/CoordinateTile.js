import React, { Component } from "react";
import "./../../App.css";
import apiRequest from "./../../Controllers";
import Dropzone from "./../../Dropzone";
import { Row, Col, Card, Input, Button } from "antd";

class CoordinateTile extends Component {
  state = {
    challengeID: null,
    imageURL: null,
    iconID: null,
    description: null,
    coordinates: null,
    referral: "https://goo.gl/3E9zHr",
    credit: "roons11br",
    locationID: null,
    file: null
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { location, iconID, challengeID, coordinate } = nextProps;
    if (location) {
      const {
        ImageURL,
        LocationDescription,
        Coordinates,
        Referral,
        Credit,
        LocationID
      } = location;
      return {
        challengeID,
        iconID,
        imageURL: ImageURL,
        description: LocationDescription,
        coordinates: coordinate || JSON.parse(Coordinates),
        referral: Referral,
        credit: Credit,
        locationID: LocationID
      };
    }
    return {
      challengeID,
      iconID,
      ImageURL: null,
      locationDescription: null,
      coordinates: coordinate || null,
      referral: "https://goo.gl/3E9zHr",
      credit: "roons11br",
      locationID: null
    };
  }
  createLocation = () => {
    const {
      challengeID,
      iconID,
      description,
      coordinates,
      referral,
      credit,
      file
    } = this.state;
    if (
      challengeID &&
      iconID &&
      description &&
      referral &&
      credit &&
      coordinates
    ) {
      const formData = {
        challengeID,
        iconID,
        description,
        coordinates: JSON.stringify(coordinates),
        referral,
        credit,
        file,
        type: "tooltip"
      };
      apiRequest({ name: "postLocationCreate", formData }).then(response => {
        this.props.childDidUpdate();
        this.setState({
          challengeID: null,
          imageURL: null,
          iconID: null,
          description: null,
          coordinates: null,
          referral: "https://goo.gl/3E9zHr",
          credit: "roons11br",
          locationID: null,
          file: null
        });
      });
    }
  };
  updateLocation = () => {
    const {
      locationID,
      challengeID,
      iconID,
      description,
      coordinates,
      referral,
      credit,
      file
    } = this.state;
    if (
      locationID &&
      challengeID &&
      iconID &&
      description &&
      referral &&
      credit &&
      coordinates
    ) {
      const formData = {
        locationID,
        challengeID,
        iconID,
        description,
        coordinates: JSON.stringify(coordinates),
        referral,
        credit,
        file,
        type: "tooltip"
      };
      apiRequest({ name: "postLocationUpdate", formData }).then(response => {
        this.props.childDidUpdate();
      });
    }
  };
  mapInput = () => {
    const input = [
      { name: "credit", description: "provided by" },
      { name: "referral", description: "referral Link" },
      { name: "description", description: "location Description" }
    ];
    return input.map(item => (
      <Row key={item.name + "input"} style={{ padding: "15px" }} gutter={16}>
        <Input
          onChange={e => {
            this.setState({ [item.name]: e.target.value });
          }}
          placeholder={item.description}
          value={this.state[item.name]}
        />
      </Row>
    ));
  };
  render() {
    const { imageURL, locationID, coordinates } = this.state,
      location = this.props.location;
    return (
      <Card
        extra={
          <div>
            <Button
              onClick={() => this.props.changeParentState(this.props.index)}
            >
              Update Coordinates
            </Button>
            {location ? (
              <span>
                <Button onClick={() => this.updateLocation()}>Update</Button>
                <Button
                  onClick={() => {
                    apiRequest({
                      name: "postLocationDelete",
                      body: { locationID }
                    }).then(response => {
                      this.props.childDidUpdate();
                    });
                  }}
                  type={"danger"}
                >
                  Delete
                </Button>
              </span>
            ) : (
              <Button onClick={() => this.createLocation()}>Create</Button>
            )}
          </div>
        }
        style={{ width: "100%" }}
      >
        <Row style={{ padding: "15px" }} gutter={16}>
          <Dropzone
            callback={file => {
              this.setState({ file });
            }}
          />
          {imageURL && <img src={imageURL} alt={"upload"} />}
        </Row>
        <Row>
          <Col span={12}>
            <Input value={coordinates && coordinates.x} disabled />
          </Col>
          <Col span={12}>
            <Input value={coordinates && coordinates.y} disabled />
          </Col>
        </Row>
        {this.mapInput()}
      </Card>
    );
  }
}

export default CoordinateTile;
