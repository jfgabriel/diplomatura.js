import React, { Component } from "react";
import MemeComs from "../components/MemeComs";
import isAuthenticated from "../lib/isAuthenticated";

export default class MemeComsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
    };
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Comments</h1>
              <MemeComs userName={this.state.loggedin} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
