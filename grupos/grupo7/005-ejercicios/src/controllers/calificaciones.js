import express from 'express';
import { helpers } from '../db_helpers.js';

const parseData = (el) => {
  return {
    alumno: el.alumno,
    materia: el.materia,
    nota: el.nota,
  };
};

const router = express.Router();

router.get('/', async function (req, res) {
  const cal = await helpers.getDataFilterId('calificaciones');
  res.json(cal);
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const cal = await helpers.getDataFilterId('calificaciones', id);
  res.json(cal);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const newCal = await helpers.insertData('calificaciones', parseData(body));
  res.json(newCal);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const edCal = await helpers.updateData('calificaciones', id, parseData(body));
  res.json(edCal);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const delCal = await helpers.deleteData('calificaciones', id);
  res.json(delCal);
});

export default router;
