import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./styles/Navbar.css";

class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">MyMemejs Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/link1">
            Link1
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </Nav>
      </Navbar>
    );
  }
}

export default MyNavbar;
