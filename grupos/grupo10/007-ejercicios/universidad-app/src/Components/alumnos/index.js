import React from 'react';
import './alumnos.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import FormAddAlumno from './agregarAlumno';
import ListAlumnos from './listaAlumnos';
class Alumnos extends React.Component {
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

  infoAlumno(alumno) {
    this.setVista();
    const state = { id: alumno.id, nombre: alumno.nombre, edad: alumno.edad };
    this.setState(state);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/alumnos/lista'>
              <button className='btn btn-outline-info'>Lista Alumnos</button>
            </Link>
            <Link to='/alumnos/nuevo'>
              <button className='btn btn-outline-info'>Agregar un alumno</button>
            </Link>
          </div>

          <Switch>
            <Route path='/alumnos/lista'>
              <ListAlumnos datos={this.state.alumnos} />
            </Route>
            <Route path='/alumnos/nuevo'>
              <FormAddAlumno datos={[this.state.alumnos]} onAgregarAlumno={this.props.onAgregarAlumno} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Alumnos;
