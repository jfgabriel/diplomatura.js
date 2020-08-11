import React from "react";
import { Link } from "react-router-dom";

class DetalleMateria extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      materia: {
        id: this.props.materia.id,
        nombre: this.props.materia.nombre,
        profesores: [...this.props.materia.profesores],
      },
    };
  }

  handleNombreChange(event) {
    const editedMateria = {
      id: this.state.materia.id,
      nombre: event.target.value,
      profesores: this.state.materia.profesores,
    };
    this.setState({ materia: editedMateria });
  }

  handleSelectedProfesoresChange(event) {
    const editedMateria = { ...this.state.materia };
    const index = editedMateria.profesores.indexOf(+event.target.value);

    if (index === -1) {
      editedMateria.profesores.push(+event.target.value);
    } else {
      editedMateria.profesores.splice(index, 1);
    }
    this.setState({ materia: editedMateria });
  }

  handleSaveButton(event) {
    const editedMateria = { ...this.state.materia };
    this.props.onEditMateria(editedMateria);
  }

  handleReturnButton(event) {
    this.props.onReturnMateria(this.props.materia);
  }

  render() {
    return (
      <>
        <table className="table">
          <tbody>
            <tr>
              <td align="right">Id:</td>
              <td align="left">
                <input
                  type="text"
                  name="id"
                  className="form-control"
                  value={this.props.materia.id}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td align="right">Nombre:</td>
              <td align="left">
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={this.state.materia.nombre}
                  onChange={this.handleNombreChange.bind(this)}
                  readOnly={!this.props.isEdit}
                />
              </td>
            </tr>
            <tr>
              <td align="right">Profesores:</td>
              <td align="left">
                <select
                  name="profesores"
                  multiple={true}
                  className="mdb-select md-form"
                  value={this.state.materia.profesores}
                  onChange={this.handleSelectedProfesoresChange.bind(this)}
                  disabled={!this.props.isEdit}
                >
                  {this.props.profesores.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {pr.nombre}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/materias">
          <button
            className="btn btn-outline-info"
            disabled={!this.props.isEdit}
            onClick={this.handleSaveButton.bind(this)}
          >
            Guardar
          </button>
        </Link>
        <Link to="/materias">
          <button
            className="btn btn-outline-info"
            onClick={this.handleReturnButton.bind(this)}
          >
            Volver
          </button>
        </Link>
      </>
    );
  }
}

export default DetalleMateria;
