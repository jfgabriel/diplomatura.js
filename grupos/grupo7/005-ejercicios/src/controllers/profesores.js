import express from 'express';
import { getDataFromCollectionFilterId } from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const profesores = await getDataFromCollectionFilterId('profesores');
  res.json(profesores);
});

router.get('/:id', async function (req, res) {
  const profesores = await getDataFromCollectionFilterId('profesores', req.params.id);
  res.json(profesores);
});

export default router;
