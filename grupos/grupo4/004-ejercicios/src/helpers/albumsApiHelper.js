import { ApiHelper } from './apiHelper';
import usersAPI, { User } from './usersApiHelper';

/**
 * @typedef {Object} Album
 * @property {number} id
 * @property {number} userId
 * @property {string} title
 *
 * @extends ApiHelper<Album>
 */
class AlbumsApiHelper extends ApiHelper {
  constructor() {
    super('/albums');
  }

  /**
   * @param {boolean} fillUsers
   * @return {Array<Post & {
   *    userId: number,
   *    user?: User
   *  }>}
   */
  async list(fillUsers = true) {
    const data = await super.list();

    if (fillUsers) {
      const usersList = await usersAPI.list();

      data.forEach((post) => {
        post.user = usersList.find((user) => user.id === post.userId);
        delete post.userId;
      });
    }

    return data;
  }

  /**
   * @inheritdoc
   * @return {Array<Album & {
   *    photos: any[]
   *  }>}
   */
  async get(id) {
    const data = await super.get(id);

    data.photos = await this.request(`/${id}/photos`);

    data.photos.forEach((p) => {
      delete p.albumId;
    });

    return data;
  }
}

export default new AlbumsApiHelper();
