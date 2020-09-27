import React from "react";

class FormAddMateria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      selectedProfesores: [],
    };
  }

  handleNombreChange(event) {
    this.setState({ nombre: event.target.value });
  }

  handleSelectedProfesoresChange(event) {
    const newSelectedProfesores = [...this.state.selectedProfesores];
    const index = newSelectedProfesores.indexOf(+event.target.value);

    if (index === -1) {
      newSelectedProfesores.push(+event.target.value);
    } else {
      newSelectedProfesores.splice(index, 1);
    }
    this.setState({ selectedProfesores: newSelectedProfesores });
  }

  handleOnSumbit(event) {
    event.preventDefault();
    const newMateria = {
      id: 0,
      nombre: this.state.nombre,
      profesores: [...this.state.selectedProfesores],
    };
    this.props.onAddMateria(newMateria);
    this.setState({ nombre: "", selectedProfesores: [] });
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
              <td align="right">Profesores:</td>

              <td align="left">
                <select
                  name="profesores"
                  multiple={true}
                  className="mdb-select md-form"
                  value={this.state.selectedProfesores}
                  onChange={this.handleSelectedProfesoresChange.bind(this)}
                >
                  {this.props.profesores.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {pr.nombre}
                    </option>
                  ))}
                </select>
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

export default FormAddMateria;
