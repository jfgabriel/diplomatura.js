import express from 'express';
import { helpers } from '../db_helpers.js';

const parseData = (el) => {
  return {
    nombre: el.nombre,
    direccion: {
      calle: el.direccion.calle,
      numero: el.direccion.numero,
      provincia: el.direccion.provincia,
    },
  };
};

const router = express.Router();

router.get('/', async function (req, res) {
  const { nombre } = req.query;
  if (nombre) {
    const provincias = await helpers.getDataFilterName('provincias', nombre);
    res.json(provincias);
  } else {
    const provincias = await helpers.getDataFilterId('provincias');
    res.json(provincias);
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const provincias = await helpers.getDataFilterId('provincias', id);
  res.json(provincias);
});

router.post('/', async function (req, res) {
  const { body } = req;
  const nuevaProv = await helpers.insertData('provincias', parseData(body));
  res.json(nuevaProv);
});

router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const { body } = req;
  const editProv = await helpers.updateData('provincias', id, parseData(body));
  res.json(editProv);
});

router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const deleteProvincia = await helpers.deleteData('provincias', id);
  res.json(deleteProvincia);
});

export default router;
