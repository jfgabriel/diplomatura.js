import express from 'express';
import postsAPI from '../helpers/postsApiHelper';

const routes = express.Router();

routes.get('/', async (req, res) => {
  const data = await postsAPI.list();
  res.send(data);
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await postsAPI.get(id);
  res.send(data);
});

export default routes;
