import React, {Component} from "react";

class MapLockButton extends Component {
  render() {
    return (
      <div
        className={"cn--mobile-map-lock-btn"}
      >
        <a
          onClick={this.props.onClick}
          className={"mobile-map-lock-btn"}
        >
          <div
            className={`mobile-map-lock-btn-icn ${this.props.isMapLocked ? "lock": "unlock"}`}
          />
        </a>
      </div>
    )
  }
}

export default MapLockButton;