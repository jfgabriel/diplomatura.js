import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import datos from "./datos";
import ListaAlumnos from "./componentes/ListaAlumnos";
import ListaProfesores from "./componentes/ListaProfesores";
import ListaMaterias from "./componentes/ListaMaterias";
import ListaCalificaciones from "./componentes/ListaCalificaciones";
import DetalleAlumno from "./componentes/DetalleAlumno";
import AppInicial from "./componentes/AppInicial";

//import HelloMessage from "./componentes/HelloMessage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: -1,
      alumnos: datos.alumnos,
      profesores: datos.profesores,
      materias: datos.materias,
      calificaciones: datos.calificaciones,
    };
  }

  /*ABM alumnos*/
  getAlumno = (id) => this.state.alumnos.find((al) => al.id === +id);

  addAlumno = (alumno) => {
    const newListAlumnos = [...this.state.alumnos];
    const newId = Math.max(...this.state.alumnos.map((a) => a.id)) + 1;
    alumno.id = newId;
    newListAlumnos.push(alumno);
    this.setState({
      alumnos: newListAlumnos,
      itemSelected: newId,
    });
  };

  deleteAlumno = (id) => {
    const newListAlumnos = [...this.state.alumnos];
    const index = newListAlumnos.indexOf(
      newListAlumnos.find((a) => a.id === id)
    );
    newListAlumnos.splice(index, 1);
    this.setState({
      alumnos: newListAlumnos,
      itemSelected: -1,
    });
  };

  editAlumno = (alumno) => {
    const newListAlumnos = [...this.state.alumnos];
    const index = newListAlumnos.indexOf(
      newListAlumnos.find((a) => a.id === alumno.id)
    );
    newListAlumnos[index] = alumno;
    this.setState({
      alumnos: newListAlumnos,
      itemSelected: alumno.id,
    });
  };
  /* Fin ABM alumnos*/

  returnedItem = (objeto) => {
    this.setState({
      itemSelected: objeto.id,
    });
  };

  render() {
    const materiasExtended = this.state.materias.map((m) => {
      const nombreProfesores = m.profesores.map(
        (idPr) => this.state.profesores.find((pr) => pr.id === idPr).nombre
      );
      return {
        id: m.id,
        nombre: m.nombre,
        profesores: nombreProfesores,
      };
    });

    const califacionesExtended = this.state.calificaciones.map((c) => {
      const idCalificacion = c.materia * 1000 + c.alumno;
      const alumno = this.state.alumnos.find((a) => a.id === c.alumno);
      const nombreAlumno = alumno ? alumno.nombre : "deleted";
      const nombreMateria = this.state.materias.find((m) => m.id === c.materia)
        .nombre;
      return {
        id: idCalificacion,
        alumno: nombreAlumno,
        materia: nombreMateria,
        nota: c.nota,
      };
    });

    return (
      <Router>
        <div className="App">
          <header className="alert alert-info">Diplomatura JS</header>
          <div id="botonera">
            <Link to="/alumnos">
              <button className="btn btn-outline-info">Alumnos</button>
            </Link>

            <Link to="/profesores">
              <button className="btn btn-outline-info">Profesores</button>
            </Link>

            <Link to="/materias">
              <button className="btn btn-outline-info">Materias</button>
            </Link>

            <Link to="/calificaciones">
              <button className="btn btn-outline-info">Calificaciones</button>
            </Link>
          </div>

          <div className="mainView">
            <Switch>
              <Route path="/alumnos">
                <ListaAlumnos
                  alumnos={this.state.alumnos}
                  itemSelected={this.state.itemSelected}
                  updateItemSelected={this.state.updateItemSelected}
                  onAddAlumno={this.addAlumno.bind(this)}
                  onDeleteAlumno={this.deleteAlumno.bind(this)}
                />
              </Route>
              <Route
                path="/alumno/:id/edit"
                render={(props) => {
                  return (
                    <DetalleAlumno
                      alumno={this.getAlumno(+props.match.params.id)}
                      isEdit={true}
                      onEditAlumno={this.editAlumno.bind(this)}
                      onReturnAlumno={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route
                path="/alumno/:id"
                render={(props) => {
                  return (
                    <DetalleAlumno
                      alumno={this.getAlumno(+props.match.params.id)}
                      isEdit={false}
                      onEditAlumno={this.editAlumno.bind(this)}
                      onReturnAlumno={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route path="/profesores">
                <ListaProfesores profesores={this.state.profesores} />
              </Route>
              <Route path="/materias">
                <ListaMaterias materias={materiasExtended} />
              </Route>
              <Route path="/calificaciones">
                <ListaCalificaciones calificaciones={califacionesExtended} />
              </Route>

              <Route path="/">
                <AppInicial />
              </Route>
              <Redirect to="" path="/" />
            </Switch>
          </div>

          {/* HelloMessage es un componente que hice para probar todo lo que se vió en teoría, queda comentado
        <HelloMessage name="Marcelo" />
        */}
        </div>
      </Router>
    );
  }
}

export default App;
