import React, { Component } from "react";
import Meme from "../components/Meme.js";
//import "./styles/Home.css";
import "./styles/Meme.css";
import axios from "axios";
import isAuthenticated from "../lib/isAuthenticated";

export default class MemePage extends Component {
    constructor(props) {
        super(props);
        const userName = isAuthenticated();
        this.state = {
            userName,
            cargando: true,
            cargandoError: "",
            id: props.match.params.id,
            meme: null,
        };
    }

    cargarMeme(id) {
        const options = {
            url: "http://localhost:8000/memes/" + id,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
        axios(options).then((response) => {
            if (response.status === 200) {
                this.setState({
                    cargando: false,
                    cargandoError: "",
                    meme: response.data,
                });
            } else {
                this.setState({
                    cargando: false,
                    cargandoError: response.data,
                });
            }
        });
    }

    componentDidMount() {
        this.cargarMeme(this.state.id);
    }

    render() {
        const { cargando, cargandoError, meme } = this.state;

        let contenido;
        if (cargando || cargandoError) {
            contenido = (
                <MemeCargando
                    cargando={this.state.cargando}
                    cargandoError={this.state.cargandoError}
                ></MemeCargando>
            );
        } else {
            contenido = (
                <>
                    <Meme
                        meme={meme}
                        sinBtnComs="true"
                        userName={this.state.userName}
                    ></Meme>
                </>
            );
            /* <MemeComs userName={this.props.userName}></MemeComs> */
        }

        return (
            <div className="memePage">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10">{contenido}</div>
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
                {props.cargando && (
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
