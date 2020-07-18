import express from 'express';
import {
  getDataFilterId,
  getDataFilterName,
  insertData,
  updateData,
  deleteData,
} from '../db_helpers.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const { nombre } = req.query;
  if (nombre) {
    const provincias = await getDataFilterName('provincias', nombre);
    res.json(provincias);
  } else {
    const provincias = await getDataFilterId('provincias');
    res.json(provincias);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const provincias = await getDataFilterId('provincias', id);
  res.json(provincias);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevaProvincia = await insertData('provincias', req);
  res.json(nuevaProvincia);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editProvincia = await updateData('provincias', id, body);
  res.json(editProvincia);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteProvincia = await deleteData('provincias', id);
  res.json(deleteProvincia);
});

export default router;
