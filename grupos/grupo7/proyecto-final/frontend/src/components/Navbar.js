import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import isAuthenticated from "../lib/isAuthenticated";
import "./styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoBig from "../img/logo.png";
import logoSmall from "../img/favicon.png";

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
    const avatar = localStorage.getItem("mymemejs_avatar");

    this.state = {
      loggedin: isAuthenticated(),
      avatar,
    };
  }

  handleLogout = () => this.props.setShow(true);

  render() {
    let botonesUsuario;

    if (this.state.loggedin && this.state.loggedin !== "") {
      botonesUsuario = (
        <>
          <div className="nav-link pr-0 ">
            <button className="btn btn-sm btn-outline-light py-2 px-3 navbarbtn">
              <img src={this.state.avatar} alt="avatar" />
              <span className="d-none d-md-inline ml-2">
                {this.state.loggedin}
              </span>
            </button>
          </div>
          <div className="nav-link pr-0">
            <button
              className="btn btn-sm btn-outline-danger py-2 px-3 text-center"
              onClick={this.handleLogout}
            >
              <FontAwesomeIcon icon={faDoorOpen} />
            </button>
          </div>
        </>
      );
    } else {
      botonesUsuario = (
        <>
          <Link className="nav-link pr-0" to="/login">
            <button className="btn btn-sm btn-outline-light py-2 px-3 text-center navbarbtn">
              <FontAwesomeIcon icon={faKey} />
              <span className="d-none d-md-inline ml-2">Login</span>
            </button>
          </Link>
          <Link className="nav-link pr-0" to="/register">
            <button className="btn btn-sm btn-outline-light py-2 px-3 text-center navbarbtn">
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
          <Navbar.Brand href="/">
            {/*<img id="logo" ></img>*/}
            <img
              src={logoBig}
              alt="MyMemeJS"
              className="d-none d-sm-block logo"
            />
            <img
              src={logoSmall}
              alt="MyMemeJS"
              className="d-block d-sm-none logo"
            />
          </Navbar.Brand>
          <Nav className="mx-auto"></Nav>
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
