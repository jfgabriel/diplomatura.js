import express from 'express';
import { helpers } from '../db_helpers.js';

const parseData = (el) => {
  return {
    nombre: el.nombre,
  };
};

const router = express.Router();

router.get('/', async function (req, res) {
  const { nombre } = req.query;
  if (nombre) {
    const profesores = await helpers.getDataFilterName('profesores', nombre);
    res.json(profesores);
  } else {
    const profesores = await helpers.getDataFilterId('profesores');
    res.json(profesores);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const profesores = await helpers.getDataFilterId('profesores', id);
  res.json(profesores);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const newProf = await helpers.insertData('profesores', parseData(body));
  res.json(newProf);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editProf = await helpers.updateData('profesores', id, parseData(body));
  res.json(editProf);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteProfesor = await helpers.deleteData('profesores', id);
  res.json(deleteProfesor);
});

export default router;
