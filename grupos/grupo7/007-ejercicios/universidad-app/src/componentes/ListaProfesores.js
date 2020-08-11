import React from "react";
import ItemProfesor from "./ItemProfesor";
import FormAddProfesor from "./FormAddProfesor";

class ListaProfesores extends React.Component {
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
        <h1>Profesores</h1>
        <FormAddProfesor onAddProfesor={this.props.onAddProfesor.bind(this)} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {this.props.profesores.map((pr) => {
              const selected = this.state.itemSelected === pr.id ? true : false;
              return (
                <ItemProfesor
                  key={pr.id}
                  profesor={pr}
                  selected={selected}
                  onSelectedProfesor={() => this.selectItem(pr.id)}
                  onDeleteProfesor={() => this.props.onDeleteProfesor(pr.id)}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListaProfesores;
