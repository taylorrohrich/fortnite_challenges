import React from "react";
import DropzoneComponent from "react-dropzone-component";

export default class Dropzone extends React.Component {
  constructor(props) {
    super(props);

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif"
    };

    this.componentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: "no-url"
    };
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      addedfile: this.props.callback,
      removedfile: () => this.props.callback(null)
    };

    return (
      <DropzoneComponent
        config={config}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}
      />
    );
  }
}
