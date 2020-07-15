import express from 'express';
import { getDataFromCollection } from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const alumnos = await getDataFromCollection('alumnos');
  res.json(alumnos);
});

router.get('/:id', async function (req, res) {
  const alumnos = await getDataFromCollection('alumnos', req.params.id);
  res.json(alumnos);
});

router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

// Completar el resto de los métodos
// router....

export default router;
