import express from 'express';
import { getDataFromCollectionFilterId } from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const materias = await getDataFromCollectionFilterId('materias');
  res.json(materias);
});

router.get('/:id', async function (req, res) {
  const materias = await getDataFromCollectionFilterId('materias', req.params.id);
  res.json(materias);
});

export default router;
