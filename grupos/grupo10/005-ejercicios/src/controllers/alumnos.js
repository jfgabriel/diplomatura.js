import express, { response } from 'express';
import {connect} from '../con';
import {ObjectId} from 'mongodb';
const router = express.Router();


//Lista los alumnos o busca el alumno por el nombre
router.get('/',async function (req,res){
  const db= await connect();
  let nombre = req.query.nombre;
  let busqueda = nombre ? {nombre:{'$regex' :new RegExp(nombre), '$options' : 'i'}} : null;
  const result=await db.collection('alumnos').find(busqueda).toArray();
  res.json(result);
  
});


//inserta un alumno
router.post('/',async function(req,res){
  const db=await connect();
  const alumno={
    nombre:req.body.nombre,
    edad:req.body.edad
  }
  const result=await db.collection('alumnos').insert(alumno);
  res.json(result.ops[0]);
});

//Busca un alumno
router.get('/:id',async function (req, res) {
    let id=new ObjectId(req.params.id);
    const db=await connect();
    const result=await db.collection('alumnos').findOne({_id:id})
    res.json(result);
});
//Actualiza alumno
router.put('/:id',async function (req,res){
  let id=new ObjectId(req.params.id);
  const db=await connect();
  await db.collection('alumnos').findOneAndUpdate({_id:id},{$set:req.body},{ returnOriginal: false },function (err, documents) {
        res.json(documents.value);
        
    });

});


//Elimina alumno
router.delete('/:id',async function(req,res){
   let id=new ObjectId(req.params.id);
   let respuesta={ok:false};
   const db=await connect();  
   const result=await db.collection('alumnos').remove({_id:id});
   if(result.result.ok){
     respuesta.ok=true
     
   }
   res.json(respuesta);
});
/*router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});*/

// Completar el resto de los métodos
// router....

export default router;
