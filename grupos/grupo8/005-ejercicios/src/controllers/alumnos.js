import express from 'express';
import { helpers } from '../helpers';
const router = express.Router();

/* Obtiene todos los alumnos invocando al metodo del helpers */
router.get('/', async function (req, res) {
  const result = await helpers.getCollection('alumnos');
  res.json(result);
});

/* Obtiene el alumno con el id enviado por GET */
router.get('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const result = await helpers.getCollectionId(id, 'alumnos');
  res.json(result);
});

/* Inserta un alumno a la base de datos */
router.post('/', async function (req, res) {
  const resultInsert = await helpers.postCollection(req.body, 'alumnos');
  res.json(resultInsert);
});

/* Actualiza un alumno con id enviado por GET con los datos a actualizar enviados por POST */
router.put('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const resultUpdate = await helpers.putCollection(id, req.body, 'alumnos');
  res.json(resultUpdate);
});

/* Elimina un alumno con el id enviado por url */
router.delete('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const resultDelete = await helpers.deleteDocument(id, 'alumnos');
  res.json({ ok: resultDelete.deletedCount > 0 });
});

export default router;
