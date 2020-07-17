import express from 'express';

import { connect } from '../connection'; //Importamos el metodo connect

const router = express.Router();

//consultar todo los alumnos
router.get('/', async (req, res) => {
  try {
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('alumnos').find({}).toArray();
    if (!salida) {
      res.status(404).json({
        message: 'Error obtenido de la lista de Alumnos',
        //https://expressjs.com/es/guide/error-handling.html
        //http://ottocol.github.io/ADI_1516/practicas/2_intro_Node/enunciado.html
      });
      db.close();
    }
    res.json(salida);
  } catch (e) {
    console.log(e);
  }
});

//obtener un alumno por id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id); //es un string
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('alumnos').findOne({ id: id });
    if (!salida) {
      res.status(404).json({
        message: 'No se registra el Alumno',
      });
    }
    res.json({ salida });
  } catch (e) {
    console.log(e);
  }
});

router.get('/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre; //es un string
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db
      .collection('alumnos')
      .find({ nombre: nombre })
      .toArray();
    if (!salida) {
      res.status(404).json({
        message: 'No se registra el Alumno',
      });
    }
    res.json({ salida });
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
    if (!salida) {
      res.status(404).json({
        message: 'No se pudo insertar el Alumno',
      });
    }
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
    if (!salida) {
      res.status(404).json({
        message: 'No se pudo eliminar el Alumno',
      });
    }
    if (salida) {
      res.status(200).json({
        message: 'ok:true',
      });
    }
    res.json(salida);
  } catch (error) {
    console.log(error);
  }
});

//actualizar alumno.-
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

// Completar el resto de los métodos
// router....

export default router;
