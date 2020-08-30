import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./styles/Navbar.css";

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: props.userName,
        };
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">MyMemejs Home</Navbar.Brand>
                <Nav className="mr-auto">
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

export default MyNavbar;
