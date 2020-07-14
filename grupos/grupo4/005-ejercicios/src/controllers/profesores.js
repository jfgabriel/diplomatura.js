import express from 'express';
import { ProfesorRepository } from '../repository/profesorRepository';

const router = express.Router();

router.get('/', function (req, res) {
  const profesorRepo = new ProfesorRepository();
  const result = profesorRepo.getAll();
  result.then((json) => res.send(json));
});

router.get('/:id', function (req, res) {
  const profesorRepo = new ProfesorRepository();
  const result = profesorRepo.getById(req.params.id);
  result.then((json) => res.send(json));
});

//router.post('/', function (req, res) {
//  // TIP: En req.body viene los datos
//
//  // Completar
//  res.json({});
//});

// Completar el resto de los métodos
// router....

export default router;
