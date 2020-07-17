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
    const alumnos = await getDataFromCollectionFilterName('alumnos', nombre);
    res.json(alumnos);
  }else{
    const alumnos = await getDataFromCollectionFilterId('alumnos');
    res.json(alumnos);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const alumnos = await getDataFromCollectionFilterId('alumnos', id);
  res.json(alumnos);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevoAlumno = await insertData('alumnos', req);
  res.json(nuevoAlumno);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editAlumno = await updateData('alumnos', id , body);
  res.json(editAlumno);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteAlumno = await deleteData('alumnos', id);
  res.json(deleteAlumno);
});

export default router;
