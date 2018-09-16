import React from "react";
//node modules
import netlifyIdentity from "netlify-identity-widget";

class Authentication extends React.Component {
  componentDidMount() {
    const type = this.props.match.params.type;
    if (type == "logout") {
      netlifyIdentity.logout();
      this.props.history.goBack();
    } else {
      netlifyIdentity.open("login");
      netlifyIdentity.on("logout", () => {
        netlifyIdentity.close();
        this.props.history.goBack();
      });
      netlifyIdentity.on("login", () => {
        netlifyIdentity.close();
        this.props.history.goBack();
      });
    }
  }
  render() {
    return <div />;
  }
}

export default Authentication;
