import express from 'express';

import { connect } from '../connection'; //Importamos el metodo connect

const router = express.Router();

router.post('/', async (req, res) => {
  //agrega una calificación
  try {
    const db = await connect();

    const calificacion = {
      alumno: parseInt(req.body.alumno),
      materia: parseInt(req.body.materia),
      nota: parseInt(req.body.nota),
    };
    const salida = await db
      .collection('calificaciones')
      .insertOne(calificacion);
    res.json(salida.ops[0]);
  } catch (e) {
    console.log(e);
  }
});

router.get('/', async (req, res) => {
  //lista todos
  try {
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('calificaciones').find({}).toArray();
    res.json({ salida });
  } catch (e) {
    console.log(e);
  }
});

router.get('/busqueda', async (req, res) => {
  //busqueda por body
  try {
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db
      .collection('calificaciones')
      .find({
        alumno: parseInt(req.body.alumno),
        materia: parseInt(req.body.materia),
      })
      .toArray();
    res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:alumno/:materia', async (req, res) => {
  //busqueda por header
  try {
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db
      .collection('calificaciones')
      .find({
        alumno: parseInt(req.params.alumno),
        materia: parseInt(req.params.materia),
      })
      .toArray();
    res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:alumno/:materia/:nota', async (req, res) => {
  //actualiza una calificación (entra alumno, materia y la nota a actualizar)
  try {
    const alum = parseInt(req.params.alumno);
    const mat = parseInt(req.params.materia);
    const not = parseInt(req.params.nota);

    const updateCalificacion = {
      alumno: alum,
      materia: mat,
      nota: not,
    };
    const db = await connect();
    await db
      .collection('calificaciones')
      .updateOne({ alumno: alum, materia: mat }, { $set: updateCalificacion });
    const salida = await db
      .collection('calificaciones')
      .findOne({ alumno: alum, materia: mat });

    res.json({ salida });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:alumno/:materia/:nota', async (req, res) => {
  //borra una calificación
  try {
    const db = await connect();
    const salida = await db.collection('calificaciones').deleteOne({
      alumno: parseInt(req.params.alumno),
      materia: parseInt(req.params.materia),
      nota: parseInt(req.params.nota)
    });
    res.json(salida);
  } catch (error) {
    console.log(error);
  }
});

export default router;
