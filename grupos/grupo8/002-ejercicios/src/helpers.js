import { database } from './basededatos';

export const helpers = {
  getUniversidadId: function (item) {
    return database.universidades.find((u) => u.id === item);
  },

  getProfesorId: function (item) {
    return database.profesores.find((p) => p.id === item);
  },

  getMateriaId: function (item) {
    return database.materias.find((m) => m.id === item);
  },

  getProvinciaI: function (item) {
    return database.provincias.find((p) => p.id === item);
  },

  getId: function (tabla, id) {
    return database[tabla].find((item) => item.id === id);
  },

  getUltimoId: function (tabla) {
    const ultimo = database[tabla].length;
    return database[tabla].find((u) => u.id === ultimo).id;
  },

  setProvincia: function (nombreProvincia) {
    let nuevoId;
    let verificacionProvincia = database.provincias.some(
      (p) => p.nombre.toLowerCase() === nombreProvincia.toLowerCase()
    );

    if (!verificacionProvincia) {
      let ultimo = this.getUltimoId('provincias');
      nuevoId = ultimo + 1;
      const nuevaProvincia = {
        id: nuevoId,
        nombre: nombreProvincia,
      };

      database.provincias.push(nuevaProvincia);
    }
    return nuevoId;
  },

  infoByMateria: function (item) {
    let materia = this.getId('materias', item);

    return {
      idUniversidad: materia.universidad,
      profesores: materia.profesores,
    };
  },

  infoByAlumno: function () {
    let arregloFinal = [];

    database.alumnos.forEach((alumno) => {
      const materias = database.calificaciones
        .filter(
          (c) => c.alumno === alumno.id
        ) /*Filtramos las calificaciones de ese alumno */
        .map((m) => ({
          /*Mapeamos las notas filtradas y nos quedamos con el id de la materia y la nota */
          materiaAlumno: m.materia,
          notaAlumno: m.nota,
        }));

      const resultado = materias.map((m) => ({
        /* Lo que queremos mostrar después del nombre*/
        materia: this.getMateriaId(m.materiaAlumno).nombre,
        nota: m.notaAlumno,
      }));

      /*Agregamos el nombre del alumno y todas sus calificaciones */
      arregloFinal.push(alumno.nombre.toUpperCase(), resultado);
    });

    return arregloFinal;
  },

  calificacionByAlumno: function (nombreAlumno, nombreMateria, notaAlumno) {
    let alumno = database.alumnos.find((a) => a.nombre === nombreAlumno);
    let materia = database.materias.find((m) => m.nombre === nombreMateria);
    let idAlumno;
    let idMateria;
    let resultado = false;

    //Verifica que existe un alumno con ese nombre en la tabla alumnos
    if (!alumno) {
      idAlumno = this.getUltimoId('alumnos') + 1;
      database.alumnos.push({
        id: idAlumno,
        nombre: nombreAlumno,
      });
    } else {
      idAlumno = alumno.id;
    }

    //Verifica que existe una materia con ese nombre en la tabla materias
    if (!materia) {
      idMateria = this.getUltimoId('materias') + 1;
      database.materias.push({
        id: idMateria,
        nombre: nombreAlumno,
      });
    } else {
      idMateria = materia.id;
    }

    //Verifica si el alumno ya tiene al menos una calificación para esa materia
    let calificacion = database.calificaciones.some(
      (c) => c.alumno === idAlumno && c.materia === idMateria
    );

    //Si el alumno no posee calificación en esa materia, entonces se agrega la calificación
    if (!calificacion) {
      database.calificaciones.push({
        alumno: idAlumno,
        materia: idMateria,
        nota: notaAlumno,
      });
      resultado = true;
    }
    return resultado;
  },
};
