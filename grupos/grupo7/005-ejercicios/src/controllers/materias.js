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
  const { nombre } = req.query;
  if (nombre) {
    const materias = await getDataFromCollectionFilterName('materias', nombre);
    res.json(materias);
  }else{
    const materias = await getDataFromCollectionFilterId('materias');
    res.json(materias);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const materias = await getDataFromCollectionFilterId('materias', id);
  res.json(materias);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevoMateria = await insertData('materias', req);
  res.json(nuevoMateria);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editMateria = await updateData('materias', id , body);
  res.json(editMateria);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteMateria = await deleteData('materias', id);
  res.json(deleteMateria);
});

export default router;
