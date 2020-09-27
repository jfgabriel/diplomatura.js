import React from "react";

class FormAddAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      edad: 0,
    };
  }

  handleNombreChange(event) {
    this.setState({ nombre: event.target.value });
  }

  handleEdadChange(event) {
    this.setState({ edad: event.target.value });
  }

  handleOnSumbit(event) {
    event.preventDefault();
    const newAlumno = {
      id: 0,
      nombre: this.state.nombre,
      edad: this.state.edad,
    };
    this.props.onAddAlumno(newAlumno);

    this.setState({ nombre: "", edad: 0 });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleOnSumbit.bind(this)}>
        <table className="table">
          <tbody>
            <tr>
              <td align="right">Nombre:</td>
              <td align="left">
                <input
                  type="text"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.handleNombreChange.bind(this)}
                />
              </td>
              <td align="right">Edad:</td>
              <td align="left">
                <input
                  type="text"
                  name="edad"
                  value={this.state.edad}
                  onChange={this.handleEdadChange.bind(this)}
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

export default FormAddAlumno;
