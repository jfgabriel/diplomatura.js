import { ApiHelper } from './apiHelper';

/**
 * @typedef {Object} Company
 * @property {string} name
 * @property {string} catchPhrase
 * @property {string} bs
 *
 * @typedef {Object} Geo
 * @property {string} lat
 * @property {string} lng
 *
 * @typedef {Object} Address
 * @property {string} street
 * @property {string} suite
 * @property {string} city
 * @property {string} zipcode
 * @property {Geo} geo
 *
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {Address} address
 * @property {string} phone
 * @property {string} website
 * @property {Company} company
 *
 * @extends ApiHelper<User>
 */
class UsersApiHelper extends ApiHelper {
  constructor() {
    super('/users');
  }
}

export default new UsersApiHelper();
