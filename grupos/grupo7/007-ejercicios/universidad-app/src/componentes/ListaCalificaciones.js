import React from "react";
import ItemCalificacion from "./ItemCalificacion";
import FormAddCalificacion from "./FormAddCalificacion";

class ListaCalificaciones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: this.props.itemSelected,
    };
  }

  selectItem = (id) => {
    const newState = { itemSelected: id };
    this.setState(newState);
  };

  render() {
    return (
      <>
        <h1>Calificaciones</h1>
        <FormAddCalificacion
          materias={this.props.materias}
          alumnos={this.props.alumnos}
          onAddCalificacion={this.props.onAddCalificacion.bind(this)}
        />
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
              const selected =
                this.state.itemSelected === ca.materia * 1000 + ca.alumno
                  ? true
                  : false;
              return (
                <ItemCalificacion
                  key={ca.materia * 1000 + ca.alumno}
                  calificacion={ca}
                  alumnos={this.props.alumnos}
                  materias={this.props.materias}
                  selected={selected}
                  onSelectedCalificacion={() =>
                    this.selectItem(ca.materia * 1000 + ca.alumno)
                  }
                  onDeleteCalificacion={() =>
                    this.props.onDeleteCalificacion(ca.alumno, ca.materia)
                  }
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaCalificaciones;
