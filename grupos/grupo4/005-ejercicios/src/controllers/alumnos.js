import express from 'express';
import { AlumnoRepository } from '../repository/alumnoRepository';

const router = express.Router();

router.get('/', function (req, res) {
  const alumnoRepo = new AlumnoRepository();
  const result = alumnoRepo.getAll();
  result.then((json) => res.send(json));
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  const alumnoRepo = new AlumnoRepository();
  alumnoRepo.getById(id, (err, alumno) => {
    if (err) {
      res.send(err);
    } else {
      res.json(alumno);
    }
    //if (err) {
    //  return res.status(500).json({
    //    ok: false,
    //    mensaje: 'Se produjo un error al consultar el alumno ',
    //    id,
    //    error: err,
    //  });
    // } else {
    //  return res.status(200).json({
    //    ok: true,
    //    mje: 'Exito',
    //    alumno: alumno,
    //  });
    //}
  });
  //result.then((json) => res.send(json));
});

router.get('/:nombre', function (req, res) {
  const nombre = req.params.nombre;
  const alumnoRepo = new AlumnoRepository();
  alumnoRepo.getBy('nombre', nombre, (err, alumno) => {
    if (err) {
      res.send(err);
    } else {
      res.json(alumno);
    }
  });
});

router.post('/', function (req, res) {
  // TIP: En req.body viene los datos
  let alumno = {}; //obtener el json de req.body!!!!!!???
  const alumnoRepo = new AlumnoRepository();
  alumnoRepo.save(alumno, (err, alumno) => {
    if (err) {
      res.send(err);
    } else {
      res.json(alumno);
    }
  });
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  const alumnoRepo = new AlumnoRepository();
  alumnoRepo.delete(id, (err, alumno) => {
    if (err) {
      res.send(err);
    } else {
      res.json(alumno);
    }
  });
});

export default router;
