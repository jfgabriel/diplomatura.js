import React from "react";
import ItemMateria from "./ItemMateria";
import FormAddMateria from "./FormAddMateria";

class ListaMaterias extends React.Component {
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
        <h1>Materias</h1>
        <FormAddMateria
          profesores={this.props.profesores}
          onAddMateria={this.props.onAddMateria.bind(this)}
        />
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
              const selected = this.state.itemSelected === ma.id ? true : false;
              return (
                <ItemMateria
                  key={ma.id}
                  materia={ma}
                  profesores={this.props.profesores}
                  selected={selected}
                  onSelectedMateria={() => this.selectItem(ma.id)}
                  onDeleteMateria={() => this.props.onDeleteMateria(ma.id)}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaMaterias;
