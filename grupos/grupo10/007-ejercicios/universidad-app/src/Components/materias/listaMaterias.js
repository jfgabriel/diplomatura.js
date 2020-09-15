import React from 'react';
import './materias.css';

import { helpers } from '../../helpers';
const { getElementoById } = helpers;

function ListaProfesores(prop) {
  let profesores = prop.profesores;
  return profesores.map((unProfesor) => {
    return <li key={unProfesor.id}>{unProfesor.nombre}</li>;
  });
}

class ListMaterias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materias: this.props.datos[0],
      profesores: this.props.datos[1],
      mostrarInfo: true,
      id: '',
      nombre: '',
      profesoresPorMateria: []
    };
  }

  setVista() {
    const state = {};
    state.mostrarInfo = !this.state.mostrarInfo;
    this.setState(state);
  }

  infoMateria(materia) {
    let resultado = [];
    for (let i = 0; i < materia.profesores.length; i++) {
      const idProfesor = materia.profesores[i];
      let profesor = getElementoById(idProfesor, this.state.profesores);
      resultado.push(profesor);
    }
    this.setVista();
    const state = { id: materia.id, nombre: materia.nombre, profesoresPorMateria: resultado };
    this.setState(state);
  }

  deleteElement(unaMateria) {
    let i = this.state.materias.indexOf(unaMateria);
    i !== -1 && this.state.materias.splice(i, 1);
    const state = { alumnos: this.state.materias };

    this.setState(state);
  }

  render() {
    return (
      <div>
        {this.state.mostrarInfo && (
          <div>
            {this.state.materias.map((unaMateria) => {
              return (
                <ul key={unaMateria.id} className='list-group list-group-horizontal-lg'>
                  <li className='list-group-item item' onClick={() => this.infoMateria(unaMateria)}>
                    {unaMateria.nombre}
                  </li>
                  <li className='list-group-item'>
                    <button type='button' className='btn btn-danger' onClick={() => this.deleteElement(unaMateria)}>
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
                <h2>Datos materia:</h2>
                <p>
                  id: <strong>{this.state.id}</strong>
                </p>
                <p>
                  Nombre: <strong>{this.state.nombre}</strong>
                </p>
                <h2>Profesores:</h2>
                <ListaProfesores profesores={this.state.profesoresPorMateria} />
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

export default ListMaterias;
