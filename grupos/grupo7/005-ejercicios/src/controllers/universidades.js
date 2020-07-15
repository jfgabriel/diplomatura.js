import express from 'express';
import { getDataFromCollectionFilterId } from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const universidades = await getDataFromCollectionFilterId('universidades');
  res.json(universidades);
});

router.get('/:id', async function (req, res) {
  const universidades = await getDataFromCollectionFilterId('universidades', req.params.id);
  res.json(universidades);
});

export default router;
