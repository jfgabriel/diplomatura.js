import React from "react";

class FormAddCalificacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idAlumno: 0,
      idMateria: 0,
      nota: "",
    };
  }

  handleAlumnoChange(event) {
    this.setState({ idAlumno: +event.target.value });
  }

  handleMateriaChange(event) {
    this.setState({ idMateria: +event.target.value });
  }

  handleNotaChange(event) {
    this.setState({ nota: event.target.value });
  }

  handleOnSumbit(event) {
    event.preventDefault();
    const newCalificacion = {
      alumno: this.state.idAlumno,
      materia: this.state.idMateria,
      nota: +this.state.nota,
    };
    this.props.onAddCalificacion(newCalificacion);
    this.setState({ idAlumno: 0, idMateria: 0, nota: "" });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleOnSumbit.bind(this)}>
        <table className="table">
          <tbody>
            <tr>
              <td align="right">Alumnos:</td>
              <td align="left">
                <select
                  name="alumnos"
                  className="mdb-select md-form"
                  value={this.state.idAlumno}
                  onChange={this.handleAlumnoChange.bind(this)}
                >
                  {this.props.alumnos.map((al) => (
                    <option key={al.id} value={al.id}>
                      {al.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td align="right">Materias:</td>
              <td align="left">
                <select
                  name="alumnos"
                  className="mdb-select md-form"
                  value={this.state.idMateria}
                  onChange={this.handleMateriaChange.bind(this)}
                >
                  {this.props.materias.map((ma) => (
                    <option key={ma.id} value={ma.id}>
                      {ma.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td align="right">Nota:</td>
              <td align="left">
                <input
                  type="text"
                  name="nota"
                  value={this.state.nota}
                  onChange={this.handleNotaChange.bind(this)}
                />
              </td>
              <td>
                <button type="submit" className="btn btn-primary mb-2">
                  Agregar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default FormAddCalificacion;
