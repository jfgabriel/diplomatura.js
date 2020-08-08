import React from "react";

class DetalleProfesor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  volverALista() {
    //this.props.setVistaActual("ListaProfesores", this.props.profesor.id);
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
                  value={this.props.profesor.nombre}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-outline-info"
          onClick={() => {
            this.volverALista();
          }}
        >
          Guardar
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => {
            this.volverALista();
          }}
        >
          Volver
        </button>
      </>
    );
  }
}

export default DetalleProfesor;
