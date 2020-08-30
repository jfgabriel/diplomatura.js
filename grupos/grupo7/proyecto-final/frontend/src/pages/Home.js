import React, { Component } from "react";
import Meme from "../components/Meme.js";
import "./styles/Home.css";
import axios from "axios";
import Categorias from "../components/Categorias.js";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: props.userName,
            memes: [],
            pagina: 1,
            cargandoMemes: true,
            cargandoError: "",
        };
    }

    cargarMemes() {
        const options = {
            url: "http://localhost:8000/memes",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
                pagina: this.state.pagina,
                categoria: "",
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
        this.cargarMemes();
    }

    render() {
        const { cargandoMemes, cargandoError } = this.state;
        return (
            <div className="Home">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10">
                            {this.state.memes.length === 0 &&
                                !cargandoMemes && (
                                    <div className="card text-center p-4 my-3">
                                        No se encontraron memes
                                    </div>
                                )}
                            {this.state.memes.map((m) => (
                                <Meme meme={m}></Meme>
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
    );
}
