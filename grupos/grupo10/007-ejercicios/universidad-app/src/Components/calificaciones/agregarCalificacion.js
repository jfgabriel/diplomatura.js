import React from 'react';
import './calificaciones.css';
class FormCalificaciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: this.props.datos[0],
      materias: this.props.datos[1],
      calificaciones: this.props.datos[2],
      mostrarFormulario: true,
      alumno: 0,
      materia: 0,
      nota: 0
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

  handleSubmit(e) {
    e.preventDefault();

    const nuevaCalificacion = this.state.calificaciones.push({
      alumno: parseInt(this.state.alumno),
      materia: parseInt(this.state.materia),
      nota: parseInt(this.state.nota)
    });

    const state = { calificaciones: nuevaCalificacion };
    this.setState(state);
    this.mostarFormulario();
  }

  render() {
    return (
      <div className='card formulario'>
        <div className='card-body'>
          <form name='form' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='alumno'>Seleccionar un alumno</label>
              <select className='form-control' id='alumno' onChange={this.handleChange('alumno')}>
                <option></option>
                {this.state.alumnos.map((unAlumno) => {
                  return (
                    <option key={unAlumno.id} value={unAlumno.id}>
                      {unAlumno.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='materia'>Seleccionar una materia</label>
              <select className='form-control' id='materia' onChange={this.handleChange('materia')}>
                <option></option>

                {this.state.materias.map((unaMateria) => {
                  return (
                    <option key={unaMateria.id} value={unaMateria.id}>
                      {unaMateria.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='nota'>Ingrese una nota</label>
              <input type='number' className='form-control' id='nota' name='nota' onChange={this.handleChange('nota')} />
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

export default FormCalificaciones;
