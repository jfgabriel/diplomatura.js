import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import isAuthenticated from "../lib/isAuthenticated";

import "./styles/Navbar.css";

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
    };
  }

  render() {
    console.log(this.state.loggedin);
    if (this.state.loggedin && this.state.loggedin !== "") {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">MyMemejs Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/addmeme">
              AddMeme
            </Link>
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </Nav>
        </Navbar>
      );
    } else {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">MyMemejs Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/addmeme">
              AddMeme
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </Nav>
        </Navbar>
      );
    }
  }
}

export default MyNavbar;
