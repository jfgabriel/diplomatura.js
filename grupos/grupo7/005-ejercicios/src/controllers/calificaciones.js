import express from 'express';
import {
  getDataFromCollectionFilterId,
  getDataFromCollectionFilterName,
  insertData,
  updateData,
  deleteData
} from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const calificaciones = await getDataFromCollectionFilterId('calificaciones');
    res.json(calificaciones);
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const calificaciones = await getDataFromCollectionFilterId('calificaciones', id);
  res.json(calificaciones);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevaCal = await insertData('calificaciones', req);
  res.json(nuevaCal);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editCal = await updateData('calificaciones', id , body);
  res.json(editCal);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteCal = await deleteData('calificaciones', id);
  res.json(deleteCal);
});

export default router;
