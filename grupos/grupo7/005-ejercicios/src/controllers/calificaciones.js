import express from 'express';
import { getDataFromCollectionFilterId } from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const alumnos = await getDataFromCollectionFilterId('alumnos');
  res.json(alumnos);
});

router.get('/:id', async function (req, res) {
  const alumnos = await getDataFromCollectionFilterId('alumnos', req.params.id);
  res.json(alumnos);
});

export default router;
