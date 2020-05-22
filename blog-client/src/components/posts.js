import React, { Component } from "react";
import Navbar from "./navbar";
import AddPosts from "./addPost";
import { Link } from "react-router-dom";
import { getBlogRequest, deletePostRequest } from "../request/request";

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      url:
        "http://localhost:3030" +
        window.location.pathname +
        window.location.search,
      action: null
    };

    getBlogRequest(this.state.url, (result, action) => {
      this.setState({
        posts: result,
        action: action.action
      });
    });
  }

  componentWillReceiveProps(nextProp) {
    const url =
      "http://localhost:3030" +
      nextProp.location.pathname +
      nextProp.location.search;
    getBlogRequest(url, (result, action) => {
      let id = "";
      if (action.id) {
        id = action.id;
      }
      this.setState({
        posts: result,
        action: action.action,
        id: id
      });
    });
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="row">
          <div className="col-md-12">
            <ul>
              <li>
                <Link to="posts?action=add">Add</Link>
              </li>
            </ul>
          </div>
        </div>
        {this.state.action === undefined ? (
          this.state.posts.map(post => {
            console.log(post);
            return (
              <div className="card" key={post.id}>
                <div className="card-body">
                  <div className="card-header">
                    <div className="card-title">
                      <h4 className="card-title blog-title">
                        {post.blog_title}
                      </h4>
                    </div>
                    <div className="post-action">
                      <ul>
                        <li>
                          <Link to={`posts?action=add&id=${post.id}`}>
                            Edit
                          </Link>
                        </li>
                        <span>|</span>
                        <li>
                          <Link to={`posts?action=remove&id=${post.id}`}>
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="card-text blog-content">{post.blog_content}</p>
                  <div>
                    <img
                      src={post.blog_image}
                      className="w-50"
                    />
                  </div>
                  <span className="date_posted">
                    Posted on: {post.date_posted} | By:{" "}
                    <Link to="posts?name">Esha Rajbhandari</Link>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <AddPosts id={this.state.id} action={this.state.action} />
        )}
      </div>
    );
  }
}

export default Posts;
