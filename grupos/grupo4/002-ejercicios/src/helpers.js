// 5) Crear un objeto 'helpers' que contenga las funciones como métodos.
// 6) Mover helpers y el todo el código a un módulo, creando un nuevo archivo helpers.js.

// 1) Importar el objeto 'database' del archivo "./basededatos".
import { database } from './baseDeDatos';

/**
 * @typedef {import('./baseDeDatos').TId} TId
 */

/**
 * @function
 * @template TCollection
 * @param {TCollection} collection
 */
const entity = (collection) => ({
  /**
   * @typedef TInstance
   * @type {TCollection[0]}
   */

  /**
   * @param {TId} id
   * @return {TInstance}
   */
  getById(id) {
    return collection.find((instance) => instance.id === id);
  },

  /**
   * @return {TId[]}
   */
  getIds() {
    return collection.map((instance) => instance.id);
  },

  /**
   * 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla.
   *
   * @return {TId}
   */
  getLastId() {
    return Math.max.apply(null, this.getIds());
  },

  /**
   * @return {TId}
   */
  getNextId() {
    return this.getLastId() + 1;
  },

  /**
   * 9) Implementar una función que permite insertar una nueva provincia en la base de datos.
   *
   * @param {TInstance} data
   * @return {TId}
   */
  insert(data) {
    const id = this.getNextId();
    const newData = Object.assign({}, data, { id });
    collection.push(newData);
    return id;
  },
});

export const Universidades = entity(database.universidades);
export const Profesores = entity(database.profesores);

export const Materias = {
  ...entity(database.materias),

  /**
   * 10) Implementar una función que reciba el id de una materia y
   * devuelva la materia son los ids de universidad y profesores
   * resueltos a sus nombres.
   *
   * @param {TId} id
   * @return {import('./baseDeDatos').TModelMateria & {
   *    profesores: string[],
   *    universidad: string
   *  }}
   */
  getByIdMap(id) {
    const materia = this.getById(id);

    materia.profesores = materia.profesores.map(
      (profesorId) => Profesores.getById(profesorId)?.nombre
    );

    materia.universidad = Universidades.getById(materia.universidad)?.nombre;

    return materia;
  },
};

export const Provincias = entity(database.provincias);
