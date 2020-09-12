import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./styles/meme.css";
import { Redirect, Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import VoteService from "../services/voteService";

const TIPO_UPVOTE = "upvote";
const TIPO_DOWNVOTE = "downvote";

export default class Meme extends React.Component {
  constructor(props) {
    super(props);
    let votoActual = "";
    if (props.meme.votos.length === 1) {
      votoActual = props.meme.votos[0].tipo;
    }
    this.state = {
      meme: props.meme,
      votoActual,
      userName: props.userName,
      redirectLogin: false,
      redirectMeme: "",
      votando: false,
      votandoError: "",
    };
  }

  votar = async (votoSolicitado) => {
    // function timeout(ms) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    const { _id } = this.state.meme;
    const { userName, votando, meme, votoActual } = this.state;
    if (!votando) {
      if (userName) {
        this.setState({ votando: true, votandoError: "" });
        if (
          await VoteService.votar(meme, userName, votoActual, votoSolicitado)
        ) {
          this.setState({
            votando: false,
            meme: meme,
            votoActual: votoSolicitado === votoActual ? "" : votoSolicitado,
          });
        } else {
          this.setState({
            votando: false,
            votandoError: VoteService.ultimoError,
          });
        }
      } else {
        this.setState({ redirectLogin: true });
      }
    }
  };
  verMeme = () => {
    this.setState({ redirectMeme: this.state.meme._id });
  };

  render() {
    const {
      titulo,
      usuario,
      fecha,
      categoria,
      imagen,
      cantVotosUp,
      cantVotosDown,
      cantComentarios,
    } = this.state.meme;

    const { redirectLogin, redirectMeme, votando, votoActual } = this.state;

    if (redirectLogin) {
      return <Redirect to="/login"></Redirect>;
    }
    if (redirectMeme) {
      return <Redirect to={"/meme/" + redirectMeme}></Redirect>;
    }

    let fechaFormat;
    try {
      var utc = new Date();
      utc.setHours(utc.getHours() + 3);
      moment.locale("es");
      fechaFormat = moment(fecha, "YYYYMMDD HH:mm:ss").from(utc);
    } catch {
      fechaFormat = "Fecha incorrecta";
    }

    return (
      <>
        <Card className="my-2 cardMeme m-1">
          <Card.Header className="memeHead">
            <Row>
              <Col xs="12" md="6" className="text-left">
                <p className="memeTitulo">{titulo}</p>
                <p className="memeData px-2">
                  └ Creado por {usuario} el {fechaFormat}
                </p>
              </Col>
              <Col xs="12" md="6" className="text-right">
                <Link to={"/" + categoria}>
                  <button className="btn btn-sm btn-outline-dark py-1 px-2">
                    {categoria}
                  </button>
                </Link>
              </Col>
            </Row>
          </Card.Header>
          {imagen && (
            <div className="p-2 memeImgCont text-center">
              <img
                className="img-fluid"
                src={
                  process.env.REACT_APP_API_URL + "show-image/?file=" + imagen
                }
                alt="Meme"
              ></img>
            </div>
          )}
          <Card.Footer className="p-1 memeFoot">
            <BotonVotarUp
              cant={cantVotosUp}
              votar={this.votar}
              disabled={votando}
              votoActual={votoActual}
            />
            <BotonVotarDown
              cant={cantVotosDown}
              votar={this.votar}
              disabled={votando}
              votoActual={votoActual}
            />
            {!this.props.sinBtnComs && (
              <BotonComent cant={cantComentarios} verMeme={this.verMeme} />
            )}
            {this.state.votandoError && (
              <div className="alert alert-danger m-0 mt-2" role="alert">
                {this.state.votandoError}
              </div>
            )}
          </Card.Footer>
        </Card>
      </>
    );
  }
}

function BotonVotarUp(props) {
  return (
    <button
      className={
        "btn btn-sm btn-outline-dark py-2 px-3 m-1" +
        (props.disabled ? " disabled" : "") +
        (props.votoActual === TIPO_UPVOTE ? " upvote" : "")
      }
      onClick={() => props.votar(TIPO_UPVOTE)}
    >
      <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
      {props.cant}
    </button>
  );
}

function BotonVotarDown(props) {
  return (
    <button
      className={
        "btn btn-sm btn-outline-dark py-2 px-3 m-1" +
        (props.disabled ? " disabled" : "") +
        (props.votoActual === TIPO_DOWNVOTE ? " downvote" : "")
      }
      onClick={() => props.votar(TIPO_DOWNVOTE)}
    >
      <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
      {props.cant}
    </button>
  );
}

function BotonComent(props) {
  return (
    <button
      className="btn btn-sm btn-outline-dark py-2 px-3 m-1"
      onClick={() => props.verMeme()}
    >
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      {props.cant}
    </button>
  );
}
