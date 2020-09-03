import React, { Component } from "react";
import AddMeme from "../components/AddMeme";
import isAuthenticated from "../lib/isAuthenticated";

export default class AddMemePage extends Component {
  constructor(props) {
    super(props);
    const userName = isAuthenticated();

    this.state = {
      userName,
    };
  }

  render() {
    const { userName } = this.state;
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <h1>Add Meme</h1>
              <AddMeme usuario={userName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
