import React from 'react';
import './App.css';
import Alumnos from './Components/alumnos';
import Materias from './Components/materias';
import Calificaciones from './Components/calificaciones';
import Profesores from './Components/profesores';

import datos from './datos';

// Rutas
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActual: '',
      idDetalleSeleccionado: -1,
      alumnos: datos.alumnos,
      profesores: datos.profesores,
      materias: datos.materias,
      calificaciones: datos.calificaciones
    };
  }
  /**
   * Se utiliza para disparar el cambio de vista.
   * Si viene un id seleccionado, se setea como el detalle actual.
   * @param {*} vista
   * @param {*} idSeleccionado
   */
  setVistaActual(vista, idSeleccionado) {
    const newState = { vistaActual: vista };
    if (idSeleccionado) {
      newState.idDetalleSeleccionado = idSeleccionado;
    } else {
      newState.idDetalleSeleccionado = -1;
    }
    this.setState(newState);
  }

  handleAddAlumno = (alumno) => {
    const state = {
      alumnos: [...this.state.alumnos, alumno]
    };
    this.setState(state);
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <header className='alert alert-info'>Diplomatura JS</header>
          <div id='botonera'>
            <Link to='/alumnos'>
              <button className='btn btn-outline-info' onClick={() => this.setVistaActual('Alumnos', 1)}>
                Alumnos
              </button>
            </Link>
            <Link to='/profesores'>
              <button className='btn btn-outline-info' onClick={() => this.setVistaActual('Profesores', 2)}>
                Profesores
              </button>
            </Link>
            <Link to='/materias'>
              <button className='btn btn-outline-info' onClick={() => this.setVistaActual('Materias', 3)}>
                Materias
              </button>
            </Link>
            <Link to='/calificaciones'>
              <button className='btn btn-outline-info' onClick={() => this.setVistaActual('Calificaciones', 4)}>
                Calificaciones
              </button>
            </Link>
          </div>
          <h2>{this.state.vistaActual}</h2>
        </div>

        <Switch>
          <Route path='/alumnos'>
            <Alumnos datos={this.state.alumnos} onAgregarAlumno={this.handleAddAlumno} />
          </Route>
          <Route path='/profesores'>
            <Profesores datos={this.state.profesores} />
          </Route>
          <Route path='/materias'>
            <Materias datos={[this.state.materias, this.state.profesores]} />
          </Route>
          <Route path='/calificaciones'>
            <Calificaciones datos={[this.state.calificaciones, this.state.alumnos, this.state.materias]} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
