import React from "react";
import { Link } from "react-router-dom";
import "./styles/categorias.css";
import axios from "axios";

export default class Categorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cargando: true, cargandoError: "", categorias: [] };
    }
    cargarCategorias() {
        // this.setState({
        //     cargando: false,
        //     cargandoError: "",
        //     categorias: [
        //         { id: 1, nombre: "politica" },
        //         { id: 2, nombre: "humor" },
        //         { id: 3, nombre: "amor" },
        //     ],
        // });
        const options = {
            url: "http://localhost:8000/categorias",
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
                    categorias: response.data,
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
        this.cargarCategorias();
    }

    render() {
        const { cargando, cargandoError, categorias } = this.state;
        return (
            <div className="card p-0 my-2">
                <div className="categoriasTitulo p-2">CATEGORIAS</div>
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
                                className="list-group-item list-group-item-action"
                                to={"/" + c.nombre}
                                key={c._id}
                            >
                                {c.nombre}
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
