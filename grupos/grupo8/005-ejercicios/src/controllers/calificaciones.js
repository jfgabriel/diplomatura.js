import express from 'express';
import { connect } from '../connection';

const router = express.Router();

/* Devuelve todas las calificaciones  */
router.get('/', async function (req, res) {
  const db = await connect();
  const result = await db.collection('calificaciones').find().toArray();
  res.json(result);
});

/* Devuelve las calificaciones de un alumno */
router.get('/:id', async function (req, res) {
  const db = await connect();
  const idStudent = parseInt(req.params.id);
  const result = await db
    .collection('calificaciones')
    .find({ alumno: idStudent })
    .toArray();

  const resultStudent = await db.collection('alumnos').find({}).toArray();
  const resultAsign = await db.collection('materias').find({}).toArray();

  const resultSearch = result.map((r) => {
    return {
      alumno: resultStudent.find((alumno) => alumno.id === r.alumno).nombre,
      materia: resultAsign.find((materia) => materia.id === r.materia).nombre,
      nota: r.nota,
    };
  });

  res.json(resultSearch);
});

/* Crear una calificacion con los datos del alumno, materia y nota, y mostrarla*/
router.post('/', async function (req, res) {
  const db = await connect();

  const qualitfication = {
    alumno: parseInt(req.body.alumno),
    materia: parseInt(req.body.materia),
    nota: parseInt(req.body.nota),
  };

  const resultInsert = await db
    .collection('calificaciones')
    .insertOne(qualitfication);

  res.json(resultInsert.ops);
});

/* Actualiza calificación del alumno */
router.put('/:id', async function (req, res) {
  const db = await connect();

  const idAlumno = parseInt(req.params.id);
  const notaNueva = parseInt(req.body.nota);

  const resultUpdate = await db
    .collection('calificaciones')
    .findOneAndUpdate({ alumno: id }, { $set: { nota: notaNueva } });

  res.json(resultUpdate.value);
});

/* Eliminar calificación de un alumno */
router.delete('/:id', async function (req, res) {
  const db = await connect();

  const idAlumno = parseInt(req.params.id);

  const resultDelete = await db
    .collection('calificaciones')
    .deleteOne({ alumno: idAlumno });

  resultDelete.deletedCount > 0
    ? res.json({ ok: true })
    : res.json({ ok: false });
});

export default router;
