"use strict";

var _basededatos = require("./basededatos");

var _helpers = require("./helpers");

// 1) Importar el objeto 'database' del archivo "./basededatos"
//Ejemplos de que funcionan los metodos del helpers
console.log("Datos universidad: ", _helpers.helpers.getUniversidadById(1));
console.log("Datos profesor: ", _helpers.helpers.getProfesorById(1));
console.log("Datos de materia: ", _helpers.helpers.getMateriaById(1)); // 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla

console.log("Ultimo id insertado en la tabla profesores: ", _helpers.helpers.getMaxId('profesores')); //8) Importar helpers desde su propio módulo
//import { helpers } from './';
// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper
//1 forma

console.log("ID de nueva provincia insertada: ", _helpers.helpers.insertarProvincia('Buenos Aires')); //2 forma

console.log("ID de nueva provincia insertada: ", _helpers.helpers.addItemTabla('Buenos Aires', 'provincias')); // 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres

console.log("Toda informacion relacionada a materia: ", _helpers.helpers.getInfoMateria(1)); // 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...

_helpers.helpers.getInformacionAlumnos(); // 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas


_helpers.helpers.guardarCalificacion('Rigoberto Manchuu', 'Ciencias Socialess', 100);

console.log(_basededatos.database.calificaciones[13]); //se puede observar que se cargo