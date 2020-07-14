"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promedioDeEdadByUniversidadId = exports.materiasSinAlumnosAnotados = exports.alumnosConPromedioMayorA = exports.promedioDeEdad = exports.expandirInfoUniversidadByNombre = exports.materiasAprobadasByNombreAlumno = void 0;

var _basededatos = _interopRequireWildcard(require("./basededatos"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {number} alumnoId el id del alumno
 */
var materiasAprobadasByNombreAlumno = function materiasAprobadasByNombreAlumno(nombreAlumno) {
  // Ejemplo de como accedo a datos dentro de la base de datos
  // console.log(basededatos.alumnos);
  var id = idDeAlumno(nombreAlumno); //Obtengo el id del alumno

  if (id) {
    var materias = [];
    var calificaciones = _basededatos["default"].calificaciones;

    for (var i = 0; i < calificaciones.length; i++) {
      if (calificaciones[i].nota >= 4 && calificaciones[i].alumno === id) {
        var salida = objetoMateria(calificaciones[i].materia);
        materias.push(salida);
      }
    }

    return materias;
  }
}; //Obtengo un alumno ingresando un nombre de alumno. Si no existe devuelve undefined


exports.materiasAprobadasByNombreAlumno = materiasAprobadasByNombreAlumno;

var idDeAlumno = function idDeAlumno(nombreAlumno) {
  var resultado = _basededatos["default"].alumnos.find(function (alumno) {
    return alumno.nombre === nombreAlumno;
  });

  return resultado.id;
}; //Obtengo una materia ingresando un id de materia


var objetoMateria = function objetoMateria(idMateria) {
  var resultado = _basededatos["default"].materias.find(function (materia) {
    return materia.id === idMateria;
  });

  return resultado;
};
/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */


var expandirInfoUniversidadByNombre = function expandirInfoUniversidadByNombre(nombreUniversidad) {
  //return {};
  var salida = {};
  var universidad = objetoUniversidad(nombreUniversidad);

  if (universidad) {
    var materias = objetosMaterias(universidad.id);
    var profesores = profesoresMateria(materias);
    var alumnos = alumnosMateria(materias);
    salida = {
      universidad: universidad,
      materias: materias,
      profesores: profesores,
      alumnos: alumnos
    };
  }

  return salida;
}; //Obtengo la universidad ingresando un nombre. Si no existe devuelve undefined


exports.expandirInfoUniversidadByNombre = expandirInfoUniversidadByNombre;

var objetoUniversidad = function objetoUniversidad(nombreUniversidad) {
  var resultado = _basededatos["default"].universidades.find(function (universidad) {
    return universidad.nombre === nombreUniversidad;
  });

  return resultado;
}; //Obtengo las materias ingresando un id de universidad


var objetosMaterias = function objetosMaterias(idUniversidad) {
  var resultado = _basededatos["default"].materias.filter(function (materia) {
    return materia.universidad === idUniversidad;
  });

  return resultado;
}; //Obtengo el profesor ingresando un id. Si no existe devuelve undefined


var objetoProfesor = function objetoProfesor(idProfesor) {
  var resultado = _basededatos["default"].profesores.find(function (profesor) {
    return profesor.id === idProfesor;
  });

  return resultado;
}; //Obtengo los profesores ingresando un arreglo de materias


var profesoresMateria = function profesoresMateria(materias) {
  var contador = materias.length;
  var salida = [];

  for (var i = 0; i < contador; i++) {
    var profesores = materias[i].profesores;
    var contador2 = profesores.length;

    for (var j = 0; j < contador2; j++) {
      if (!salida.includes(objetoProfesor(profesores[j]))) {
        //para no ingresar repetidos
        salida.push(objetoProfesor(profesores[j]));
      }
    }
  }

  return salida;
}; //Obtengo los alumnos ingresando un arreglo de materias


var alumnosMateria = function alumnosMateria(materias) {
  var calificaciones = _basededatos["default"].calificaciones;
  var salida = [];

  for (var i = 0; i < materias.length; i++) {
    for (var j = 0; j < calificaciones.length; j++) {
      if (materias[i].id === calificaciones[j].materia) {
        if (!salida.includes(objetoAlumno(calificaciones[j].alumno))) {
          salida.push(objetoAlumno(calificaciones[j].alumno));
        }
      }
    }
  }

  return salida;
}; //Obtengo el alumno ingresando un id. Si no existe devuelve undefined


var objetoAlumno = function objetoAlumno(idAlumno) {
  var resultado = _basededatos["default"].alumnos.find(function (alumno) {
    return alumno.id === idAlumno;
  });

  return resultado;
}; // /**
//  * Devuelve el promedio de edad de los alumnos.
//  */


var promedioDeEdad = function promedioDeEdad() {
  //   return [];
  var alumnos = _basededatos["default"].alumnos;
  var cantidad = 0;

  for (var i = 0; i < alumnos.length; i++) {
    cantidad = cantidad + alumnos[i].edad;
  }

  return [cantidad / alumnos.length];
}; // /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */


exports.promedioDeEdad = promedioDeEdad;

var alumnosConPromedioMayorA = function alumnosConPromedioMayorA(promedio) {
  //   return [];
  var alumnosPromedio = _basededatos["default"].alumnos.filter(function (alumno) {
    return promedioAlumno(alumno.id) > promedio;
  });

  return alumnosPromedio;
};

exports.alumnosConPromedioMayorA = alumnosConPromedioMayorA;

var promedioAlumno = function promedioAlumno(idAlumno) {
  var getNotas = _basededatos["default"].calificaciones.filter(function (alumno) {
    return alumno.alumno === idAlumno;
  });

  var contador = 0;

  for (var i = 0; i < getNotas.length; i++) {
    contador = contador + getNotas[i].nota;
  }

  return contador / getNotas.length;
}; // /**
//  * Devuelve la lista de materias sin alumnos
//  */


var materiasSinAlumnosAnotados = function materiasSinAlumnosAnotados() {
  var salida = [];
  var materias = _basededatos["default"].materias;

  var _loop = function _loop(i) {
    var verifica = _basededatos["default"].calificaciones.find(function (calificacion) {
      return calificacion.materia === materias[i].id;
    });

    if (!verifica) {
      salida.push(materias[i]);
    }
  };

  for (var i = 0; i < materias.length; i++) {
    _loop(i);
  }

  return salida;
}; // /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */


exports.materiasSinAlumnosAnotados = materiasSinAlumnosAnotados;

var promedioDeEdadByUniversidadId = function promedioDeEdadByUniversidadId(universidadId) {
  //   return [];
  var salida = []; //Obtengo todas las materias de una universidad

  var materias = _basededatos["default"].materias.filter(function (materia) {
    return materia.universidad === universidadId;
  });

  var calificaciones = _basededatos["default"].calificaciones;

  var _loop2 = function _loop2(i) {
    var idMateria = materias[i].id; //Obtengo todas las calificaciones por materia

    var calif = calificaciones.filter(function (calificacion) {
      return calificacion.materia === idMateria;
    });

    for (var y = 0; y < calif.length; y++) {
      if (!salida.includes(calif[y].alumno)) {
        //Para no insertar repetidos
        salida.push(calif[y].alumno); //inserto los id de los alumnos
      }
    }
  };

  for (var i = 0; i < materias.length; i++) {
    _loop2(i);
  }

  var promedio = promedios(salida);
  return promedio;
}; //Ingreso un array con id de alumnos no repetidos y le calculo el promedio


exports.promedioDeEdadByUniversidadId = promedioDeEdadByUniversidadId;

var promedios = function promedios(iDalumnos) {
  var contador = 0;

  var _loop3 = function _loop3(i) {
    var alumno = _basededatos["default"].alumnos.find(function (alumno) {
      return alumno.id === iDalumnos[i];
    }).edad;

    contador = contador + alumno;
  };

  for (var i = 0; i < iDalumnos.length; i++) {
    _loop3(i);
  }

  return contador / iDalumnos.length;
};