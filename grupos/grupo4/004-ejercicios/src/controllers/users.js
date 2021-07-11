import express from 'express';
import usersAPI from '../helpers/usersApiHelper';
import albumsAPI from '../helpers/albumsApiHelper';
import postsAPI from '../helpers/postsApiHelper';

const routes = express.Router();

/**
 *
 * @param {{
 *    userId: number
 *  }[]} data
 * @return {any}
 */
const cleanUserId = (data) => {
  data.forEach((d) => {
    delete d.userId;
  });
};

routes.get('/', async (req, res) => {
  const users = await usersAPI.list();
  const albums = await albumsAPI.list(false);
  const posts = await postsAPI.list(false);

  for (const user of users) {
    user.albums = albums.filter((a) => a.userId === user.id);
    cleanUserId(user.albums);

    user.posts = posts.filter((f) => f.userId === user.id);
    cleanUserId(user.posts);
  }

  res.send(users);
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await usersAPI.get(id);
  res.send(data);
});

export default routes;
