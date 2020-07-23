import express from 'express';

import { connect } from '../connection'; //Importamos el metodo connect

const router = express.Router();

//devolver todos alumnos
router.get('/', async (req, res) => {
  try {
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('alumnos').find({}).toArray();
    res.json({ salida });
  } catch (e) {
    console.log(e);
  }
});

//devolver todos los alumnos cuyo nombre es XXX (considerar mayúsculas y minúsculas)
router.get('/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre; //es un string. parseInt para pasar a entero
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db
      .collection('alumnos')
      .find({ nombre: nombre })
      .toArray();
    res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

//Crear un alumno son los datos enviados en body, y devolver el nuevo alumno insertado
router.post('/', async (req, res) => {
  try {
    // TIP: En req.body viene los datos
    const db = await connect();
    const alumno = {
      id: req.body.id,
      nombre: req.body.nombre,
      edad: req.body.edad,
      provincia: req.body.provincia,
    };
    const salida = await db.collection('alumnos').insertOne(alumno);
    res.json(salida.ops[0]);
  } catch (e) {
    console.log(e);
  }

  //Error con el insert
  //eprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
});

//Actualizar el alumno indicado en "id" con los datos enviados en body, y devolver el alumno modificado
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateAlumno = {
      nombre: req.body.nombre,
      edad: req.body.edad,
    };
    const db = await connect();
    await db
      .collection('alumnos')
      .updateOne({ id: id }, { $set: updateAlumno });
    const salida = await db.collection('alumnos').findOne({ id: id });
    res.json({ salida });
  } catch (error) {
    console.log(error);
  }
});

//Eliminar el alumno indicado en "id" y devolver un objeto JSON {ok: true}
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await connect();
    const salida = await db.collection('alumnos').deleteOne({ id: id });
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
});

//Actualizar el alumno indicado en "id" con los datos enviados en body, y devolver el alumno modificado
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateAlumno = {
      nombre: req.body.nombre,
      edad: req.body.edad,
    };
    const db = await connect();
    await db
      .collection('alumnos')
      .updateOne({ id: id }, { $set: updateAlumno });
    const salida = await db.collection('alumnos').findOne({ id: id });
    res.json({ salida });
  } catch (error) {
    console.log(error);
  }
});

//Eliminar el alumno indicado en "id" y devolver un objeto JSON {ok: true}
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await connect();
    const salida = await db.collection('alumnos').deleteOne({ id: id });
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
});

export default router;
