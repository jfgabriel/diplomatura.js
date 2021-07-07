// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './basededatos';
import { helpers } from './helpers';

// 2) Implementar una función que obtenga una universidad por Id
const infoUniversidad = helpers.getUniversidadId(1);
console.log('--- Ejercicio 2 ---');
console.log('Universidad:', infoUniversidad);
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados

// 3) Implementar una función que obtenga un profesor por Id
console.log('--- Ejercicio 3 ---');
const infoProfesor = helpers.getProfesorId(1);
console.log('Profesor:', infoProfesor);

// 4) Implementar una función que obtenga una materia por Id
console.log('--- Ejercicio 4 ---');
const infoMateria = helpers.getMateriaId(1);
console.log('Materia:', infoMateria);

// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
const funcionGeneral = helpers.getId('universidades', 2);
console.log('Genérico: ', general);

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos

// 6) Mover helpers y el todo el código a un módulo, creando un nuevo archivo helpers.js

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla

const ultimoId = helpers.getUltimoId('profesores');
console.log('El último ID utilizado en la tabla es: ', ultimoId);

// 8) Importar helpers desde su propio módulo

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper
const provinciaNueva = helpers.setProvincia('Tucuman');
if (provinciaNueva)
  console.log('La provincia insertada tiene el Id: ', provinciaNueva);
else console.log('La provincia insertada ya existe en la BD');

// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres
console.log('Materia: ', helpers.infoByMateria(2));

// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
console.log('NOTAS DE ALUMNOS');
console.log('----------------');
console.log(helpers.infoByAlumno());
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...

// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas

helpers.calificacionByAlumno(
  'Felipe Vidal Soto',
  'Programación orientada a objetos',
  10
)
  ? console.log(
      'Se insertó correctamente el alumno y la nota en la tabla calificaciones',
      database.calificaciones
    )
  : console.log('El alumno ya posee una calificación en esa materia');
