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
    const universidades = await getDataFilterName('universidades', nombre);
    res.json(universidades);
  } else {
    const universidades = await getDataFilterId('universidades');
    res.json(universidades);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const universidades = await getDataFilterId('universidades', id);
  res.json(universidades);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevaUni = await insertData('universidades', req);
  res.json(nuevaUni);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editUni = await updateData('universidades', id, body);
  res.json(editUni);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteUni = await deleteData('universidades', id);
  res.json(deleteUni);
});

export default router;
