import React, { Component } from "react";
import MemeComs from "../components/MemeComs";
//import "semantic-ui-css/semantic.min.css";

export default class MemeComsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "miUser", //props.userName,
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
                userName={this.state.userName}
                comments={[
                  {
                    id: 1,
                    author: "Jacinto",
                    date: "30/08/2020 17:00",
                    comment:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et tincidunt nisl, vitae lacinia augue",
                  },
                  {
                    id: 2,
                    author: "Pablito",
                    date: "30/08/2020 17:00",
                    comment: "Nulla efficitur sodales porttitor",
                  },
                  {
                    id: 3,
                    author: "Laura",
                    date: "30/08/2020 17:00",
                    comment:
                      "Phasellus ultrices scelerisque risus ac vestibulum",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
