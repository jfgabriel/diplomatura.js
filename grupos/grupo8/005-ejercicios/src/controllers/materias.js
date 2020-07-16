import express from 'express';
import { connect } from '../connection';

const db = connect();
const router = express.Router();

//Obtiene todas las materias
router.get('/', async  (req, res) => {

  (await db).collection('materias').find().toArray()
  .then(elem => res.json(elem));
 
    });

//Obtiene materia por nombre
router.get('/:nombre', async function (req, res) {

  (await db).collection('materias').find({'nombre': req.params.nombre}).toArray()
  .then(elem => res.json(elem));

});

// Ingresa una nueva materia. 
router.post('/', async function (req, res) {
  const materia = {
    id: parseInt(req.body.id),
    nombre: req.body.nombre,  
    profesores: req.body.profesores,
    universidad: req.body.universidad,
  };

  (await db).collection('materias').insert(req.body)
  .then(elem => res.json(elem));
});

// Actualiza una materia buscandola por ID
router.put('/:id', async function (req, res) {

  (await db).collection('materias').findOneAndUpdate(
    {'id': parseInt(req.params.id)},
    {
      $set: {
        profesores: req.body.profesores,
        universidad: req.body.universidad
      }
    }
    )    
  .then(elem => res.json(elem));
});

// Elimina una materia por ID
router.delete('/:id', async function (req, res) {
console.log("ENTRA A DELETE ")
  
const result =(await db).collection('materias').deleteOne({'id': parseInt(req.params.id)});  

((await result).deletedCount) > 0 ? res.json({ ok: true}) : res.json({ ok: false });

});

export default router;
