import express from 'express';
import { helpers } from '../db_helpers.js';

const parseData = (el) => {
  return {
    nombre: el.nombre,
    profesores: el.profesores,
    universidad: el.universidad,
  };
};

const router = express.Router();

router.get('/', async function (req, res) {
  const { nombre } = req.query;
  if (nombre) {
    const materias = await helpers.getDataFilterName('materias', nombre);
    res.json(materias);
  } else {
    const materias = await helpers.getDataFilterId('materias');
    res.json(materias);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const materias = await helpers.getDataFilterId('materias', id);
  res.json(materias);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevoMateria = await helpers.insertData('materias', parseData(body));
  res.json(nuevoMateria);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editMateria = await helpers.updateData('materias', id, parseData(body));
  res.json(editMateria);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteMateria = await helpers.deleteData('materias', id);
  res.json(deleteMateria);
});

export default router;
