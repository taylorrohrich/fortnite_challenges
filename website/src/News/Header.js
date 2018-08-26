import React, { Component } from "react";
import "./News.css";
class Header extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="newsHeader">
          <div className="newsSection">New</div>
          <div className="newsSection">Top</div>
          <div className="newsSection">Cosmetics</div>
        </div>
        <hr
          style={{
            color: "lightgrey",
            height: "1px",
            borderTop: 0,
            marginBottom: 0
          }}
        />
      </div>
    );
  }
}

export default Header;
