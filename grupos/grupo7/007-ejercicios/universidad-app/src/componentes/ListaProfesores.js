import React from "react";
import ItemProfesor from "./ItemProfesor";

class ListaProfesores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      situacion: "",
    };
  }

  render() {
    return (
      <>
        <h1>Profesores</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {this.props.profesores.map((pr) => {
              return <ItemProfesor key={pr.id} profesor={pr} />;
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaProfesores;
