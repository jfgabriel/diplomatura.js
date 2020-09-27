import React from 'react';
import './profesores.css';

class ListProfesores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: this.props.datos,
      mostrarInfo: true,
      id: '',
      nombre: ''
    };
  }

  setVista() {
    const state = {};
    state.mostrarInfo = !this.state.mostrarInfo;
    this.setState(state);
  }

  infoProfesor(profesor) {
    this.setVista();
    const state = { id: profesor.id, nombre: profesor.nombre };
    this.setState(state);
  }

  deleteElement(unProfesor) {
    let i = this.state.profesores.indexOf(unProfesor);
    i !== -1 && this.state.profesores.splice(i, 1);
    const state = { profesores: this.state.profesores };

    this.setState(state);
  }

  render() {
    return (
      <div>
        {this.state.mostrarInfo && (
          <div>
            {this.state.profesores.map((unProfesor) => {
              return (
                <ul key={unProfesor.id} className='list-group list-group-horizontal-lg'>
                  <li className='list-group-item item' onClick={() => this.infoProfesor(unProfesor)}>
                    {unProfesor.nombre}
                  </li>
                  <li className='list-group-item'>
                    <button type='button' className='btn btn-danger' onClick={() => this.deleteElement(unProfesor)}>
                      Eliminar
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
        )}
        {!this.state.mostrarInfo && (
          <div>
            <div className='card card-width'>
              <div className='card-body'>
                <p>
                  id: <strong>{this.state.id}</strong>
                </p>
                <p>
                  Nombre: <strong>{this.state.nombre}</strong>
                </p>
              </div>
              <button type='button' className='btn btn-primary card-link' onClick={() => this.setVista()}>
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ListProfesores;
