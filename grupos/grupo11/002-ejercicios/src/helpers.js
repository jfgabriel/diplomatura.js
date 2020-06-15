
import { database } from './baseDeDatos';

const getTablaByProp = (table, prop, val) => database[table].find(x => x[prop] === val);

export const helpers = {
    getTabla: table => database[table],

    getUniversidadById: id => getTablaByProp('universidades', 'id', id),

    getProfesorById: id => getTablaByProp('profesores', "id", id),

    getMateriaById: id => getTablaByProp('materias', "id", id),
    getMateriaByNombre: nombre => getTablaByProp('materias', "nombre", nombre),

    getAlumnoById: id => getTablaByProp('alumnos', "id", id),
    getAlumnoByNombre: nombre => getTablaByProp('alumnos', "nombre", nombre),

    getUltimoId: table => database[table].sort((a,b) => b.id-a.id)[0]
};