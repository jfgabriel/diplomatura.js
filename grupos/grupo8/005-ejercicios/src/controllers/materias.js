import express from 'express';
import { helpers } from '../helpers';

// Conexion a la BD
const router = express.Router();

//Obtiene todas las materias
router.get('/', async (req, res) => {
  const result = await helpers.getCollection('materias');
  res.json(result);
});

//Obtiene materia por nombre
router.get('/:id', async function (req, res) {
  const result = await helpers.getCollectionId(
    parseInt(req.params.id),
    'materias'
  );

  res.json(result);
});

// Ingresa una nueva materia.
router.post('/', async function (req, res) {
  const materia = {
    id: parseInt(req.body.id),
    nombre: req.body.nombre,
    profesores: req.body.profesores,
    universidad: req.body.universidad,
  };

  const resultInsert = await helpers.postCollection(materia, 'materias');

  res.json(resultInsert);
});

// Actualiza una materia buscandola por ID
router.put('/:id', async function (req, res) {
  const datos = {
    profesores: req.body.profesores,
    universidad: req.body.universidad,
  };

  const resultUpdate = await helpers.putCollection(
    parseInt(req.params.id),
    datos,
    'materias'
  );

  res.json(resultUpdate);
});

//Elimina una materia por ID
router.delete('/:id', async function (req, res) {
  const resultDetele = await helpers.deleteDocument(
    parseInt(req.params.id),
    'materias'
  );
  res.json({ ok: resultDetele.deletedCount > 0 });
});

export default router;
