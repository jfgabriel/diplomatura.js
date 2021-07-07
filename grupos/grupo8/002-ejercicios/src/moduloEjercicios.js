//Ejercicio 1
import { database } from './basededatos';

//Ejercicio 2
export const obtenerUniversidad = (idUniversidad) => {
  return database.universidades.find((u) => u.id === idUniversidad);
};

//Ejercicio 3
export const obtenerProfesor = (idProfesor) => {
  return database.profesores.find((p) => p.id === idProfesor);
};

//Ejercicio 3 (genérico)
export const obtenerObjeto = (tabla, id) => {
  return database[tabla].find((item) => item.id === id);
};

//Ejercicio 4
export const obtenerMateria = (idMateria) => {
  return database.materias.find((m) => m.id === idMateria);
};

//Ejercicio 7
export const obtenerUltimoId = (tabla) => {
  const ultimo = database[tabla].length;
  return database[tabla].find((u) => u.id === ultimo).id;
};

//Ejercicio 9
export const insertarProvincia = (nombreProvincia) => {
  let ultimo = obtenerUltimoId('provincias');
  const nuevoId = ultimo + 1;
  const nuevaProvincia = {
    id: nuevoId,
    nombre: nombreProvincia,
  };
  database.provincias.push(nuevaProvincia);
  return nuevoId;
};
