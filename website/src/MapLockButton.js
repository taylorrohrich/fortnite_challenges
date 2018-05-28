import React, {Component} from "react";

class MapLockButton extends Component {
  render() {
    return (
      <div
        className={"cn--map-lock-btn"}
      >
        <a
          onClick={this.props.onClick}
          className={"map-lock-btn"}
        >
          <div
            className={`map-lock-btn-icn ${this.props.isMapLocked ? "lock": "unlock"}`}
          />
        </a>
      </div>
    )
  }
}

export default MapLockButton;