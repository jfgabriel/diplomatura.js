import express from 'express';
import { helpers } from '../helpers';

const router = express.Router();

router.get('/', async function (req, res) {
  const result = await helpers.getCollection('profesores');
  res.json(result);
});

router.get('/:id', async function (req, res) {
  const idProfesor = parseInt(req.params.id);
  const result = await helpers.getCollectionId(idProfesor, 'profesores');
  // Completar
  res.json(result);
});

router.post('/', async function (req, res) {
  const dato = {
    id: parseInt(req.body.id),
    nombre: req.body.nombre,
  };

  const datoInsert = await helpers.postCollection(dato, 'profesores');
  res.json(datoInsert);
});

router.put('/:id', async function (req, res) {
  const idProfe = parseInt(req.params.id);
  const datos = req.body;
  const resultUpdate = await helpers.putCollection(
    idProfe,
    datos,
    'profesores'
  );
  res.json(resultUpdate);
});

router.delete('/:id', async function (req, res) {
  const idProfe = parseInt(req.params.id);
  const resultDelete = await helpers.deleteDocument(idProfe, 'profesores');

  res.json({ ok: resultDelete.deletedCount > 0 });
});

// Completar el resto de los métodos
// router....

export default router;
