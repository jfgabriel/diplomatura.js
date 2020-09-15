import { helpers } from './helpers';

// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js
// --> Listo
// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
// --> Listo
// 8) Importar helpers desde su propio módulo
// --> Listo

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper
console.log(helpers.newProvincia('hola'));

// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres
console.log(helpers.searchInfoMateriaById(5));
// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...
helpers.inforamcionAlumnos();
// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas
console.log(helpers.newCalificacion('el alumno', 'la materia', 6));
