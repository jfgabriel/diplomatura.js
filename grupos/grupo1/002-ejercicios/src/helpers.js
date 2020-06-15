// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js
// Ver archivo helpers


import { database } from './basededatos';

const getById =  (table) => (id) => database[table].find(item => item.id === id);
const getUniversidadById = getById('universidades');
const getProfesorbyId = getById('profesores');
const getMateriabyId = getById('materias');


// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
// Ver archivo helpers

const getLastId = (table) =>  Math.max(...database[table].map(item => item.id)) ;


export const helpers = {
    getById,
    getUniversidadById,
    getProfesorbyId,
    getMateriabyId,
    getLastId,

}
