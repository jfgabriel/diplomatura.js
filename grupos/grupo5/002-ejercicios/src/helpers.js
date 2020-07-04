"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helpers = void 0;

var _basededatos = require("./basededatos");

//import { helpers } from './';
// 6) Mover helpers y el todo el c贸digo a un m贸dulo, creando un nuevo archivo helpers.js
// 2) Implementar una funci贸n que obtenga una universidad por Id
// 馃 Tip: pueden ir probando las funciones usando console.log() asegur谩ndose que los resultados sean los esperados

/*
const universidad = (idUniversidad) => {
    const resultado = database.universidades
    .find(universidad => universidad.id === idUniversidad);
    return resultado;
  }
*/
// 3) Implementar una funci贸n que obtenga un profesor por Id

/*
const profesor = (idProfesor) => {
    const resultado = database.profesores.find(profesor => profesor.id === idProfesor);
    return resultado;
}
*/
// 4) Implementar una funci贸n que obtenga una materia por Id
// 馃 Tip: Comparar con la funci贸n del ejercicio (3) y ver si se les ocurre una funci贸n gen茅rica que sirva para cualquier tabla
var getById = function getById(tabla) {
  return function (id) {
    return _basededatos.database[tabla].find(function (item) {
      return item.id === id;
    });
  };
}; // 5) Crear un objeto 'helpers' que contenga las funciones como m茅todos


var getUniversidadById = getById('universidades');
var getProfesorById = getById('profesores');
var getMateriaById = getById('materias');
var getAlumnoById = getById('alumnos'); //7

var getMaxId = function getMaxId(tabla) {
  var maxId = 0;

  _basededatos.database[tabla].forEach(function (item) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });

  return maxId;
}; //Ingresando un nombre y tabla, devuelve el id de ese objeto


var getObtenerObjeto = function getObtenerObjeto(nombre, tabla) {
  var resultado = _basededatos.database[tabla].find(function (item) {
    return item.nombre === nombre;
  });

  return resultado;
}; //9


var addItemTabla = function addItemTabla(itemNombre, tabla) {
  var idNuevo = helpers.getMaxId(tabla) + 1;

  _basededatos.database[tabla].push({
    id: idNuevo,
    nombre: itemNombre
  });

  return idNuevo;
};

var insertarProvincia = function insertarProvincia(nombreProvincia) {
  var idNuevo = helpers.getMaxId('provincias') + 1;

  _basededatos.database.provincias.push({
    id: idNuevo,
    nombre: nombreProvincia
  });

  return idNuevo;
}; //10


var getInfoMateria = function getInfoMateria(idMateria) {
  var materia = helpers.getMateriaById(idMateria);
  var idUniversidad = materia.universidad;
  var profesores = materia.profesores.map(function (item) {
    return helpers.getProfesorById(item);
  });
  return {
    idMateria: idMateria,
    idUniversidad: idUniversidad,
    profesores: profesores
  };
}; //11
//devuelve las calificaciones por alumno


var getCalificacionesAlumnos = function getCalificacionesAlumnos() {
  var salida = _basededatos.database.alumnos.map(function (item) {
    var calificaciones = _basededatos.database.calificaciones.filter(function (alumno) {
      return alumno.alumno === item.id;
    });

    return calificaciones;
  }).filter(function (alumno) {
    return alumno != '';
  }); //hay un alumno que no tiene calificaciones


  return salida;
};

var getInformacionAlumnos = function getInformacionAlumnos() {
  var calificaciones = getCalificacionesAlumnos();
  console.log('NOTAS DE ALUMNOS');
  console.log('-------------------------');

  for (var i = 0; i < calificaciones.length; i++) {
    console.log(helpers.getAlumnoById(calificaciones[i][0].alumno).nombre.toUpperCase());

    for (var y = 0; y < calificaciones[i].length; y++) {
      console.log(helpers.getMateriaById(calificaciones[i][y].materia).nombre, calificaciones[i][y].nota);
    }

    console.log('-------------------------');
  }
}; //12


var guardarCalificacion = function guardarCalificacion(nombreAlumno, nombreMateria, nota) {
  var alumno = helpers.getObtenerObjeto(nombreAlumno, 'alumnos');
  var materia = helpers.getObtenerObjeto(nombreMateria, 'materias');

  if (alumno && materia) {
    var idAlumno = alumno.id;
    var idMateria = materia.id;

    _basededatos.database['calificaciones'].push({
      alumno: idAlumno,
      materia: idMateria,
      nota: nota
    });
  } else if (alumno) {
    //no existe la tabla materia
    var _idMateria = helpers.addItemTabla(nombreMateria, 'materias'); //creo la materia


    var _idAlumno = alumno.id; //inserto la calificacion

    _basededatos.database['calificaciones'].push({
      alumno: _idAlumno,
      materia: _idMateria,
      nota: nota
    });
  } else {
    //No existe alumno ni materia
    var _idAlumno2 = helpers.addItemTabla(nombreAlumno, 'alumnos'); //creo el alumno


    var _idMateria2 = helpers.addItemTabla(nombreMateria, 'materias'); //creo la materia
    //inserto la calificacion


    _basededatos.database['calificaciones'].push({
      alumno: _idAlumno2,
      materia: _idMateria2,
      nota: nota
    });
  }
};

var helpers = {
  getUniversidadById: getUniversidadById,
  getProfesorById: getProfesorById,
  getMateriaById: getMateriaById,
  getAlumnoById: getAlumnoById,
  getMaxId: getMaxId,
  getObtenerObjeto: getObtenerObjeto,
  addItemTabla: addItemTabla,
  insertarProvincia: insertarProvincia,
  getInfoMateria: getInfoMateria,
  getInformacionAlumnos: getInformacionAlumnos,
  guardarCalificacion: guardarCalificacion
};
exports.helpers = helpers;