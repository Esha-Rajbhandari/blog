import React, { Component } from "react";
import { getRequest } from "../request/request";
import { REGISTER_URL } from "../utils/config";
import { Link } from "react-router-dom";
import FormError from "./error";
import swal from "@sweetalert/with-react";
import { generateHash } from "../utils/pwdHash";

class Register extends Component {
  constructor() {
    super();

    this.initState = {
      user: {
        fName: "",
        lName: "",
        username: "",
        email: "",
        password: "",
        confirm_password: ""
      },
      error: {
        usernameError: {
          hasError: false,
          errorMessage: ""
        },
        fNameError: {
          hasError: false,
          errorMessage: ""
        },
        lNameError: {
          hasError: false,
          errorMessage: ""
        },
        emailError: {
          hasError: false,
          errorMessage: ""
        },
        passwordError: {
          hasError: false,
          errorMessage: ""
        },
        confirmPasswordError: {
          hasError: false,
          errorMessage: ""
        }
      },
      hasError: false
    };
    this.state = this.initState;
  }

  validateForm = () => {
    let err = true;
    for (const key of Object.keys(this.state.user)) {
      console.log(this.state.user[key]);
      if (this.state.user[key] === "") {
        err = true;
        break;
      } else {
        err = false;
      }
    }
    if (!err) {
      this.sendData();
    } else {
      swal("Error", "Cannot have empty fields", "error");
    }
  };

  sendData = () => {
    if (!this.state.hasError) {
      this.setState(
        {
          ...this.state,
          user: {
            ...this.state.user,
            password: generateHash(this.state.user.password)
          }
        },
        () => {
          getRequest(REGISTER_URL + this.state.user.email, this.state);
        }
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.validateForm();
  };

  validatePassword = password => {
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
    if (!regularExpression.test(password)) {
      this.setState({
        ...this.setState,
        error: {
          ...this.state.error,
          passwordError: {
            hasError: true,
            errorMessage:
              "Password must contain one special character, at least a number and must be 8-10 characters long"
          }
        }
      });
    } else {
      this.setState({
        ...this.setState,
        error: {
          ...this.state.error,
          passwordError: {
            hasError: false
          }
        }
      });
    }
  };

  handleChange = e => {
    const id = e.target.id;
    const val = e.target.value;
    const target = e.target;
    this.setState(
      {
        user: {
          ...this.state.user,
          [e.target.id]: e.target.value
        }
      },
      () => {
        this.validateEmptyForm(id, val, target);
        if (id === "password") {
          this.validatePassword(val);
        }
      }
    );
  };

  validateEmptyForm = (id, val, target) => {
    if (this.state.user[id] === "") {
      target.classList.add("error");
      this.setState(
        {
          ...this.state,
          error: {
            ...this.state.error,
            [id + "Error"]: {
              hasError: true,
              errorMessage: "Empty form not valid"
            }
          }
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      target.classList.remove("error");
      this.setState({
        ...this.state,
        error: {
          ...this.state.error,
          [id + "Error"]: {
            hasError: false
          }
        }
      });
    }
  };

  render() {
    return (
      <div className="container w-50">
        <div className="card">
          <div className="card-body">
            <form method="post" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="fName">First Name</label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <FormError error={this.state.error.fNameError} />
              </div>
              <div className="form-group">
                <label htmlFor="lName">Last Name</label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <FormError error={this.state.error.lNameError} />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <FormError error={this.state.error.usernameError} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <FormError error={this.state.error.emailError} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <FormError error={this.state.error.passwordError} />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <FormError error={this.state.error.confirmPasswordError} />
              </div>
              <div>
                Already Registered? <Link to="/api/auth/login">Login here</Link>{" "}
              </div>
              {this.state.hasError ? (
                <button
                  type="submit"
                  className="btn btn-primary login-btn"
                  disabled
                >
                  Register
                </button>
              ) : (
                <button type="submit" className="btn btn-primary login-btn">
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
