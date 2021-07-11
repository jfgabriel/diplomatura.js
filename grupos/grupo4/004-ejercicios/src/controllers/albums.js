import express from 'express';
import albumsAPI from '../helpers/albumsApiHelper';

const routes = express.Router();

routes.get('/', async (req, res) => {
  const data = await albumsAPI.list();
  res.send(data);
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await albumsAPI.get(id);
  res.send(data);
});

export default routes;
