import express from 'express';
import { helpers } from '../helpers';
const router = express.Router();

/* Devuelve todas las calificaciones  */
router.get('/', async function (req, res) {
  const result = await helpers.getCollection('calificaciones');
  res.json(result);
});

/* Devuelve las calificaciones de un alumno */
router.get('/:alumno', async function (req, res) {
  const idStudent = parseInt(req.params.alumno);

  //Buscamos las calificaciones del alumno
  const result = await helpers.getCollectionId(idStudent, 'calificaciones');

  const resultSearch = result.map((datos) => {
    return {
      alumno: datos.alumno,
      materia: datos.materia,
      nota: datos.nota,
    };
  });

  res.json(resultSearch);
});

/* Crear una calificacion con los datos del alumno, materia y nota, y mostrarla*/
router.post('/', async function (req, res) {
  const qualitfication = {
    alumno: parseInt(req.body.alumno),
    materia: parseInt(req.body.materia),
    nota: parseInt(req.body.nota),
  };

  const resultInsert = await helpers.postCollection(
    qualitfication,
    'calificaciones'
  );

  res.json(resultInsert);
});

/* Actualiza calificación del alumno */
router.put('/:id', async function (req, res) {
  const idAlumno = parseInt(req.params.id);
  const datos = req.body;
  const resultUpdate = await helpers.putCollection(
    idAlumno,
    datos,
    'calificaciones'
  );
  res.json(resultUpdate);
});

/* Eliminar calificación de un alumno */
router.delete('/:id', async function (req, res) {
  const idAlumno = parseInt(req.params.id);

  const resultDelete = await helpers.deleteCollection(
    idAlumno,
    'calificaciones'
  );

  res.json({ ok: resultDelete.deletedCount > 0 });
});

export default router;
