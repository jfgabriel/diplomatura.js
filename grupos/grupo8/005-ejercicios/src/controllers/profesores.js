import express from 'express';
import { connect } from '../connection';


const router = express.Router();


router.get('/', async function (req, res) {
    const db = await connect();
    const result = await db.collection('profesores').find({}).toArray();
    res.json(result);
});

router.get('/:nombre', async function (req, res) {
    const db = await connect();
    console.log(req.params.nombre);
    const result = await db.collection('profesores').find({ 'nombre': req.params.nombre }).toArray();
    // Completar
    res.json(result);
});

router.post('/', async function (req, res) {
    const db = await connect();
    const dato = {
        id: parseInt(req.body.id),
        nombre: req.body.nombre
    };

    const datoInsert = await db.collection('profesores').insert(dato);
    res.json(datoInsert);
});

router.put('/:id', async function (req, res) {
    const db = await connect();
    const result = await db.collection('profesores').update({ 'id': parseInt(req.params.id) }, { $set: { 'nombre': req.body.nombre } });
    res.json(result);
});

router.delete('/:id', async function (req, res) {
    const db = await connect();
    const result = await db.collection('profesores').deleteOne({ 'id': parseInt(req.params.id) });

    result.deletedCount > 0 ? res.json({ ok: true }) : res.json({ ok: false });
});

// Completar el resto de los métodos
// router....

export default router;
