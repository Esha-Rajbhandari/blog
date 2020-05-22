import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPostRequest } from "../request/request";
import { POST_URL } from "../utils/config";
import Navbar from "./navbar";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    getPostRequest(POST_URL, result => {
      this.setState({
        posts: result
      });
    });
  }

  getCurrentDate = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    return date;
  };

  render() {
    return (
      <div className="container">
        <Navbar />
        {this.state.posts.map(post => {
          return (
            <div className="card" key={post.id}>
              <div className="card-body">
                <h4 className="card-title blog-title">{post.blog_title}</h4>
                <p className="card-text blog-content">{post.blog_content}</p>
                <span className="date_posted">
                  Posted on: {post.date_posted} | By:{" "}
                  <Link to="posts?name">Esha Rajbhandari</Link>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
