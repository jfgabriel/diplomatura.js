import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Meme from "../components/Meme.js";
import "./styles/Home.css";
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
      memes: [],
      pagina: 0,
      paginas: 1,
      cargandoMemes: true,
      cargandoError: "",
    };
  }

  cargarMasMemes = async () => {
    let { pagina, paginas, userName } = this.state;
    const categoria = this.props.match.params.categoria;
    if (pagina < paginas) {
      pagina += 1;
      const r = await MemeService.getMemes(pagina, categoria, userName);
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
    let { userName } = this.state;
    const categoria = this.props.match.params.categoria;
    const r = await MemeService.getMemes(1, categoria, userName);
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
    //let agregados = 0;
    let memes = this.state.memes;
    if (!memes) memes = [];
    for (const m of nuevos) {
      if (!memes.some((me) => me._id === m._id)) {
        memes.push(m);
        //agregados += 1;
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
  }

  componentDidMount() {
    this.cargarMasMemes();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.categoria !== this.props.match.params.categoria
    ) {
      this.cargarMemesDeCero();
    }
  }

  render() {
    const { memes, cargandoMemes, cargandoError, userName } = this.state;
    const categoria = this.props.match.params.categoria;

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
            <Categorias categoria={categoria}></Categorias>
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
