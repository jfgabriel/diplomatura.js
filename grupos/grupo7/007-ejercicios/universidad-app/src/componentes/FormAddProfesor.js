import React from "react";

class FormAddProfesor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
    };
  }

  handleNombreChange(event) {
    this.setState({ nombre: event.target.value });
  }

  handleOnSumbit(event) {
    event.preventDefault();
    const newProfesor = {
      id: 0,
      nombre: this.state.nombre,
    };
    this.props.onAddProfesor(newProfesor);
    this.setState({ nombre: "" });
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

export default FormAddProfesor;
