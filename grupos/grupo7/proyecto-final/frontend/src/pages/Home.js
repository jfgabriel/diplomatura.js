import React, { Component } from "react";
import Meme from "../components/Meme.js";
import "./styles/Home.css";
import axios from "axios";
import Categorias from "../components/Categorias.js";
import isAuthenticated from "../lib/isAuthenticated";

export default class Home extends Component {
    constructor(props) {
        super(props);
        const userName = isAuthenticated();
        this.state = {
            userName,
            categoria: this.props.match.params.categoria ?? "",
            memes: [],
            pagina: 0,
            cargandoMemes: true,
            cargandoError: "",
        };
    }

    cargarMemes(pagina, categoria) {
        // console.log(
        //     "cargarmemes: {pagina: " + pagina + " cat:" + categoria + "}"
        // );
        const options = {
            url: "http://localhost:8000/memes",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            params: {
                pagina,
                categoria,
            },
        };
        axios(options).then((response) => {
            if (response.status === 200) {
                this.setState({
                    cargandoMemes: false,
                    cargandoError: "",
                    memes: response.data,
                });
            } else {
                this.setState({
                    cargandoMemes: false,
                    cargandoError: response.data,
                });
            }
        });
    }

    componentDidMount() {
        this.cargarMemes(this.state.pagina, this.state.categoria);
    }

    componentWillReceiveProps(nextProps) {
        // Cada vez que props.email cambia, actualiza el estado.
        if (
            nextProps.match.params.categoria !==
            this.props.match.params.categoria
        ) {
            this.setState({
                cargandoMemes: true,
                cargandoError: "",
            });
            this.cargarMemes(0, nextProps.match.params.categoria);
        }
    }

    render() {
        const { cargandoMemes, cargandoError, userName } = this.state;
        return (
            <div className="Home">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10">
                            {this.state.memes.length === 0 && !cargandoMemes && (
                                <div className="card text-center p-4 my-3">
                                    <span className="badge badge-pill badge-light noHayMemes my-4">
                                        :(
                                    </span>
                                    No se encontraron Memes...
                                </div>
                            )}
                            {this.state.memes.map((m) => (
                                <Meme
                                    meme={m}
                                    key={m._id}
                                    userName={userName}
                                ></Meme>
                            ))}
                            {(cargandoMemes || cargandoError) && (
                                <MemeCargando
                                    cargandoMemes={cargandoMemes}
                                    cargandoError={cargandoError}
                                ></MemeCargando>
                            )}
                        </div>

                        <div className="col-md-2 d-none d-md-block">
                            <Categorias></Categorias>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function MemeCargando(props) {
    return (
        <div className="card text-center p-4 my-3">
            <div className="text-center p-4 my-2">
                {props.cargandoMemes && (
                    <div className="spinner-grow mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {props.cargandoError && (
                    <span className="text-danger">{props.cargandoError}</span>
                )}
            </div>
        </div>
    );
}
