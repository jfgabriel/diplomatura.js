import express from 'express';
import { getDataFromCollectionFilterId } from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const provincias = await getDataFromCollectionFilterId('provincias');
  res.json(provincias);
});

router.get('/:id', async function (req, res) {
  const provincias = await getDataFromCollectionFilterId('provincias', req.params.id);
  res.json(provincias);
});

router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

// Completar el resto de los métodos
// router....

export default router;
