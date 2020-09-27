import React from "react";
import { Link } from "react-router-dom";
import "./styles/categorias.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

export default class Categorias extends React.Component {
  constructor(props) {
    super(props);
    const categoria = this.props.categoria;
    this.state = {
      cargando: true,
      cargandoError: "",
      categorias: [],
      categoria,
    };
  }
  cargarCategorias() {
    axios
      .get(process.env.REACT_APP_API_URL + "categorias", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            cargando: false,
            cargandoError: "",
            categorias: response.data.categorias,
          });
        } else {
          this.setState({
            cargando: false,
            cargandoError: response.data,
          });
        }
      })
      .catch((e) => {
        this.setState({
          cargando: false,
          cargandoError: "Error en API",
        });
      });
  }

  componentDidMount() {
    this.cargarCategorias();
  }

  render() {
    const { cargando, cargandoError, categorias } = this.state;
    const categoria = this.props.categoria;

    return (
      <div className="card p-0 my-2">
        <div className="categoriasTitulo p-3">CATEGORIAS</div>
        {(cargando || cargandoError) && (
          <CategoriasCargando
            cargando={cargando}
            cargandoError={cargandoError}
          ></CategoriasCargando>
        )}
        <div className="list-group list-group-flush">
          {!cargando &&
            categorias &&
            categorias.map((c) => (
              <Link
                className={
                  categoria === c.nombre
                    ? "active list-group-item list-group-item-action m-0 p-2"
                    : "list-group-item list-group-item-action m-0 p-2"
                }
                to={"/" + c.nombre}
                key={c._id}
              >
                <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                {c.nombre} ({c.cantMemes})
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

function CategoriasCargando(props) {
  return (
    <div className="text-center p-4 my-3">
      {props.cargando && (
        <div className="spinner-grow mx-auto" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      )}
      {props.cargandoError && (
        <span className="text-danger">{props.cargandoError}</span>
      )}
    </div>
  );
}
