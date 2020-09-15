import React from 'react';
import './profesores.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListProfesores from './listaProfesores';
import FormAddProfesor from './agregarProfesor';

class Profesores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: this.props.datos
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/profesores/lista'>
              <button className='btn btn-outline-info'>Lista Profesores</button>
            </Link>
            <Link to='/profesores/nuevo'>
              <button className='btn btn-outline-info'>Agregar Profesor</button>
            </Link>
          </div>

          <Switch>
            <Route path='/profesores/lista'>
              <ListProfesores datos={this.state.profesores} />
            </Route>
            <Route path='/profesores/nuevo'>
              <FormAddProfesor datos={[this.state.profesores]} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Profesores;
