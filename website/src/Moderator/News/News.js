import React, { Component } from "react";
import "./../../App.css";
import Dropzone from "react-dropzone";
import { Button } from "antd";
class News extends Component {
  state = {
    files: []
  };
  onDrop = files => {
    this.setState({
      files
    });
    //   acceptedFiles.forEach(file => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const fileAsBinaryString = reader.result;
    //       // do whatever you want with the file content
    //     };
    //     reader.onabort = () => console.log("file reading was aborted");
    //     reader.onerror = () => console.log("file reading has failed");

    //     reader.readAsBinaryString(file);
    //   });
  };
  submitPictures = () => {
    const pictures = this.state.files.length && this.state.files[0];
    // let data = new FormData();
    // console.log(pictures);
    // data.append("data", pictures);

    // return fetch(
    //   "https://us-central1-fortfriend-cbb2b.cloudfunctions.net/posts",
    //   {
    //     method: "POST",
    //     body: data
    //   }
    // ).then(response => {
    //   console.log(response);
    // });
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    imgBody.append("image", pictures);
    const url = `https://us-central1-fortfriend-cbb2b.cloudfunctions.net/api/post-image`;
    // Perform the request. Note the content type - very important
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: imgBody
    })
      .then(res => res.json())
      .then(results => {
        console.log(results);
        // // Just me assigning the image url to be seen in the view
        // const source = { uri: results.imageUrl, isStatic: true };
        // const images = this.state.images;
        // images[index] = source;
        // this.setState({ images });
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <div>
        {console.log(this.state)}
        <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false} />
        <Button onClick={() => this.submitPictures()}> Submit </Button>
      </div>
    );
  }
}

export default News;
