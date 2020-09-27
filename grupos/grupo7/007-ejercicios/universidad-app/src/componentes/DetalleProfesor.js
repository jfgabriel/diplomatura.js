import React from "react";
import { Link } from "react-router-dom";

class DetalleProfesor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state = {
      profesor: { ...this.props.profesor },
    };
  }

  handleNombreChange(event) {
    const editedProfesor = {
      id: this.state.profesor.id,
      nombre: event.target.value,
    };
    this.setState({ profesor: editedProfesor });
  }

  handleSaveButton(event) {
    const editedProfesor = { ...this.state.profesor };
    this.props.onEditProfesor(editedProfesor);
  }

  handleReturnButton(event) {
    const editedProfesor = { ...this.state.profesor };
    this.props.onReturnProfesor(editedProfesor);
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
                  value={this.props.profesor.id}
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
                  value={this.state.profesor.nombre}
                  onChange={this.handleNombreChange.bind(this)}
                  readOnly={!this.props.isEdit}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/profesores">
          <button
            className="btn btn-outline-info"
            disabled={!this.props.isEdit}
            onClick={this.handleSaveButton.bind(this)}
          >
            Guardar
          </button>
        </Link>
        <Link to="/profesores">
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

export default DetalleProfesor;
