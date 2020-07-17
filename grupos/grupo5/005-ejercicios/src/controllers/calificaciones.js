import express from 'express';

import {connect} from '../connection'; //Importamos el metodo connect

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('calificaciones').find({}).toArray();
    res.json({salida});
  }
  catch(e){
    console.log(e);
  }
});

router.get('/busqueda', async (req, res) => {
  try{
    const id = parseInt(req.params.id); //es un string
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('calificaciones').find({'alumno': req.body.alumno, 'materia': req.body.materia}).toArray();
    res.json(salida);
  }
  catch(e){
    console.log(e);
  }
});
/*
localhost:8080/buscar.json?id=1&name=carlitos*/
router.get('/:alumno/:materia', async (req, res) => {
  try{
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('calificaciones').find({'alumno': parseInt(req.params.alumno), 'materia': parseInt(req.params.materia)}).toArray();
    res.json(salida);
  }
  catch(e){
    console.log(e);
  }
});


router.post('/', async (req, res) => {
  try{
  // TIP: En req.body viene los datos
    const db = await connect();
    //let nombre = req.body.nombre;
   // let edad = req.body.edad;
   // let provincia = req.body.provincia;

    const calificacion = {
      alumno: req.body.alumno, 
      materia: req.body.materia, 
      nota: req.body.nota
    };
    const salida = await db.collection('calificaciones').insertOne(calificacion);
    res.json(salida.ops[0]);
  }
  catch(e){
    console.log(e);
  }

  //Error con el insert
  //eprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
});

router.delete('/', async (req, res) => {
  try{
  const id = parseInt(req.params.id); 
  const db = await connect();
  const salida = await db.collection('calificaciones').deleteOne({'alumno': req.body.alumno, 'materia': req.body.materia});
  res.json(salida);
  
  //onsole.log(salida);
  }
  catch(error){
    console.log(error);
  }

});

// Completar el resto de los métodos
// router....

export default router;
