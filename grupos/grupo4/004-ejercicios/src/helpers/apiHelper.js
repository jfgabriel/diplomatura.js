import fetch from 'node-fetch';

const URL_API = 'https://jsonplaceholder.typicode.com';

/**
 * @abstract
 * @template T
 */
export class ApiHelper {
  /**
   * Constructor.
   *
   * @param {string} baseUri URI base.
   */
  constructor(baseUri) {
    this._baseUri = baseUri;
  }

  /**
   * API Request.
   *
   * @param {string} uri URI destino.
   * @return {Promise<T | T[]>}
   */
  async request(uri) {
    const url = `${URL_API}${this._baseUri}${uri}`;
    console.info('Request:', url);

    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  /**
   * Listar.
   *
   * @return {Promise<T[]>}
   */
  async list() {
    return await this.request('/');
  }

  /**
   * Obtener un registro.
   *
   * @param {number} id
   * @return {Promise<T>}
   */
  async get(id) {
    return await this.request(`/${id}`);
  }
}
