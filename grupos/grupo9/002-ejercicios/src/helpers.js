
import { database } from './baseDeDatos';

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos

// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js

export const helpers = {

    // parametro array de  objetos que contienen el atributo id
    getByID: (id, arrayDatos) => {
        if (!id) return;
        return arrayDatos.find(a => a.id === id);
    },

    // 2) Implementar una función que obtenga una universidad por Id
    universidadById: (id) => {
        return helpers.getByID(id, database.universidades)
    },

    // 3) Implementar una función que obtenga un profesor por Id
    profesorById: (id) => {
        return helpers.getByID(id, database.profesores)
    },


    // 4) Implementar una función que obtenga una materia por Id
    materiasById: (id) => {
        return helpers.getByID(id, database.materias)
    },
    // 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
    ultimoIdByTabla: (tabla) => tabla.length,

    findByPropierty: (tabla, propierty, valor) => {
        return database[tabla].find((element) => element[propierty] === valor);
    },
    construirAgregar: (nombre, lista) => {
        let unElemento = { id: lista.length + 1, nombre: nombre };
        lista.push(unElemento);
        return unElemento;
    }
}