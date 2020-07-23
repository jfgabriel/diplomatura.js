import { connect } from '../helpers/helper';
import { ObjectId } from 'mongodb';

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
   * @return [MongoClient, Collection<Any>]
   */
  async _getConexion() {
    const client = await connect(URL_DEFAULT_CONNECTION);
    const db = client.db(DEFAULT_DATABASE);
    const coleccion = db.collection(this._nombreColeccion);
    return [client, coleccion];
  }

  /**
   * Obtener todos los documentos
   * @return [{json<T>}] Arreglo de documentos
   */
  async getAll() {
    const [client, coleccion] = await this._getConexion(); //desconstructor
    const resultado = await coleccion.find({}).toArray();
    await client.close();
    return resultado;
  }

  /**
   * Obtener documento por id
   * @param {string} id
   * @return {json<T>} documento
   */
  async getById(id) {
    const [client, coleccion] = await this._getConexion(); //desconstructor
    const resultado = await coleccion.findOne({ _id: new ObjectId(id) });
    await client.close();
    return resultado;
  }

  /**
   * Obtener documento por id
   * @param {string} clave
   * @param {any} valor
   * @return {[json<T>]} arreglo de documentos encontrados
   */
  async find(clave, valor) {
    const [client, coleccion] = await this._getConexion(); //desconstructor
    const resultado = await coleccion.find({ [clave]: valor }).toArray();
    await client.close();
    return resultado;
  }

  // /**
  //  * Obtener documento por id
  //  * @return {int}
  //  */
  // async getMaxId() {
  //   const [client, coleccion] = await this._getConexion(); //desconstructor
  //   const resultado = await coleccion
  //     .find({})
  //     .sort({ id: -1 })
  //     .limit(1)
  //     .select('id');
  //   await client.close();
  //   return resultado[0].id;
  // }

  // /**
  //  * Obtiene un id para un nuevo documento
  //  * @return {int}
  //  */
  // async getNewId() {
  //   const id = await this.getMaxId();
  //   return id + 1;
  // }

  /**
   * almacena un documento.
   * @param {json<T>} documento
   * @return {json<T>} documento guardado
   */
  async save(documento) {
    const [client, coleccion] = await this._getConexion(); //desconstructor
    const resultado = await coleccion.insertOne(documento);
    const id = resultado.insertedId;
    await client.close();
    return await this.getById(id);
  }

  /**
   * actualiza un documento identificado por su id
   * @param {string} id
   * @param {json<T>} documento
   * @return {json<T>} documento anterior
   */
  async updateById(id, documento) {
    const [client, coleccion] = await this._getConexion(); //desconstructor
    const resultado = await coleccion.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: documento }
    );
    await client.close();
    return resultado;
  }

  /**
   * actualiza un documento identificando su id
   * @param {String} id
   * @return {json<T>} documento eliminado
   */
  async deleteById(id) {
    const [client, coleccion] = await this._getConexion(); //desconstructor
    const resultado = await coleccion.findOneAndDelete({
      _id: new ObjectId(id),
    });
    await client.close();
    return resultado;
  }
}
