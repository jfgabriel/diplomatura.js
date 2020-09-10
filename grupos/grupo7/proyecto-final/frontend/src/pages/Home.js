import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Meme from "../components/Meme.js";
import "./styles/Home.css";
import axios from "axios";
import Categorias from "../components/Categorias.js";
import isAuthenticated from "../lib/isAuthenticated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MemeService from "../services/memeService.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    const userName = isAuthenticated();
    this.state = {
      userName,
      //categoria: this.props.match.params.categoria ?? "",
      memes: [],
      pagina: 0,
      paginas: 1,
      cargandoMemes: true,
      cargandoError: "",
    };
    console.log("Constructor");
  }

  cargarMasMemes = async () => {
    console.log("Cargar Mas Memes");
    let { pagina, paginas } = this.state;
    const categoria = this.props.match.params.categoria;
    if (pagina < paginas) {
      pagina += 1;
      const r = await MemeService.getMemes(pagina, categoria);
      if (r.result) {
        this.agregarMemes(r.memes, pagina, r.paginas);
      } else {
        this.setState({
          cargandoMemes: false,
          cargandoError: r.mensaje,
        });
      }
    }
  };

  cargarMemesDeCero = async () => {
    const categoria = this.props.match.params.categoria;
    const r = await MemeService.getMemes(1, categoria);
    if (r.result) {
      this.setState({
        cargandoMemes: false,
        cargandoError: "",
        memes: r.memes,
        pagina: 1,
        paginas: r.paginas,
      });
    } else {
      this.setState({
        cargandoMemes: false,
        cargandoError: r.mensaje,
      });
    }
  };

  agregarMemes(nuevos, pagina, paginas) {
    let agregados = 0;
    let memes = this.state.memes;
    if (!memes) memes = [];
    for (const m of nuevos) {
      if (!memes.some((me) => me._id === m._id)) {
        memes.push(m);
        agregados += 1;
      } else {
      }
    }
    this.setState({
      cargandoMemes: false,
      cargandoError: "",
      memes,
      pagina,
      paginas,
    });
    console.log("Nuevos memes: " + nuevos.length + ". Agregados: " + agregados);
  }

  componentDidMount() {
    console.log("ComponentDidMount");
    this.cargarMasMemes();
    //this.cargarMemes(this.state.pagina, this.state.categoria);
  }

  // componentWillReceiveProps(nextProps) {
  //   // Cada vez que props.email cambia, actualiza el estado.
  //   if (
  //     nextProps.match.params.categoria !== this.props.match.params.categoria
  //   ) {
  //     window.reload;
  //     //this.cargarInicial(nextProps.match.params.categoria);
  //     //this.cargarMemes(1, nextProps.match.params.categoria);
  //   }
  // }

  // shouldComponentUpdate(nextProps) {
  //   return (
  //     nextProps.match.params.categoria !== this.props.match.params.categoria
  //   );
  // }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    if (
      prevProps.match.params.categoria !== this.props.match.params.categoria
    ) {
      // this.setState({
      //   memes: [],
      //   cargandoMemes: true,
      //   cargandoError: "",
      //   pagina: 0,
      //   paginas: 4,
      // });
      // this.cargarMasMemes(0, 1, this.props.match.params.categoria);
      console.log(
        "Component did Update: " +
          prevProps.match.params.categoria +
          " " +
          this.props.match.params.categoria
      );
      this.cargarMemesDeCero();
    }
  }

  render() {
    const { memes, cargandoMemes, cargandoError, userName } = this.state;
    console.log("Render: " + memes.length);
    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-lg-10">
            {this.state.memes.length === 0 && !cargandoMemes && (
              <div className="card text-center p-4 my-3">
                <span className="badge badge-pill badge-light noHayMemes my-4">
                  :(
                </span>
                No se encontraron Memes...
              </div>
            )}
            {memes && (
              <InfiniteScroll
                dataLength={memes.length}
                next={this.cargarMasMemes}
                hasMore={this.state.pagina < this.state.paginas}
                loader={
                  <MemeCargando
                    cargandoMemes="true"
                    cargandoError=""
                  ></MemeCargando>
                }
              >
                {memes.map((m, index) => {
                  return <Meme meme={m} key={m._id} userName={userName}></Meme>;
                })}
              </InfiniteScroll>
            )}
            {cargandoError && (
              <MemeCargando
                cargandoMemes=""
                cargandoError={cargandoError}
              ></MemeCargando>
            )}
          </div>

          <div className="col-md-2 d-none d-lg-block">
            <Categorias></Categorias>
          </div>
        </div>
        <Link className="float" to="/addmeme">
          <FontAwesomeIcon icon={faPlus} className="my-float" size="2x" />
        </Link>
      </>
    );
  }
}

function MemeCargando(props) {
  return (
    <div className="card text-center p-4 my-3">
      <div className="text-center p-4 my-2">
        {props.cargandoMemes && (
          <div className="spinner-grow mx-auto" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        )}
        {props.cargandoError && (
          <span className="text-danger">{props.cargandoError}</span>
        )}
      </div>
    </div>
  );
}
