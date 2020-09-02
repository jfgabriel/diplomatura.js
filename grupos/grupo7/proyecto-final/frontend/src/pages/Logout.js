import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./styles/Home.css";
import logout from "../lib/logout";

export default class Logout extends Component {
  logoutClick = () => {
    logout();
    this.props.history.push("/");
    window.location.reload(false);
  };

  render() {
    return (
      <div className="Logout">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <p>Estas seguro?</p>
              <Button variant="success" onClick={this.logoutClick}>
                Si
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
