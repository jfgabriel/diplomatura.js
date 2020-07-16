import express from 'express';
const router = express.Router();
import { connect } from '../connection';

/* Obtiene todos los alumnos */
router.get('/', async function (req, res) {
  const db = await connect();
  const result = await db.collection('alumnos').find({}).toArray();
  res.json(result);
});

/* Obtiene el alumno con el nombre enviado por GET */
router.get('/:nombre', async function (req, res) {
  const db = await connect();
  /* con req.params obtengo el dato por medio de la url */
  let nombre = req.params.nombre;
  /* consulta a mongodb y transformo a arreglo */
  const result = await db.collection('alumnos').find({'nombre': nombre}).toArray();
  res.json(result);
});

/* Inserta un alumno a la base de datos */
router.post('/', async function (req, res) {
  const db = await connect();
  /* Aca como req.body ya me trae por post el objeto en formato json, lo inserto a la bd */
  const result = await db.collection('alumnos').insertOne(req.body);
  res.json(result.ops);
});

/* Actualiza un alumno con id enviado por GET con los datos a actualizar enviados por POST */
router.put('/:id', async function(req, res){
  const db = await connect();
  /* Con req.parems.id obtengo el id enviado por url */
  const id = parseInt(req.params.id);
  /* Hago la consulta a la bd seteando lo que se envie por post, debido a que esta en formato json, lo envio como llega
      y el returnOriginal es una opcion que se le puege agregar a la consulta, para que no devuelva el objeto original (el que se va a modificar)
      logrando asi obtener el objeto ya modificado
  */
  const result = await db.collection('alumnos').findOneAndUpdate({'id': id}, {$set: req.body},{returnOriginal:false});
  res.json(result.value);
});

/* Elimina un alumno con el id enviado por url */
router.delete('/:id', async function(req, res){
  const db = await connect();
  /* Con req.parems.id obtengo el id enviado por url */
  const id = parseInt(req.params.id);
  /* Deletea el documento con el id obtenido */
  const resultado = await db.collection('alumnos').deleteOne({'id': id});
  /* Verifico que el objeto result, donde tiene la propiedad "n" que es un entero que expresa la cantidad de documentos eliminados
      si llega en 0 es porque no existe un alumno con el id enviado
  */
  if(resultado.result.n >= 1){
    res.json({
      ok: true,
    })
  }else{
    res.json({
      ok: `No existe alumno con el id ${id}`,
    })
  }
});

// Completar el resto de los métodos
// router....

export default router;