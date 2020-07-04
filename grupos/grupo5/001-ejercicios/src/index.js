"use strict";

var _moduloEjercicios = require("./moduloEjercicios");

var _basededatos = _interopRequireDefault(require("./basededatos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// materiasAprobadasByNombreAlumno
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios materiasAprobadasByNombreAlumno.');
var materiasAprobadasPorSuzana = (0, _moduloEjercicios.materiasAprobadasByNombreAlumno)('Suzana Mendez');
console.log('Materias aprobadas por Suzana:', materiasAprobadasPorSuzana);
var materiasAprobadasPorAlina = (0, _moduloEjercicios.materiasAprobadasByNombreAlumno)('Alina Robles');
console.log('Materias aprobadas por Alina:', materiasAprobadasPorAlina); //const s = idDeAlumno('Suzanaz Mendez');
//console.log(s);
// expandirInfoUniversidadByNombre

console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios expandirInfoUniversidadByNombre.');
var infoUniversidadComahue = (0, _moduloEjercicios.expandirInfoUniversidadByNombre)('Universidad del Comahue');
console.log('Info comahue:', infoUniversidadComahue);
var infoUniversidadRio = (0, _moduloEjercicios.expandirInfoUniversidadByNombre)('Universidad de Rio Negro');
console.log('Info rio negro:', infoUniversidadRio); //const s = idDeUniversidad('Universidad del Cxomahue');
//console.log(s);
//const s = materiasUniversidad(1);
//console.log(s);
//const s = profesoresMateria(baseDeDatos.materias);
//console.log(s);
//const s = objetoAlumno2(10);
//console.log(s);
//const s = idDeAlumno2('Rigoberto Manchu');
//console.log(s);
//const s = objetosMaterias(1);
//console.log("materias de universidad",s);

var s = (0, _moduloEjercicios.promedioDeEdad)();
console.log("Promedio de edad: ", s);
var prom = 8;
var p = (0, _moduloEjercicios.alumnosConPromedioMayorA)(prom);
console.log("Estudiantes con promedio mayor: ", p);
var r = (0, _moduloEjercicios.materiasSinAlumnosAnotados)();
console.log("Materias sin alumnos inscriptos: ", r);
var t = (0, _moduloEjercicios.promedioDeEdadByUniversidadId)(1);
console.log("Promedio de edad de universidad: ", t);