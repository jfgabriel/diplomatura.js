import { ApiHelper } from './apiHelper';
import usersAPI, { User } from './usersApiHelper';

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {number} userId
 * @property {string} title
 * @property {string} body
 *
 * @extends ApiHelper<Post>
 */
class PostsApiHelper extends ApiHelper {
  constructor() {
    super('/posts');
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
   * @return {Array<Post & {
   *    comments: any[]
   *  }>}
   */
  async get(id) {
    const data = await super.get(id);

    data.comments = await this.request(`/${id}/comments`);

    data.comments.forEach((c) => {
      delete c.postId;
    });

    return data;
  }
}

export default new PostsApiHelper();
