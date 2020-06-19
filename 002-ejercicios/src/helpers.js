import { database } from './baseDeDatos';

export const helpers = {

    universidades: function (id) {
        return (database.universidades.find(elem => elem.id === id));
    },
    profesores: function (id) {
        return (database.profesores.find(elem => elem.id === id));
    },
    materias: function (id) {
        return (database.materias.find(elem => elem.id === id));
    },
    ultimoId: (tabla) =>
        Math.max.apply(
            Math,
            tabla.map((o) => o.id)
        ),
}
