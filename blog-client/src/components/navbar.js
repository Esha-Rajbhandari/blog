import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedOut: false
    };
  }

  handleClick = e => {
    localStorage.removeItem("token");
    this.setState({
      isLoggedOut: true
    });
  };

  render() {
    return !this.state.isLoggedOut ? (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <NavLink className="navbar-brand" to="dashboard">
          BlogIt
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="dashboard">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="posts">
              Posts
            </NavLink>
          </li>
          <li className="nav-item">
            <span className="nav-link logout" onClick={this.handleClick}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default Navbar;
