import React from "react";
import ItemCalificacion from "./ItemCalificacion";

class ListaCalificaciones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      situacion: "",
    };
  }

  render() {
    return (
      <>
        <h1>Calificaciones</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Alumno</th>
              <th scope="col">Materia</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody>
            {this.props.calificaciones.map((ca) => {
              return <ItemCalificacion key={ca.id} calificacion={ca} />;
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaCalificaciones;
