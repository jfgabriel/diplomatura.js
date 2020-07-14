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
}
