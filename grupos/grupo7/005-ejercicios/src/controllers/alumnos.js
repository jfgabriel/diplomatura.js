import express from 'express';
import { 
  getDataFromCollectionFilterId, 
  getDataFromCollectionFilterName 
} from '../db.js';

const router = express.Router();

router.get('/', async function (req, res) {
  
  const nombre = req.query.nombre;
  if (nombre) {
    const alumnos = await getDataFromCollectionFilterName('alumnos', nombre);
    res.json(alumnos);
  }else{
    const alumnos = await getDataFromCollectionFilterId('alumnos');
    res.json(alumnos);
  }
  
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const alumnos = await getDataFromCollectionFilterId('alumnos', id);
  res.json(alumnos);
});

router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

router.put('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

router.delete('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

export default router;
