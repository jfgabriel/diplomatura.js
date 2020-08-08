import React from "react";
import ItemAlumno from "./ItemAlumno";
import FormAddAlumno from "./FormAddAlumno";

class ListaAlumnos extends React.Component {
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
        <h1>Alumnos</h1>
        <FormAddAlumno onAddAlumno={this.props.onAddAlumno.bind(this)} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.alumnos.map((al) => {
              const selected = this.state.itemSelected === al.id ? true : false;
              return (
                <ItemAlumno
                  key={al.id}
                  alumno={al}
                  selected={selected}
                  onSelectedAlumno={() => this.selectItem(al.id)}
                  onDeleteAlumno={() => this.props.onDeleteAlumno(al.id)}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaAlumnos;
