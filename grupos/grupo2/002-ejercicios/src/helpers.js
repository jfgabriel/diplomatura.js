import { database } from './baseDeDatos';

export const helpers = {

    getUniversidad: function (id) {
        return database.universidades.find(element => { return element.id === id });
    },
    getProfesor: function (id) {
        return database.profesores.find(element => { return element.id === id });
    },
    getMateria: function (id) {
        return database.materias.find(element => { return element.id === id });
    },
    getAnyById: function (id, tableName) {
        return database[tableName].find(element => { return element.id === id });
    },
    getLastId: function (tableName) {
        let max = 0;
        database[tableName].map(element => {
            max = Math.max(element.id, max);
        })
        return max;
    }
};