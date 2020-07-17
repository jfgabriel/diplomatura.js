import express from 'express';

import {connect} from '../connection'; //Importamos el metodo connect implementado con Async/Awayt

const router = express.Router();

router.post('/', async (req, res) => {
    try{
      const db = await connect(); //Me devuelve una conexion a la base de datos
      const jsonInput = {
          id:req.body.id, 
          nombre:req.body.nombre, 
          profesores:req.body.profesores, 
          universidad:req.body.universidad
      }
      const salida = await db.collection('materias').insertOne(jsonInput);
      res.json(salida.ops[0]);
    }
    catch(e){
      console.log(e);
    }
  });

router.get('/', async (req, res) => {
    try{
      const db = await connect(); //Me devuelve una conexion a la base de datos
      const nombreP = req.params.nombre;
      const salida = await db.collection('materias').find({}).toArray();
      res.json({salida});
    }
    catch(e){
      console.log(e);
    }
  });

router.get('/:nombre', async (req, res) => {
    try{
      const db = await connect(); //Me devuelve una conexion a la base de datos
      const nombreP = req.params.nombre;
      const salida = await db.collection('materias').find({"nombre" : nombreP}).toArray();
      res.json({salida});
    }
    catch(e){
      console.log(e);
    }
  });

router.delete('/:id', async (req, res) => {
    try{
      const db = await connect(); //Me devuelve una conexion a la base de datos
      const id = parseInt(req.params.id); 
      const jsonDelete = {
        "id" : id
      }; 
      const salida = await db.collection('materias').deleteOne(jsonDelete);
      res.json(salida.result.ok);
    }
    catch(e){
      console.log(e);
    }
  });

router.put('/:id', async (req, res) => {
    try{
    const id = parseInt(req.params.id); 
    const jsonUpdate ={
      nombre:req.body.nombre,
      profesores:req.body.profesores,
      universidad:req.body.universidad
    };
    const db = await connect();
    await db.collection('materias').updateOne({'id':id}, {$set:jsonUpdate});
    const salida = await db.collection('materias').findOne({'id':id});
    res.json({salida});
    }
    catch(error){
      console.log(error);
    }
  });

  export default router;