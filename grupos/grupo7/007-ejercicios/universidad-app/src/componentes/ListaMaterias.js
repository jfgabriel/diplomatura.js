import React from "react";
import ItemMateria from "./ItemMateria";

class ListaMaterias extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      situacion: "",
    };
  }

  render() {
    return (
      <>
        <h1>Materias</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Profesores</th>
            </tr>
          </thead>
          <tbody>
            {this.props.materias.map((ma) => {
              return <ItemMateria key={ma.id} materia={ma} />;
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaMaterias;
