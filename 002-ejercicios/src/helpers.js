import { database } from './basededatos';
//import { helpers } from './';

// 6) Mover helpers y el todo el código a un módulo, creando un nuevo archivo helpers.js

// 2) Implementar una función que obtenga una universidad por Id
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados
/*
const universidad = (idUniversidad) => {
    const resultado = database.universidades
    .find(universidad => universidad.id === idUniversidad);
    return resultado;
  }
*/

// 3) Implementar una función que obtenga un profesor por Id
/*
const profesor = (idProfesor) => {
    const resultado = database.profesores.find(profesor => profesor.id === idProfesor);
    return resultado;
}
*/

// 4) Implementar una función que obtenga una materia por Id
// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla

const getById = (tabla) => function(id) {
    return database[tabla].find((item) => item.id === id);
}

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos
const getUniversidadById = getById('universidades');
const getProfesorById = getById('profesores');
const getMateriaById = getById('materias');
const getAlumnoById = getById('alumnos');

const getMaxId = function(tabla){
  let maxId = 0;
  database[tabla].forEach(item => { 
      if(item.id > maxId){ 
          maxId = item.id; 
      }})
  return maxId;
}

export const helpers = {getUniversidadById, 
  getProfesorById, getMateriaById, getAlumnoById, getMaxId};





