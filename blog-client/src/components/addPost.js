import React, { Component } from "react";
import {
  postBlogRequest,
  getBlogPostRequest,
  deletePostRequest
} from "../request/request";

class AddPosts extends Component {
  constructor(props) {
    super();

    this.state = {
      blog_posts: {
        blog_title: "",
        blog_content: "",
        date_posted: null,
        blog_image: null,
        user_id: null
      },
      blog_id: props.id ? props.id : null,
      blog_action: props.action
    };
  }

  componentWillMount() {
    if (this.state.blog_id !== null) {
      if (this.state.blog_action === "remove") {
        deletePostRequest(
          "http://localhost:3030" +
            window.location.pathname +
            window.location.search
        );
      } else {
        getBlogPostRequest(
          "http://localhost:3030" +
            window.location.pathname +
            window.location.search,
          data => {
            this.setState({
              ...this.state,
              blog_posts: data
            });
          }
        );
      }
    }
  }

  getCurrentDate = () => {
    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    return date;
  };

  reset = target => {
    target.blog_title.value = "";
    target.blog_content.value = "";
    this.setState({
      ...this.state,
      blog_posts: {
        blog_title: "",
        blog_content: "",
        date_posted: null,
        user_id: null
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let target = e.target;
    let url = URL.createObjectURL(e.target.blog_image.files[0]);
    let formData = new FormData();
    formData.append('blog_title', e.target.blog_title.value);
    formData.append('blog_content', e.target.blog_content.value);
    formData.append('date_posted', this.getCurrentDate());
    formData.append("file", e.target.blog_image.files[0]);
    formData.append("blog_image", url);
    for(let key of formData.entries()){
      console.log(key[0] + ' ' + key[1]);
    }
    this.setState(
      {
        ...this.state,
        blog_posts: {
          blog_title: e.target.blog_title.value,
          blog_content: e.target.blog_content.value,
          date_posted: this.getCurrentDate(),
          url: url
        }
      },
      () => {
        postBlogRequest(
          "http://localhost:3030" +
            window.location.pathname +
            window.location.search,
          formData
        );
        this.reset(target);
      }
    );
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            {this.state.blog_id === null ? (
              <form
                method="post"
                id="blog_post_form"
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <label htmlFor="blog_title">Title</label>
                  <input
                    type="text"
                    name="blog_title"
                    id="blog_title"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="blog_content"
                    id="blog_content"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="custom-file form-group">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="blog_image"
                    id="customFile"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose file
                  </label>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            ) : (
              <form method="post" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="blog_title">Title</label>
                  <input
                    type="text"
                    name="blog_title"
                    id="blog_title"
                    className="form-control"
                    defaultValue={this.state.blog_posts.blog_title}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="blog_content"
                    id="blog_content"
                    className="form-control"
                    defaultValue={this.state.blog_posts.blog_content}
                  ></textarea>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddPosts;
