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
import DetalleProfesor from "./componentes/DetalleProfesor";
import DetalleMateria from "./componentes/DetalleMateria";
import DetalleCalificacion from "./componentes/DetalleCalificacion";
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

    /*Eliminar las calificaciones de ese alumno*/
    const newListCalificaciones = this.state.calificaciones.filter(
      (c) => c.alumno !== id
    );

    this.setState({
      alumnos: newListAlumnos,
      calificaciones: newListCalificaciones,
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

  /*ABM profesores*/
  getProfesor = (id) => this.state.profesores.find((pr) => pr.id === +id);

  addProfesor = (profesor) => {
    const newListProfesores = [...this.state.profesores];
    const newId = Math.max(...this.state.profesores.map((p) => p.id)) + 1;
    profesor.id = newId;
    newListProfesores.push(profesor);
    this.setState({
      profesores: newListProfesores,
      itemSelected: newId,
    });
  };

  deleteProfesor = (id) => {
    const newListProfesores = [...this.state.profesores];
    const index = newListProfesores.indexOf(
      newListProfesores.find((p) => p.id === id)
    );
    newListProfesores.splice(index, 1);

    /*Borrar al profesor de las materias donde dictaba clases*/
    const newListMaterias = [...this.state.materias];

    for (let m of newListMaterias) {
      const index = m.profesores.indexOf(id);
      if (index > -1) {
        m.profesores.splice(index, 1);
      }
    }

    this.setState({
      profesores: newListProfesores,
      materias: newListMaterias,
      itemSelected: -1,
    });
  };

  editProfesor = (profesor) => {
    const newListProfesores = [...this.state.profesores];
    const index = newListProfesores.indexOf(
      newListProfesores.find((p) => p.id === profesor.id)
    );
    newListProfesores[index] = profesor;
    this.setState({
      profesores: newListProfesores,
      itemSelected: profesor.id,
    });
  };
  /* Fin ABM Profesores*/

  /*ABM Materias*/
  getMateria = (id) => this.state.materias.find((ma) => ma.id === +id);

  addMateria = (materia) => {
    const newListMaterias = [...this.state.materias];
    const newId = Math.max(...this.state.materias.map((m) => m.id)) + 1;
    materia.id = newId;
    newListMaterias.push(materia);
    this.setState({
      materias: newListMaterias,
      itemSelected: newId,
    });
  };

  deleteMateria = (id) => {
    const newListMaterias = [...this.state.materias];
    const index = newListMaterias.indexOf(
      newListMaterias.find((m) => m.id === id)
    );
    newListMaterias.splice(index, 1);

    /*Eliminar las calificaciones de esta materia*/
    const newListCalificaciones = this.state.calificaciones.filter(
      (c) => c.materia !== id
    );

    this.setState({
      materias: newListMaterias,
      calificaciones: newListCalificaciones,
      itemSelected: -1,
    });
  };

  editMateria = (materia) => {
    const newListMaterias = [...this.state.materias];
    const index = newListMaterias.indexOf(
      newListMaterias.find((m) => m.id === materia.id)
    );
    newListMaterias[index] = materia;
    this.setState({
      materias: newListMaterias,
      itemSelected: materia.id,
    });
  };
  /* Fin ABM Materias*/

  /*ABM Calificaciones*/
  getCalificacion = (idAlumno, idMateria) =>
    this.state.calificaciones.find(
      (ca) => ca.alumno === +idAlumno && ca.materia === +idMateria
    );

  addCalificacion = (calificacion) => {
    const newListCalificaciones = [...this.state.calificaciones];
    newListCalificaciones.push(calificacion);
    this.setState({
      calificaciones: newListCalificaciones,
      itemSelected: calificacion.materia * 1000 + calificacion.alumno,
    });
  };

  deleteCalificacion = (idAlumno, idMateria) => {
    const newListCalificaciones = [...this.state.calificaciones];
    const index = newListCalificaciones.indexOf(
      newListCalificaciones.find(
        (c) => c.alumno === idAlumno && c.materia === idMateria
      )
    );
    newListCalificaciones.splice(index, 1);
    this.setState({
      calificaciones: newListCalificaciones,
      itemSelected: -1,
    });
  };

  editCalificacion = (idAlumnoOrigina, idMateriaOriginal, calificacion) => {
    const newListCalificaciones = [...this.state.calificaciones];
    const index = newListCalificaciones.indexOf(
      newListCalificaciones.find(
        (c) => c.alumno === idAlumnoOrigina && c.materia === idMateriaOriginal
      )
    );
    newListCalificaciones[index] = calificacion;
    this.setState({
      calificaciones: newListCalificaciones,
      itemSelected: calificacion.materia * 1000 + calificacion.alumno,
    });
  };
  /* Fin ABM Calificaciones*/

  returnedItem = (objeto) => {
    console.log(objeto);
    this.setState({
      itemSelected: objeto.id,
    });
  };

  render() {
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
                <ListaProfesores
                  profesores={this.state.profesores}
                  itemSelected={this.state.itemSelected}
                  onAddProfesor={this.addProfesor.bind(this)}
                  onDeleteProfesor={this.deleteProfesor.bind(this)}
                />
              </Route>
              <Route
                path="/profesor/:id/edit"
                render={(props) => {
                  return (
                    <DetalleProfesor
                      profesor={this.getProfesor(+props.match.params.id)}
                      isEdit={true}
                      onEditProfesor={this.editProfesor.bind(this)}
                      onReturnProfesor={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route
                path="/profesor/:id"
                render={(props) => {
                  return (
                    <DetalleProfesor
                      profesor={this.getProfesor(+props.match.params.id)}
                      isEdit={false}
                      onEditProfesor={this.editProfesor.bind(this)}
                      onReturnProfesor={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route path="/materias">
                <ListaMaterias
                  materias={this.state.materias}
                  profesores={this.state.profesores}
                  itemSelected={this.state.itemSelected}
                  onAddMateria={this.addMateria.bind(this)}
                  onDeleteMateria={this.deleteMateria.bind(this)}
                />
              </Route>
              <Route
                path="/materia/:id/edit"
                render={(props) => {
                  return (
                    <DetalleMateria
                      materia={this.getMateria(+props.match.params.id)}
                      profesores={this.state.profesores}
                      isEdit={true}
                      onEditMateria={this.editMateria.bind(this)}
                      onReturnMateria={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route
                path="/materia/:id"
                render={(props) => {
                  return (
                    <DetalleMateria
                      materia={this.getMateria(+props.match.params.id)}
                      profesores={this.state.profesores}
                      isEdit={false}
                      onEditMateria={this.editMateria.bind(this)}
                      onReturnMateria={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route path="/calificaciones">
                <ListaCalificaciones
                  calificaciones={this.state.calificaciones}
                  materias={this.state.materias}
                  alumnos={this.state.alumnos}
                  itemSelected={this.state.itemSelected}
                  onAddCalificacion={this.addCalificacion.bind(this)}
                  onDeleteCalificacion={this.deleteCalificacion.bind(this)}
                />
              </Route>
              <Route
                path="/calificacion/:id/edit"
                render={(props) => {
                  const idAlumno = +props.match.params.id % 1000;
                  const idMateria = (+props.match.params.id - idAlumno) / 1000;
                  return (
                    <DetalleCalificacion
                      calificacion={this.getCalificacion(idAlumno, idMateria)}
                      materias={this.state.materias}
                      alumnos={this.state.alumnos}
                      isEdit={true}
                      onEditCalificacion={this.editCalificacion.bind(this)}
                      onReturnCalificacion={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
              <Route
                path="/calificacion/:id"
                render={(props) => {
                  const idAlumno = +props.match.params.id % 1000;
                  const idMateria = (+props.match.params.id - idAlumno) / 1000;
                  return (
                    <DetalleCalificacion
                      calificacion={this.getCalificacion(idAlumno, idMateria)}
                      materias={this.state.materias}
                      alumnos={this.state.alumnos}
                      isEdit={false}
                      onEditCalificacion={this.editCalificacion.bind(this)}
                      onReturnCalificacion={this.returnedItem.bind(this)}
                    />
                  );
                }}
              />
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
