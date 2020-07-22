import express from 'express';
import { Repository } from '../repository/repository';

const router = express.Router();
const repositorio = new Repository('calificaciones');

router.get('/', async function (req, res) {
  const idAlumno = req.query.idAlumno;
  let result;
  if (idAlumno) {
    result = repositorio.find('alumno', new RegExp(`${idAlumno}`, 'i'));
  } else {
    result = await repositorio.getAll();
  }
  res.json(result);
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const documento = await repositorio.getById(id);
  res.json(documento);
});

router.post('/', async function (req, res) {
  const documento = req.body; //express transforma a json el body
  const result = await repositorio.save(documento);
  res.json(result);
});

router.put('/:id', async function (req, res) {
  const id = req.params.id;
  const documento = req.body; //express transforma a json el body
  const result = await repositorio.updateById(id, documento);
  res.json(result);
});

router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  const result = await repositorio.delete(id);
  res.json(result);
});

export default router;
