import express, { response } from 'express';
import {connect} from '../con';
import {ObjectId} from 'mongodb';
const router = express.Router();


//Lista las calificaciones o busca por el id
router.get('/',async function (req,res){
  const db= await connect();
  let id = req.query.id;
  let busqueda = id ? {id:{'$regex' :new RegExp(id), '$options' : 'i'}} : null;
  const result=await db.collection('calificaciones').find(busqueda).toArray();
  res.json(result);
  
});


//inserta una calificacion
router.post('/',async function(req,res){
  const db=await connect();
  const calificacion={
    alumno:req.body.alumno,
    materia:req.body.materia,
    nota: req.body.nota
  }
  const result=await db.collection('calificaciones').insert(calificacion);
  res.json(result.ops[0]);
});

//Busca una calificacion
router.get('/:id',async function (req, res) {
    let id=new ObjectId(req.params.id);
    const db=await connect();
    const result=await db.collection('calificaciones').findOne({_id:id})
    res.json(result);
});
//Actualiza calificacion
router.put('/:id',async function (req,res){
  let id=new ObjectId(req.params.id);
  const db=await connect();
  await db.collection('calificaciones').findOneAndUpdate({_id:id},{$set:req.body},{ returnOriginal: false },function (err, documents) {
        res.json(documents.value);
        
    });

});


//Elimina una calificacion
router.delete('/:id',async function(req,res){
   let id=new ObjectId(req.params.id);
   let respuesta={ok:false};
   const db=await connect();  
   const result=await db.collection('calificaciones').remove({_id:id});
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
