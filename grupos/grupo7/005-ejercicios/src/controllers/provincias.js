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
    const provincias = await getDataFromCollectionFilterName('provincias', nombre);
    res.json(provincias);
  }else{
    const provincias = await getDataFromCollectionFilterId('provincias');
    res.json(provincias);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const provincias = await getDataFromCollectionFilterId('provincias', id);
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
  const editProvincia = await updateData('provincias', id , body);
  res.json(editProvincia);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteProvincia = await deleteData('provincias', id);
  res.json(deleteProvincia);
});

export default router;
