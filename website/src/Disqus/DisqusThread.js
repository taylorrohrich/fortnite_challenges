import React from "react";
import PropTypes from "prop-types";

const SHORTNAME = "fort-friend";
const WEBSITE_URL = "http://fort-friend.com";

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://fort-friend.disqus.com/embed.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path
    );
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    const { id, title, path } = this.props;
    window.disqus_shortname = SHORTNAME;
    window.disqus_identifier = id;
    window.disqus_title = title;
    window.disqus_url = WEBSITE_URL + path;

    return <div id="disqus_thread" />;
  }
}

export default DisqusThread;
