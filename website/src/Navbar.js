import React, { Component } from "react";
import "./App.css";

//node modules
import { Layout, Modal } from "antd";
const { Header } = Layout;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  mapSeasons = () => {
    let seasons = this.props.data;
    return seasons.map(season => {
      return (
        <div
          className="headerItem"
          onClick={() => {
            this.props.updateSelectedSeason(season.number);
          }}
          key={season.number}
        >
          <b>Season {season.number}</b>
        </div>
      );
    });
  };

  render() {
    if (this.props.loading) {
      return <div />;
    }
    if (!this.props.data) {
      return (
        <Header style={{ padding: "0px" }} className="header">
          <div className="logo">FortFriend</div>
          <div className="headerItem">Loading...</div>
        </Header>
      );
    } else {
      return (
        <Header style={{ padding: "0px" }} className="header">
          <div className="logo">FortFriend</div>
          {/* {this.mapSeasons()} will add back at a later date*/}
          <div
            onClick={() => this.setState({ showModal: !this.state.showModal })}
            className="headerItem"
          >
            <b>Donate</b>
          </div>
          <Modal
            footer={null}
            title="Why Support FortFriend?"
            visible={this.state.showModal}
            onCancel={() => this.setState({ showModal: !this.state.showModal })}
          >
            <div style={{ padding: "10px" }}>
              <p style={{ fontSize: ".85em", paddingBottom: "10px" }}>
                My name is Taylor, although you may better know me on Reddit as
                u/tmant1234. In the past several weeks since I have launched
                fort-friend.com, I have been completely overjoyed by the
                positive support from the Fortnite community: rest assured the
                site is here to stay and will be updated every week. In the
                first two weeks since the launch of the website, I am proud to
                say there has been over 60,000 unique users to the site! I am
                ecstatic and humbled that so many people find my project useful;
                however, this amount of traffic put enough strain on my previous
                website hosting services that it was necessary to pay for
                higher-end services that can support the load on the site. This
                is what brings us here: I have no intention of profiting from
                FortFriend, simply breaking even. Want to donate? Great! I
                really appreciate any amount to help keep the (internet) lights
                on: <b>you can find my link to Donorbox below.</b> Holding off
                on donating? That’s ok too! You will still get complete access
                to fort-friend.com. I look forward to continuing support and
                keeping you up to date with challenges each week! <br />-Taylor,
                developer of FortFriend
              </p>
              <a href="https://donorbox.org/fort-friend">
                <img
                  className="donorButton"
                  src="https://d1iczxrky3cnb2.cloudfront.net/button-large-blue.png"
                  alt=""
                />
              </a>
            </div>
          </Modal>
        </Header>
      );
    }
  }
}

export default Navbar;
