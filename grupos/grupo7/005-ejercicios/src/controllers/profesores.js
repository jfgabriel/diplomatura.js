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
    const profesores = await getDataFilterName('profesores', nombre);
    res.json(profesores);
  } else {
    const profesores = await getDataFilterId('profesores');
    res.json(profesores);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const profesores = await getDataFilterId('profesores', id);
  res.json(profesores);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevoProfesor = await insertData('profesores', req);
  res.json(nuevoProfesor);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editProfesor = await updateData('profesores', id, body);
  res.json(editProfesor);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteProfesor = await deleteData('profesores', id);
  res.json(deleteProfesor);
});

export default router;
