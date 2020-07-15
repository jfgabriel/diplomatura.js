import express from 'express';

import {connect} from '../connection'; //Importamos el metodo connect

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('alumnos').find({}).toArray();
    res.json({salida});
  }
  catch(e){
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const id = parseInt(req.params.id); //es un string
    const db = await connect(); //Me devuelve una conexion a la base de datos
    const salida = await db.collection('alumnos').findOne({'id':id});
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

    const alumno = {
      id:req.body.id, 
      nombre:req.body.nombre, 
      edad:req.body.edad, 
      provincia:req.body.provincia
    };
    const salida = await db.collection('alumnos').insertOne(alumno);
    res.json(salida.ops[0]);
  }
  catch(e){
    console.log(e);
  }

  //Error con el insert
  //eprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.
});

router.delete('/:id', async (req, res) => {
  try{
  const id = parseInt(req.params.id); 
  const db = await connect();
  const salida = await db.collection('alumnos').deleteOne({'id':id});
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
