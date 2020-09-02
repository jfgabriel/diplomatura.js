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
              <MemeComs
                userName={this.state.loggedin}
                meme={
                  new Object({
                    _id: "5f4bd56a9dab6ce39803687c",
                    comentarios: [
                      {
                        idMeme: 1,
                        usuario: "Jacinto",
                        fecha: "30/08/2020 17:00",
                        descripcion:
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et tincidunt nisl, vitae lacinia augue",
                      },
                      {
                        idMeme: 2,
                        usuario: "Pablito",
                        fecha: "30/08/2020 17:00",
                        descripcion: "Nulla efficitur sodales porttitor",
                      },
                      {
                        idMeme: 3,
                        usuario: "Laura",
                        fecha: "30/08/2020 17:00",
                        descripcion:
                          "Phasellus ultrices scelerisque risus ac vestibulum",
                      },
                    ],
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
