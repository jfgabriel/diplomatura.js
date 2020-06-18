// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './baseDeDatos';
import { helpers } from './helpers';

// 2) Implementar una función que obtenga una universidad por Id
console.log('Ejercicio 2: ---------------------');
console.log(helpers.getUniversidadById(1));

// 3) Implementar una función que obtenga un profesor por Id
console.log('Ejercicio 3: ---------------------');
console.log(helpers.getProfesorById(1));

// 4) Implementar una función que obtenga una materia por Id
// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
console.log('Ejercicio 4: ---------------------');
console.log(helpers.getMateriaById(1));

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
console.log('Ejercicio 7: ---------------------');
console.log("Ultimo Alumno: " + helpers.getUltimoId(database.alumnos));
console.log("Ultima Materia: " + helpers.getUltimoId(database.materias));

// 8) Importar helpers desde su propio módulo
//import { helpers } from .'/helpers';

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper
console.log('Ejercicio 9: ---------------------');
console.log(helpers.addProvincia('La Pampa'));
console.log(database.provincias);

// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres
console.log('Ejercicio 10: ---------------------');
console.log(helpers.expandirMateria(2));
console.log(helpers.expandirMateria(1));

// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...
console.log('Ejercicio 11: ---------------------');
helpers.logNotasAlumnos();

// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas
console.log('Ejercicio 12: ---------------------');
helpers.setCalificacion('Pepe Argento', 'Diplomatura JS', 10);
console.log(database.calificaciones);
