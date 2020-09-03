import React, { Component } from "react";
import AddMeme from "../components/AddMeme";
import isAuthenticated from "../lib/isAuthenticated";
import { Card, Row, Col } from "react-bootstrap";

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
      <Card className="my-2 cardMeme">
        <Card.Header className="memeHead">
          <Row>
            <Col xs="12" md="6" className="text-left">
              <h1>Subir Meme</h1>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <AddMeme usuario={userName} />
        </Card.Body>
      </Card>
    );
  }
}
