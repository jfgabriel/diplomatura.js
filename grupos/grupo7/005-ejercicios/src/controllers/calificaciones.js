import express from 'express';
import {
  getDataFilterId,
  insertData,
  updateData,
  deleteData,
} from '../db_helpers.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const cal = await getDataFilterId('calificaciones');
  res.json(cal);
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const cal = await getDataFilterId('calificaciones', id);
  res.json(cal);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevaCal = await insertData('calificaciones', req);
  res.json(nuevaCal);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editCal = await updateData('calificaciones', id, body);
  res.json(editCal);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteCal = await deleteData('calificaciones', id);
  res.json(deleteCal);
});

export default router;
