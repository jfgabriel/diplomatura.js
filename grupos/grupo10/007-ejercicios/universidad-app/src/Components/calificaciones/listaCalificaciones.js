import React from 'react';
import './calificaciones.css';
import { helpers } from '../../helpers';
const { getElementoById } = helpers;

class ListCalificaciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calificaciones: this.props.datos[0],
      alumnos: this.props.datos[1],
      materias: this.props.datos[2],
      mostrarInfo: true,
      alumno: '',
      materia: '',
      nota: ''
    };
  }

  setVista() {
    const state = { mostrarInfo: !this.state.mostrarInfo };
    this.setState(state);
  }

  infoCalificacion(nota, alumno, materia) {
    this.setVista();
    const state = { alumno: alumno, materia: materia, nota: nota };
    this.setState(state);
  }

  deleteElement(calificacion) {
    let i = this.state.calificaciones.indexOf(calificacion);
    i !== -1 && this.state.calificaciones.splice(i, 1);
    const state = { calificaciones: this.state.calificaciones };

    this.setState(state);
  }

  render() {
    return (
      <div>
        {this.state.mostrarInfo && (
          <div>
            {this.state.calificaciones.map((unaCalificacion, index) => {
              let alumno = getElementoById(unaCalificacion.alumno, this.state.alumnos);
              let materia = getElementoById(unaCalificacion.materia, this.state.materias);
              return (
                <ul key={index} className='list-group list-group-horizontal-lg'>
                  <li className='list-group-item item' onClick={() => this.infoCalificacion(unaCalificacion.nota, alumno.nombre, materia.nombre)}>
                    <p>
                      Alumno: <strong>{alumno.nombre}</strong>
                    </p>
                    <p>
                      Materia:<strong> {materia.nombre}</strong>
                    </p>
                  </li>
                  <li className='list-group-item'>
                    <button type='button' className='btn btn-danger' onClick={() => this.deleteElement(unaCalificacion)}>
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
                  Alumno: <strong>{this.state.alumno}</strong>
                </p>
                <p>
                  Materia: <strong>{this.state.materia}</strong>
                </p>
                <p>
                  Nota: <strong>{this.state.nota}</strong>
                </p>
              </div>
              <button type='button' className='btn btn-success card-link' onClick={() => this.setVista()}>
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ListCalificaciones;
