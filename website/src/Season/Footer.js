import React from "react";
import { Row } from "antd";
import { github, reddit } from "./../Images";

const Footer = () => {
  return (
    <Row>
      <div className="footer">
        <a href="https://github.com/20rohrichtt/fortnite_challenges">
          <img
            className="socialMediaIcon"
            src={github}
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
        </a>
        <a href="https://www.reddit.com/user/tmant1234/">
          <img
            className="socialMediaIcon"
            src={reddit}
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
        </a>
        <div className="footerText">
          Contact Me: taylorrohrich@fort-friend.com
        </div>
      </div>
      <div className="disclaimer">
        <hr className="separator" />
        <div className="disclaimerText">
          Portions of the materials used are trademarks and/or copyrighted works
          of Epic Games, Inc. All rights reserved by Epic. This material is not
          official and is not endorsed by Epic.
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="https://www.flaticon.com/authors/pixel-perfect"
          >
            {" "}
            Social Media Icons designed by pixel-perfect from Flaticon
          </a>
        </div>
      </div>
    </Row>
  );
};

export default Footer;
