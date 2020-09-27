import React from 'react';
import './alumnos.css';
import { helpers } from '../../helpers';
const { getLastId } = helpers;
class FormAddAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: this.props.datos[0],
      mostrarFormulario: true,
      nombre: '',
      edad: 0,
      id: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event.target.value });
  };

  mostarFormulario() {
    const state = { mostrarFormulario: !this.state.mostrarFormulario };
    this.setState(state);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // const alumnos = this.state.alumnos.push({
    //   nombre: this.state.nombre,
    //   edad: this.state.edad,
    //   id: getLastId(this.state.alumnos) + 1
    // });

    // const state = {
    //   alumnos: [
    //     ...alumnos,

    //   ]
    // };
    // this.setState(state);
    // this.mostarFormulario();
    this.props.onAgregarAlumno({
      nombre: this.state.nombre,
      edad: this.state.edad,
      id: getLastId(this.state.alumnos) + 1
    });
  };

  render() {
    return (
      <div className='card formulario'>
        <div className='card-body'>
          <form name='form' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre alumno</label>
              <input type='text' className='form-control' id='nombre' name='nombre' onChange={this.handleChange('nombre')} />
            </div>
            <div className='form-group'>
              <label htmlFor='edad'>Edad</label>
              <input type='number' className='form-control' id='edad' name='edad' onChange={this.handleChange('edad')} />
            </div>
            <button type='submit' className='btn btn-primary'>
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormAddAlumno;
