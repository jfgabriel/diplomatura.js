import express, { response } from 'express';
import {connect} from '../con';
import {ObjectId} from 'mongodb';
const router = express.Router();

//Lista profesor
router.get('/', async function (req, res) {
  const db=await connect();
  const profesores=await db.collection('profesores').find().toArray();
  res.json(profesores);
});

//Busca profesor por el nombre
router.get('/',async function (req,res){
  const db= await connect();
  if (req.query.hasOwnProperty("nombre")){
    const result=await db.collection('profesores').find({nombre:{'$regex' : req.query.nombre, '$options' : 'i'}}).toArray();
    res.json(result);
  }
  else{
    res.end("Parametro invalido");
  }
  
});


//inserta un profesor
router.post('/',async function(req,res){
  const db=await connect();
  const profesor={
    nombre:req.body.nombre
  }
  const result=await db.collection('profesores').insert(profesor);
  res.json(result.ops[0]);
});

//Busca un profesor
router.get('/:id',async function (req, res) {
    let id=new ObjectId(req.params.id);
    const db=await connect();
    const result=await db.collection('profesores').findOne({_id:id})
    res.json(result);
});
//Actualiza profesor
router.put('/:id',async function (req,res){
  let actualizado={}
  let id=new ObjectId(req.params.id);
  const profesorActualizado={
    nombre:req.body.nombre
  }
  const db=await connect();
  const result=await db.collection('profesores').updateOne({_id:id},{$set:profesorActualizado});
  if(result.result.ok==true){
   actualizado=await db.collection('profesores').findOne({_id:id}) 
  
  }
  res.json(actualizado);

});


//Elimina profesor
router.delete('/:id',async function(req,res){
   let id=new ObjectId(req.params.id);
   let respuesta={ok:false};
   const db=await connect();  
   const result=await db.collection('profesores').remove({_id:id});
   if(result.result.ok==true){
     respuesta.ok=true;
     res.json(respuesta);
   }
  
});
/*router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});*/

// Completar el resto de los métodos
// router....

export default router;
