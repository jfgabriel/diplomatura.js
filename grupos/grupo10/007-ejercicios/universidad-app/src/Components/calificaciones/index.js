import React from 'react';
import './calificaciones.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListCalificaciones from './listaCalificaciones';
import FormCalificaciones from './agregarCalificacion';

class Calificaciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calificaciones: this.props.datos[0],
      alumnos: this.props.datos[1],
      materias: this.props.datos[2]
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/calificaciones/lista'>
              <button className='btn btn-outline-info'>Lista Calificaciones</button>
            </Link>
            <Link to='/calificaciones/nuevo'>
              <button className='btn btn-outline-info'>Agregar Calificacion</button>
            </Link>
          </div>

          <Switch>
            <Route path='/calificaciones/lista'>
              <ListCalificaciones datos={[this.state.calificaciones, this.state.alumnos, this.state.materias]} />
            </Route>
            <Route path='/calificaciones/nuevo'>
              <FormCalificaciones datos={[this.state.alumnos, this.state.materias, this.state.calificaciones]} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Calificaciones;
