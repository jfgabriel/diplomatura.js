import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import ImgLike from "../img/like.png";
import ImgNoLike from "../img/nolike.png";
import ImgComent from "../img/coment.png";
import "./styles/meme.css";
//import { useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const TIPO_UPVOTE = "upvote";
const TIPO_DOWNVOTE = "downvote";

export default class Meme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meme: props.meme,
            userName: props.userName,
            redirectLogin: false,
            redirectMeme: "",
            votando: false,
            votandoError: "",
        };
    }

    votar = async (tipo) => {
        function timeout(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        const { _id } = this.state.meme;
        const { userName, votando } = this.state;
        if (!votando) {
            if (userName) {
                this.setState({ votando: true, votandoError: "" });
                console.log("votando");
                try {
                    await timeout(2000);
                    const res = await axios.get(
                        "http://localhost:8000/meme/" + _id + "/vote",
                        { params: { tipo } }
                    );
                    this.setState({
                        votando: false,
                    });
                } catch (error) {
                    console.log("votando catch");
                    this.setState({
                        votando: false,
                        votandoError: "Error guardando el voto!",
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

        const { redirectLogin, redirectMeme, votando } = this.state;

        if (redirectLogin) {
            return <Redirect to="/login"></Redirect>;
        }
        if (redirectMeme) {
            return <Redirect to={"/meme/" + redirectMeme}></Redirect>;
        }

        return (
            <>
                <Card className="my-2 cardMeme">
                    <Card.Header className="memeHead">
                        <Row>
                            <Col xs="12" md="6" className="text-left">
                                <p className="memeTitulo">{titulo}</p>
                                <p className="memeData px-2">
                                    └ Creado por {usuario} el {fecha}
                                </p>
                            </Col>
                            <Col xs="12" md="6" className="text-right">
                                <Link
                                    to={"/" + categoria}
                                    className="badge badge-dark"
                                >
                                    {categoria}
                                </Link>
                            </Col>
                        </Row>
                    </Card.Header>
                    {imagen && (
                        <div className="p-2 memeImgCont text-center">
                            <img
                                className="img-fluid"
                                src={
                                    "http://localhost:8000/show-image/" +
                                    imagen.replace("./upload/", "")
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
                        />
                        <BotonVotarDown
                            cant={cantVotosDown}
                            votar={this.votar}
                            disabled={votando}
                        />
                        {!this.props.sinBtnComs && (
                            <BotonComent
                                cant={cantComentarios}
                                verMeme={this.verMeme}
                            />
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
                "btn btn-sm btn-dark py-2 px-3 m-1" +
                (props.disabled ? " disabled" : "")
            }
            onClick={() => props.votar(TIPO_UPVOTE)}
        >
            <img src={ImgLike} className="btnLike" alt="like" />
            {props.cant}
        </button>
    );
}

function BotonVotarDown(props) {
    return (
        <button
            className={
                "btn btn-sm btn-dark py-2 px-3 m-1" +
                (props.disabled ? " disabled" : "")
            }
            onClick={() => props.votar(TIPO_DOWNVOTE)}
        >
            <img src={ImgNoLike} className="btnLike" alt="dislike" />
            {props.cant}
        </button>
    );
}

function BotonComent(props) {
    return (
        <button
            className="btn btn-sm btn-dark py-2 px-3 m-1"
            onClick={() => props.verMeme()}
        >
            <img src={ImgComent} className="btnLike" alt="comentarios" />
            {props.cant}
        </button>
    );
}
