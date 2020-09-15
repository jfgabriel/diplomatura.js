// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './baseDeDatos';
const {
  universidades,
  profesores,
  materias,
  provincias,
  alumnos,
  calificaciones,
} = database;

// 2) Implementar una función que obtenga una universidad por Id
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados
const getUniversidadById = (id) => {
  return universidades.find((universidad) => universidad.id === id);
};
// 3) Implementar una función que obtenga un profesor por Id
const getProfesorById = (id) => {
  return profesores.find((profesor) => profesor.id === id);
};

const getMateriaById = (id) => {
  return materias.find((materia) => materia.id === id);
};

// Funcion generica
const getElementoById = (id, tabla) => {
  return tabla.find((elemento) => elemento.id === id);
};
// 5) Crear un objeto 'helpers' que contenga las funciones como métodos
export const helpers = {
  getUniversidadById: (id) => {
    return universidades.find((universidad) => universidad.id === id);
  },
  getProfesorById: (id) => {
    return profesores.find((profesor) => profesor.id === id);
  },
  getMateriaById: (id) => {
    return materias.find((materia) => materia.id === id);
  },
  getLastId: (tabla) => {
    return tabla[tabla.length - 1].id;
  },
  getAlumnoByNombre: (nombre) => {
    return alumnos.find((alumno) => alumno.nombre === nombre);
  },
  getMateriaByNombre: (nombre) => {
    return materias.find((materia) => materia.nombre === nombre);
  },
  newProvincia: (nombre) => {
    let ultimoIdProvincia = helpers.getLastId(provincias);
    let siguienteId = ultimoIdProvincia + 1;
    provincias.push({ id: siguienteId, nombre: nombre });
    return siguienteId;
  },
  newAlumno: (nombre) => {
    let ultimoIdAlumno = helpers.getLastId(alumnos);
    let proximoId = ultimoIdAlumno + 1;
    let elAlumno = { id: proximoId, nombre: nombre };
    alumnos.push(elAlumno);
    return elAlumno;
  },
  newMateria: (materia) => {
    let ultimoIdMateria = helpers.getLastId(materias);
    let proximoId = ultimoIdMateria + 1;
    let laMateria = { id: proximoId, nombre: materia };
    materias.push(laMateria);
    return laMateria;
  },
  searchInfoMateriaById: (id) => {
    let materia = helpers.getMateriaById(id);
    let nombreUniversidad = helpers.getUniversidadById(materia.universidad)
      .nombre;
    let profesores = [];
    for (let i = 0; i < materia.profesores.length; i++) {
      const idProfesor = materia.profesores[i];
      let nombreProfesor = helpers.getProfesorById(idProfesor).nombre;
      profesores.push(nombreProfesor);
    }
    materia.universidad = nombreUniversidad;
    materia.profesores = profesores;
    return materia;
  },
  inforamcionAlumnos: () => {
    let respuesta = 'NOTAS DE ALUMNOS \n';
    respuesta + '---------------- \n';
    for (let i = 0; i < alumnos.length; i++) {
      const unAlumno = alumnos[i];
      respuesta + unAlumno.nombre.toUpperCase() + '\n';
      calificaciones.forEach((unaCalificacion) => {
        if (unaCalificacion.alumno === unAlumno.id) {
          let materia = helpers.getMateriaById(unaCalificacion.materia);
          respuesta + `${materia.nombre}: ${unaCalificacion.nota} \n`;
        }
      });
      respuesta + '.... \n';
    }
    return respuesta;
  },
  newCalificacion: (alumno, materia, nota) => {
    let elAlumno = helpers.getAlumnoByNombre(alumno);
    let laMateria = helpers.getMateriaByNombre(materia);
    // Si no existe lo creamos
    if (!elAlumno) {
      elAlumno = helpers.newAlumno(alumno);
    }
    // Si no existe lo creeamos
    if (!laMateria) {
      laMateria = helpers.newMateria(materia);
    }
    calificaciones.push({
      alumno: elAlumno.id,
      materia: laMateria.id,
      nota: nota,
    });
    return calificaciones;
  },
};
