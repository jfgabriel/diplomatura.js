import React, { Component } from "react";
import AddMeme from "../components/AddMeme";

export default class AddMeme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: props.userName,
    };
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <h1>Add Meme</h1>
              <AddMeme
                categorias={[
                  { id: 1, nombre: "humor" },
                  { id: 2, nombre: "politica" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
