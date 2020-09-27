import express from 'express';
import { helpers } from '../db_helpers.js';

const parseData = (el) => {
  return {
    nombre: el.nombre,
    edad: el.edad,
    provincia: el.provincia,
  };
};

const router = express.Router();

router.get('/', async function (req, res) {
  const { nombre } = req.query;
  if (nombre) {
    const alumnos = await helpers.getDataFilterName('alumnos', nombre);
    res.json(alumnos);
  } else {
    const alumnos = await helpers.getDataFilterId('alumnos');
    res.json(alumnos);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const alumnos = await helpers.getDataFilterId('alumnos', id);
  res.json(alumnos);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevoAlumno = await helpers.insertData('alumnos', parseData(body));
  res.json(nuevoAlumno);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editAlumno = await helpers.updateData('alumnos', id, parseData(body));
  res.json(editAlumno);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteAlumno = await helpers.deleteData('alumnos', id);
  res.json(deleteAlumno);
});

export default router;
