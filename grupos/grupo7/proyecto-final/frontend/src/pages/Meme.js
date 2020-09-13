import React, { Component } from "react";
import Meme from "../components/Meme.js";
import MemeComs from "../components/MemeComs.js";
import "./styles/Meme.css";
import isAuthenticated from "../lib/isAuthenticated";
import MemeService from "../services/memeService.js";

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

  async cargarMeme(idMeme) {
    try {
      let meme = await MemeService.getMeme(idMeme, this.state.userName);
      if (meme) {
        this.setState({
          cargando: false,
          cargandoError: "",
          meme,
        });
      } else {
        this.setState({
          cargando: false,
          cargandoError: MemeService.ultimoError,
        });
      }
    } catch (error) {
      this.setState({
        cargando: false,
        cargandoError: error,
      });
    }
  }

  componentDidMount() {
    this.cargarMeme(this.state.id);
  }

  render() {
    const { cargando, cargandoError, meme } = this.state;

    let contenido;
    if (cargando || cargandoError || !meme) {
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
          <MemeComs meme={meme}></MemeComs>
        </>
      );
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
