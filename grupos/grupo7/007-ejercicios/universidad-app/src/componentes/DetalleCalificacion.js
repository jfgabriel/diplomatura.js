import React from "react";
import { Link } from "react-router-dom";

class DetalleCalificacion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calificacion: {
        alumno: this.props.calificacion.alumno,
        materia: this.props.calificacion.materia,
        nota: this.props.calificacion.nota.toString(),
      },
    };
  }

  handleAlumnoChange(event) {
    const editedcalificacion = {
      alumno: +event.target.value,
      materia: this.state.calificacion.materia,
      nota: this.state.calificacion.nota,
    };
    this.setState({ calificacion: editedcalificacion });
  }

  handleMateriaChange(event) {
    const editedcalificacion = {
      alumno: this.state.calificacion.alumno,
      materia: +event.target.value,
      nota: this.state.calificacion.nota,
    };
    this.setState({ calificacion: editedcalificacion });
  }

  handleNotaChange(event) {
    const editedcalificacion = {
      alumno: this.state.calificacion.alumno,
      materia: this.state.calificacion.materia,
      nota: event.target.value,
    };
    this.setState({ calificacion: editedcalificacion });
  }

  handleSaveButton(event) {
    const editedcalificacion = {
      alumno: this.state.calificacion.alumno,
      materia: this.state.calificacion.materia,
      nota: +this.state.calificacion.nota,
    };

    this.props.onEditCalificacion(
      this.props.calificacion.alumno,
      this.props.calificacion.materia,
      editedcalificacion
    );
  }

  handleReturnButton(event) {
    const editedcalificacion = { ...this.props.calificacion };
    editedcalificacion.id =
      editedcalificacion.materia * 1000 + editedcalificacion.alumno;
    this.props.onReturnCalificacion(editedcalificacion);
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
                  value={
                    this.props.calificacion.materia * 1000 +
                    this.props.calificacion.alumno
                  }
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td align="right">Alumno:</td>
              <td align="left">
                <select
                  name="alumnos"
                  className="mdb-select md-form"
                  value={this.state.calificacion.alumno}
                  onChange={this.handleAlumnoChange.bind(this)}
                  disabled={!this.props.isEdit}
                >
                  {this.props.alumnos.map((al) => (
                    <option key={al.id} value={al.id}>
                      {al.nombre}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td align="right">Materia:</td>
              <td align="left">
                <select
                  name="materias"
                  className="mdb-select md-form"
                  value={this.state.calificacion.materia}
                  onChange={this.handleMateriaChange.bind(this)}
                  disabled={!this.props.isEdit}
                >
                  {this.props.materias.map((ma) => (
                    <option key={ma.id} value={ma.id}>
                      {ma.nombre}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td align="right">Nota:</td>
              <td align="left">
                <input
                  type="text"
                  name="nota"
                  className="form-control"
                  value={this.state.calificacion.nota}
                  onChange={this.handleNotaChange.bind(this)}
                  readOnly={!this.props.isEdit}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/calificaciones">
          <button
            className="btn btn-outline-info"
            disabled={!this.props.isEdit}
            onClick={this.handleSaveButton.bind(this)}
          >
            Guardar
          </button>
        </Link>
        <Link to="/calificaciones">
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

export default DetalleCalificacion;
