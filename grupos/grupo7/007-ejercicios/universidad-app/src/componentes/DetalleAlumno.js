import React from "react";
import { Link } from "react-router-dom";

class DetalleAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumno: { ...this.props.alumno },
    };
  }

  handleNombreChange(event) {
    const editedAlumno = {
      id: this.state.alumno.id,
      nombre: event.target.value,
      edad: this.state.alumno.edad,
    };
    this.setState({ alumno: editedAlumno });
  }

  handleEdadChange(event) {
    const editedAlumno = {
      id: this.state.alumno.id,
      nombre: this.state.alumno.nombre,
      edad: event.target.value,
    };
    this.setState({ alumno: editedAlumno });
  }

  handleSaveButton(event) {
    const editedAlumno = { ...this.state.alumno };
    this.props.onEditAlumno(editedAlumno);
  }

  handleReturnButton(event) {
    const viewedAlumno = { ...this.state.alumno };
    this.props.onReturnAlumno(viewedAlumno);
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
                  value={this.state.alumno.id}
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
                  value={this.state.alumno.nombre}
                  onChange={this.handleNombreChange.bind(this)}
                  readOnly={!this.props.isEdit}
                />
              </td>
            </tr>
            <tr>
              <td align="right">Edad:</td>
              <td align="left">
                <input
                  type="text"
                  name="edad"
                  className="form-control"
                  value={this.state.alumno.edad}
                  onChange={this.handleEdadChange.bind(this)}
                  readOnly={!this.props.isEdit}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/alumnos">
          <button
            className="btn btn-outline-info"
            disabled={!this.props.isEdit}
            onClick={this.handleSaveButton.bind(this)}
          >
            Guardar
          </button>
        </Link>
        <Link to="/alumnos">
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

export default DetalleAlumno;
