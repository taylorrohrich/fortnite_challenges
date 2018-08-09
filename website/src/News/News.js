import React, { Component } from "react";
import PostThumbnail from "./PostThumbnail";
import AdSidebar from "./AdSidebar";
import Navbar from "./../Navbar";
import Header from "./Header";
const mapPostThumbnails = posts => {
  return posts.map(post => <PostThumbnail post={post} />);
};
class News extends Component {
  state = {};

  render() {
    const posts = [
      {
        imageUrl: null,
        title: "Test",
        description: "test description"
      }
    ];
    return (
      <div className="news">
        <Navbar />
        <Header />
        <div className="newsContent">
          <AdSidebar />
          <div className="postThumbnailContainer">
            {mapPostThumbnails(posts)}
          </div>
          <AdSidebar />
        </div>
      </div>
    );
  }
}

export default News;
