import React, { Component } from "react";

import "./styles/Home.css";

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: props.userName,
    };
  }

  render() {
    return (
      <div className="Logout">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <p>Are you sure?</p>
              Yes / No
            </div>
          </div>
        </div>
      </div>
    );
  }
}
