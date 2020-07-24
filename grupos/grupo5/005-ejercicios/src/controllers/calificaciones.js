import express from 'express';
import { ObjectId } from 'mongodb';

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

router.get('/:id', async (req, res) => {
  //busqueda
  try {
    var id = req.params.id;
    var o_id = new ObjectId(id);
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db
      .collection('calificaciones')
      .find({
        _id: o_id,
      })
      .toArray();
    res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

router.put('/', async (req, res) => {
  //actualiza una calificación (entra alumno, materia y la nota a actualizar)
  try {
    const alum = parseInt(req.body.alumno);
    const mat = parseInt(req.body.materia);
    const not = parseInt(req.body.nota);

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

router.delete('/:id', async (req, res) => {
  //borra una calificación
  try {
    var id = req.params.id;
    var o_id = new ObjectId(id);
    const db = await connect();
    const salida = await db.collection('calificaciones').deleteOne({
      _id: o_id,
    });
    res.json(salida);
  } catch (error) {
    console.log(error);
  }
});

export default router;
