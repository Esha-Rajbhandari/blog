import React, { Component } from "react";
import { Link } from "react-router-dom";
import { postLoginRequest } from "../request/request";
import { LOGIN_URL } from "../utils/config";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      userVerified: false
    };
  }

  validateUser() {
    postLoginRequest(LOGIN_URL, this.state, () => {
      this.setState({
        ...this.state,
        userVerified: true
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      {
        username: e.target.username.value,
        password: e.target.password.value
      },
      () => {
        this.validateUser();
      }
    );
  };

  render() {
    return (!this.state.userVerified && !localStorage.getItem('token')) ? (
      <div className="container w-50">
        <div className="card">
          <div className="card-body">
            <form method="post" onSubmit={this.handleSubmit} action="">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <div>
                Dont have an account?{" "}
                <Link to="/api/user/register">Register here</Link>{" "}
              </div>
              <button type="submit" className="btn btn-primary login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/api/user/dashboard" />
    );
  }
}

export default Login;
