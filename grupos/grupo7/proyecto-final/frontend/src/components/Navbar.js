import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import isAuthenticated from "../lib/isAuthenticated";
import "./styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faPlusCircle,
  faHome,
  faDoorOpen,
  faKey,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
    };
  }

  render() {
    let botonesUsuario;

    if (this.state.loggedin && this.state.loggedin !== "") {
      botonesUsuario = (
        <>
          <button className="btn btn-sm btn-outline-light py-2 px-3">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            {this.state.loggedin}
          </button>
          <Link className="nav-link pr-0" to="/logout">
            <button className="btn btn-sm btn-outline-danger py-2 px-3 text-center">
              <FontAwesomeIcon icon={faDoorOpen} />
            </button>
          </Link>
        </>
      );
    } else {
      botonesUsuario = (
        <>
          <Link className="nav-link pr-0" to="/login">
            <button className="btn btn-sm btn-outline-light py-2 px-3 text-center">
              <FontAwesomeIcon icon={faKey} />
              <span className="d-none d-md-inline ml-2">Login</span>
            </button>
          </Link>
          <Link className="nav-link pr-0" to="/register">
            <button className="btn btn-sm btn-outline-light py-2 px-3 text-center">
              <FontAwesomeIcon icon={faUserPlus} />
              <span className="d-none d-md-inline ml-2">Registrar</span>
            </button>
          </Link>
        </>
      );
    }

    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <div className="container">
          <Navbar.Brand href="/">MyMemejs</Navbar.Brand>
          <Nav className="mx-auto">
            {/* <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/addmeme">
              AddMeme
            </Link> */}
          </Nav>
          <Nav className="justify-content-end">
            <Link className="nav-link pr-0" to="/">
              <button
                className="btn btn-sm btn-secondary py-2 px-3"
                title="Home"
              >
                <FontAwesomeIcon icon={faHome} />
              </button>
            </Link>
            <Link className="nav-link pr-0" to="/addmeme">
              <button
                className="btn btn-sm btn-secondary py-2 px-3"
                title="Agregar un Meme"
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </Link>
            {botonesUsuario}
          </Nav>
        </div>
      </Navbar>
    );
  }
}

export default MyNavbar;
