import React from "react";
import "./../App.css";

const Error = props => {
  return (
    <div className={"Error"}>
      <div>
        <h1>ERROR</h1>
        <h3 style={{ color: "lightgrey" }}>
          something went wrong: The page you are trying to access does not
          exist.
        </h3>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => props.history.push(`/`)}
        >
          Go back to homepage
        </h5>
      </div>
    </div>
  );
};
export default Error;
