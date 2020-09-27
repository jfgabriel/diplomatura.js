import express, { response } from 'express';
import {connect} from '../con';
import {ObjectId} from 'mongodb';
const router = express.Router();


//Lista las materias o busca el alumno por el nombre
router.get('/',async function (req,res){
  const db= await connect();
  let nombre = req.query.nombre;
  let busqueda = nombre ? {nombre:{'$regex' :new RegExp(nombre), '$options' : 'i'}} : null;
  const result=await db.collection('materias').find(busqueda).toArray();
  res.json(result);
  
});


//inserta una materia
router.post('/',async function(req,res){
  const db=await connect();
  const materia={
    nombre:req.body.nombre,
    universidad:req.body.universidad,
    profesores:req.body.profesores
  }
  const result=await db.collection('materias').insert(materia);
  res.json(result.ops[0]);
});

//Busca una materia
router.get('/:id',async function (req, res) {
    let id=new ObjectId(req.params.id);
    const db=await connect();
    const result=await db.collection('materias').findOne({_id:id})
    res.json(result);
});
//Actualiza una materia
router.put('/:id',async function (req,res){
  let id=new ObjectId(req.params.id);
  const db=await connect();
  await db.collection('materias').findOneAndUpdate({_id:id},{$set:req.body},{ returnOriginal: false },function (err, documents) {
        res.json(documents.value);
        
    });

});


//elimina una materia
router.delete('/:id',async function(req,res){
   let id=new ObjectId(req.params.id);
   let respuesta={ok:false};
   const db=await connect();  
   const result=await db.collection('materias').remove({_id:id});
   if(result.result.ok){
     respuesta.ok=true
     
   }
   res.json(respuesta);
});


export default router;
