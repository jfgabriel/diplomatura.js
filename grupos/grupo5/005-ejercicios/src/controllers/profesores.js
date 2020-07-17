import express from 'express';

import {connect} from '../connection'; //Importamos el metodo connect

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('profesores').find({}).toArray();

    res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const db = await connect();
    const salida = await db
      .collection('profesores')
  .find({ "nombre": nombre }).toArray(); //verificar  cuando no encuentra el registro
    if (salida === null)
      res.json('No se encontró ningun profesor con ese nombre');
    else res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    //funciona si envío un JSON, si paso los datos como Multipart/Form no los toma los parámetros
    const db = await connect();
    const profesor = {
      id: req.body.id,
      nombre: req.body.nombre,
    };
    let profe = await db
      .collection('profesores')
      .findOne({ nombre: req.body.nombre });
    if (profe === null) {
      profe = await db.collection('profesores').findOne({ id: req.body.id });
      if (profe === null) {
        const salida = await db.collection('profesores').insertOne(profesor);
        res.json(salida.ops[0]);
      } else {
        res.json({ status: 'ya existe un profesor con ese id' });
      }
    } else {
      res.json('ya existe un profesor con ese nombre');
    }
  } catch (e) {
    console.log(e);
  }

  //Error con el insert
  //eprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
});

router.put('/:id', async (req, res) => {
  try {
    const db = await connect();
    const id = parseInt(req.params.id);
    /*
    const nuevoNombre = { nombre: req.body.nombre };
    const filtro = { id: id };  */
    const salida = await db.collection('profesores').findOneAndUpdate({'id' : id}, {$set: {nombre: req.body.nombre}});

    res.json(salida);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await connect();
    const salida = await db.collection('profesores').deleteOne({ id: id });
    res.json(salida);
  } catch (error) {
    console.log(error);
  }
});

// Completar el resto de los métodos
// router....

export default router;
