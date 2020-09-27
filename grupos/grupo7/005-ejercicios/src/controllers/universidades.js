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
    const universidades = await helpers.getDataFilterName(
      'universidades',
      nombre
    );
    res.json(universidades);
  } else {
    const universidades = await helpers.getDataFilterId('universidades');
    res.json(universidades);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const universidades = await helpers.getDataFilterId('universidades', id);
  res.json(universidades);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevaUni = await helpers.insertData('universidades', parseData(body));
  res.json(nuevaUni);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editUni = await helpers.updateData(
    'universidades',
    id,
    parseData(body)
  );
  res.json(editUni);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteUni = await helpers.deleteData('universidades', id);
  res.json(deleteUni);
});

export default router;
