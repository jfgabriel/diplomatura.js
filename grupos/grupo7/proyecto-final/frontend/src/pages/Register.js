import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import isAuthenticated from "../lib/isAuthenticated";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
      username: "",
      email: "",
      password: "",
      message: "",
    };
  }

  submit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { username, email, password } = this.state;

    axios
      .post("http://localhost:8000/user/register", {
        username,
        email,
        password,
      })
      .then((result) => {
        if (result.data.registration === "ok") {
          localStorage.setItem("mymemejs_jwt", result.data.token);
          localStorage.setItem("mymemejs_username", result.data.username);
          this.props.history.push("/");
          window.location.reload(false);
        } else {
          this.setState({
            message: "Registration failed.",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({
            message: "Registration failed. Error occured.",
          });
        }
      });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const { username, email, password, message } = this.state;
    if (this.state.loggedin && this.state.loggedin !== "") {
      return (
        <Redirect
          to={{
            pathname: "/",
            //state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <div>
          <h1>Register</h1>
          <form onSubmit={this.submit.bind(this)}>
            {message !== "" && (
              <div
                className="alert alert-warning alert-dismissible"
                role="alert"
              >
                {message}
              </div>
            )}
            <div>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                pattern=".{2,16}"
                required
                value={username}
                onChange={this.onChange}
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="text"
                name="email"
                pattern=".{2,16}"
                required
                value={email}
                onChange={this.onChange}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                pattern=".{3,20}"
                value={password}
                onChange={this.onChange}
                required
              />
            </div>
            <div>
              <input type="submit" value="Log in" />
            </div>
            <p>
              No estas registrado?
              <Link to="/register">Registrate acá</Link>
            </p>
          </form>
        </div>
      );
    }
  }
}
