import React from 'react';
import './alumnos.css';

class ListAlumnos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: this.props.datos,
      mostrarInfo: true,
      id: '',
      nombre: '',
      edad: ''
    };
  }

  setVista() {
    const state = {};
    state.mostrarInfo = !this.state.mostrarInfo;
    this.setState(state);
  }

  infoAlumno({ id, nombre, edad }) {
    this.setVista();
    const state = { id, nombre, edad };
    this.setState(state);
  }
  deleteElement(unAlumno) {
    let i = this.state.alumnos.indexOf(unAlumno);
    i !== -1 && this.state.alumnos.splice(i, 1);
    const state = { alumnos: this.state.alumnos };

    this.setState(state);
  }

  render() {
    return (
      <div>
        {this.state.mostrarInfo && (
          <div>
            {this.state.alumnos.map((unAlumno) => {
              return (
                <ul key={unAlumno.id} className='list-group list-group-horizontal-lg'>
                  <li className='list-group-item item' onClick={() => this.infoAlumno(unAlumno)}>
                    {unAlumno.nombre}
                  </li>
                  <li className='list-group-item'>
                    <button type='button' className='btn btn-danger' onClick={() => this.deleteElement(unAlumno)}>
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

                <p>
                  Edad: <strong>{this.state.edad}</strong>
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

export default ListAlumnos;
