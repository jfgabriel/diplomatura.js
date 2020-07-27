import React from 'react';
import './App.css';
import datos from './datos';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActual: 'alumnos',
      idDetalleSeleccionado: -1,
      alumnos: datos.alumnos,
      profesores: datos.profesores,
      materias: datos.materias,
      calificaciones: datos.calificaciones,
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
  render() {
    const vistaActual = <div>ToDo</div>;
    return (
      <div className="App">
        <header className="App-header">Diplomatura JS</header>
        <div id="botonera">
          <button>Alumnos</button>
          <button>Profesores</button>
          <button>Materias</button>
          <button>Calificaciones</button>
        </div>
        <h2>{this.state.vistaActual}</h2>
        <div className="mainView">{vistaActual}</div>
      </div>
    );
  }
}

export default App;
