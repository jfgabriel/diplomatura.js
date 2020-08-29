import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import ImgLike from "../img/like.png";
import ImgNoLike from "../img/nolike.png";
import ImgComent from "../img/coment.png";
import "./styles/meme.css";
import { Redirect } from "react-router-dom";

export default class Meme extends React.Component {
    constructor(props) {
        super(props);
        this.state = { meme: props.meme, usuario: props.userName };
    }
    // {
    //     _id: 456654654,
    //     titulo: "Que hacen esas manitas",
    //     imagen:
    //         "https://statics.memondo.com/p/s1/ccs/2018/05/CC_2691829_990f3fc391c74284b05c0f5cedf5fb13_meme_otros_y_esta_es_mi_mejor_tecnica.jpg?cb=142181",
    //     categoria: "Amor",
    //     usuario: "pop@gmail.com",
    //     fecha: "2020-07-20",
    //     cantVotosUp: 44,
    //     cantVotosDown: 1,
    //     cantComentarios: 54654,
    // },

    votar = () => {
        const { idMeme } = this.state.meme;

        // if (this.state.userName) {
        //     fetch("http://localhost:8000/meme/" + idMeme + "/vote")
        //         .then((res) => res.json())
        //         .then(
        //             (result) => {
        //                 this.setState({
        //                     isLoaded: true,
        //                     items: result.items,
        //                 });
        //             },
        //             (error) => {
        //                 this.setState({
        //                     isLoaded: true,
        //                     error,
        //                 });
        //             }
        //         );
        // } else {
        //     <Redirect to="/login" />;
        // }
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
        return (
            <>
                <Card className="my-2">
                    <Card.Header className="memeHead">
                        <Row>
                            <Col xs="12" md="6" className="text-left">
                                <p class="memeTitulo">{titulo}</p>
                                <p class="memeData px-2">
                                    └ Creado por {usuario} el {fecha}
                                </p>
                            </Col>
                            <Col xs="12" md="6" className="text-right">
                                <span class="badge badge-danger">
                                    {categoria}
                                </span>
                            </Col>
                        </Row>
                    </Card.Header>
                    <div class="p-2 memeImgCont text-center">
                        <img class="img-fluid" src={imagen}></img>
                    </div>
                    {/* <Card.Body></Card.Body> */}
                    <Card.Footer className="p-1 memeFoot">
                        <BotonVotarUp cant={cantVotosUp} />
                        <BotonVotarDown cant={cantVotosDown} />
                        <BotonComent cant={cantComentarios} />
                    </Card.Footer>
                </Card>
            </>
        );
    }
}

function BotonVotarUp(props) {
    return (
        <button class="btn btn-sm btn-dark py-2 px-3 m-1">
            <img src={ImgLike} class="btnLike" />
            {props.cant}
        </button>
    );
}

function BotonVotarDown(props) {
    return (
        <button class="btn btn-sm btn-dark py-2 px-3 m-1">
            <img src={ImgNoLike} class="btnLike" />
            {props.cant}
        </button>
    );
}

function BotonComent(props) {
    return (
        <button class="btn btn-sm btn-dark py-2 px-3 m-1">
            <img src={ImgComent} class="btnLike" />
            {props.cant}
        </button>
    );
}
