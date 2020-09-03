import React, { Component } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
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
        <>
          <Card className="my-2 cardMeme">
            <Card.Header className="memeHead">
              <Row>
                <Col xs="12" md="6" className="text-left">
                  <h1>Registrar</h1>
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
                <Form.Group controlId="formGroupUsername">
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
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    pattern=".{2,50}"
                    required
                    value={email}
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    pattern=".{3,20}"
                    value={password}
                    onChange={this.onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </Form.Group>
                <p>
                  ¿Ya tenés usuario? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </>
      );
    }
  }
}
