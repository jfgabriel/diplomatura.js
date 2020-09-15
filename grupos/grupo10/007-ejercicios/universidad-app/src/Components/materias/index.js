import React from 'react';
import './materias.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListMaterias from './listaMaterias';
import FormAddMateria from './agregarMateria';

class Materias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materias: this.props.datos[0],
      profesores: this.props.datos[1]
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to='/materias/lista'>
              <button className='btn btn-outline-info'>Lista Materia</button>
            </Link>
            <Link to='/materias/nuevo'>
              <button className='btn btn-outline-info'>Agregar Materia</button>
            </Link>
          </div>

          <Switch>
            <Route path='/materias/lista'>
              <ListMaterias datos={[this.state.materias, this.state.profesores]} />
            </Route>
            <Route path='/materias/nuevo'>
              <FormAddMateria datos={[this.state.profesores, this.state.materias]} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Materias;
