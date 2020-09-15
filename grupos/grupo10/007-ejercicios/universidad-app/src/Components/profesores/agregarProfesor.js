import React from "react";
import "./profesores.css";
import { helpers } from "../../helpers";
const { getLastId } = helpers;
class FormAddProfesor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: this.props.datos[0],
      mostrarFormulario: true,
      nombre: "",
      id: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event.target.value });
  };

  mostarFormulario() {
    const state = { mostrarFormulario: !this.state.mostrarFormulario };
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    const profesores = this.state.profesores.push({
      nombre: this.state.nombre,
      id: getLastId(this.state.profesores) + 1,
    });

    const state = { profesores: profesores };
    this.setState(state);
    this.mostarFormulario();
  }

  render() {
    return (
      <div className="card formulario">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="nombre">Nombre profesor</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              onChange={this.handleChange("nombre")}
            />
          </div>
          <form name="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormAddProfesor;
