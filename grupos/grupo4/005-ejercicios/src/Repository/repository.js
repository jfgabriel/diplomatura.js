import { connect } from '../helpers/helper';

const URL_DEFAULT_CONNECTION = 'mongodb://localhost:27017';
const DEFAULT_DATABASE = 'diplomatura';

export class Repository {
  /**
   * Constructor
   * @param {string} nombreColeccion
   */
  constructor(nombreColeccion) {
    this._nombreColeccion = nombreColeccion;
  }

  /**
   * Obtener todos los documentos
   * @return {json<T>}
   */
  async getAll() {
    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    const resultado = await coleccion.find({}).toArray();
    client.close();
    return resultado;
  }

  /**
   * Obtener documento por id
   * @param {int} idElemento
   * @return {json<T>}
   */
  async getById(idElemento) {
    const id = (idElemento = Number);
    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    const consulta = { id: id };
    const resultado = await coleccion.findOne(consulta);
    client.close();
    return resultado;
  }

  /**
   * Obtener documento por id
   * @param {string} clave
   * @param {any} valor
   * @return {[json<T>]}
   */
  async getBy(clave, valor) {
    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    const key = clave;
    const value = valor;
    //const resultado = await coleccion.find({ [key]: value }).toArray();

    //like + insesitive
    const resultado = await coleccion
      .find({ [key]: { $regex: new RegExp(`${value}*`, 'i') } })
      .toArray();

    client.close();
    return resultado;
  }

  /**
   * Obtener documento por id
   * @return {int}
   */
  async getMaxId() {
    //como se obtiene en mongodb el max?
    const all = await this.getAll();
    const ids = all.map((e) => e.id);
    const maxId = Math.max.apply(null, ids);
    return maxId;
  }

  /**
   * Obtiene un id para un nuevo documento
   * @return {int}
   */
  async getNewId() {
    return this.getMaxId() + 1;
  }

  /**
   * almacena un documento. Genera el Id del documento.
   * @param {json<T>}
   */
  async save(documento) {
    const nuevoId = getNewId();
    documento.id = nuevoId;

    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    const resultado = await coleccion.insertOne(documento);
    client.close();
    return resultado;
  }

  /**
   * actualiza un documento identificando su id
   * @param {json<T>}
   */
  async updateById(documento) {
    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    const resultado = await coleccion.replaceOne(
      { id: documento.id },
      documento
    );
    client.close();
    return resultado;
  }

  /**
   * actualiza un documento identificando su id
   * @param {json<T>}
   */
  async deleteById(documento) {
    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    const resultado = await coleccion.deleteOne({ id: documento.id });
    client.close();
    return resultado;
  }
}
