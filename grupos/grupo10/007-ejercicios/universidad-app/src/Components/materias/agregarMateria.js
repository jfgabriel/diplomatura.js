import React from 'react';
import './materias.css';
class FormAddMateria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: this.props.datos[0],
      materias: this.props.datos[1],
      mostrarFormulario: true,
      materia: '',
      profesoresMateria: []
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

  handleChangeCheckbox = (prop) => (event) => {
    let profesores = [...this.state.profesoresMateria, parseInt(event.target.value)];
    const state = { profesoresMateria: profesores };
    this.setState(state);
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState([...this.state.materias, { nombre: this.state.materia, profesores: this.state.profesoresMateria }]);
  }

  render() {
    return (
      <div className='card formulario'>
        <div className='card-body'>
          <form name='form' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='materia'>Nombre de la materia</label>
              <input type='text' className='form-control' id='materia' name='materia' onChange={this.handleChange('materia')} />
            </div>
            <div className='form-group'>
              {this.state.profesores.map((unProfesor) => {
                return (
                  <div className='form-check' key={unProfesor.id}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={unProfesor.id}
                      id={unProfesor.id}
                      onChange={this.handleChangeCheckbox('profesoresMateria')}
                    />
                    <label className='form-check-label' htmlFor={unProfesor.id}>
                      {unProfesor.nombre}
                    </label>
                  </div>
                );
              })}
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

export default FormAddMateria;
