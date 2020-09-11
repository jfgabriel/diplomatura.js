import React, { Component } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "./styles/Login.css";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import isAuthenticated from "../lib/isAuthenticated";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
      username: "",
      password: "",
      message: "",
    };
  }

  submit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { username, password } = this.state;

    axios
      .post(process.env.REACT_APP_API_URL + "user/login", {
        username,
        password,
      })
      .then((result) => {
        if (result.data.login === "ok") {
          localStorage.setItem("mymemejs_jwt", result.data.token);
          localStorage.setItem("mymemejs_username", result.data.username);
          this.props.history.push("/");
          window.location.reload(false);
        } else {
          this.setState({
            message: "Login failed. Username or password not match",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({
            message: "Login failed. Username or password not match",
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
    const { username, password, message } = this.state;
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
        <>
          <Card className="my-2 cardMeme m-1">
            <Card.Header className="memeHead">
              <Row>
                <Col xs="12" md="6" className="text-left">
                  <h1>Login</h1>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={this.submit.bind(this)}>
                {message !== "" && (
                  <div
                    className="alert alert-warning alert-dismissible"
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    pattern=".{2,20}"
                    required
                    value={username}
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    pattern=".{3,50}"
                    value={password}
                    onChange={this.onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <button
                    className="btn btn-sm py-2 px-3 text-center navbarbtnlog"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faKey} />
                    <span className="d-none d-md-inline ml-2">Login</span>
                  </button>
                </Form.Group>
                <p>
                  ¿No estas registrado?{" "}
                  <Link to="/register">Registrate acá</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </>
      );
    }
  }
}
