import { Helpers } from '../models/helpers';
import { ObjectId } from 'mongodb';

const collectionName = 'calificaciones';
const validParams = ['id', 'nota'];

async function create(req, res) {
  try {
    const params = Helpers.paramsBuilder(validParams, req.body);
    await Helpers.insertToDb(collectionName, params).then((doc) =>
      res.send(doc)
    );
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

async function index(req, res) {
  try {
    const query = req.query.nombre
      ? { nombre: { $regex: new RegExp(req.query.nombre), $options: 'i' } }
      : '';
    await Helpers.find(collectionName, query).then((docs) => res.send(docs));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

async function display(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    await Helpers.findOne(collectionName, query).then((doc) => {
      if (doc) {
        console.log(doc);
      } else {
        console.log('Not found');
      }
      res.send(doc);
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

async function update(req, res) {
  const updateData = Helpers.paramsBuilder(validParams, req.body);
  const query = { _id: new ObjectId(req.params.id) };
  const opts = { returnOriginal: false };

  await Helpers.update(collectionName, query, updateData, opts)
    .then((doc) => {
      console.log(doc);
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

async function destroy(req, res) {
  const query = { _id: new ObjectId(req.params.id) };
  await Helpers.destroy(collectionName, query)
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export default {
  create,
  index,
  display,
  update,
  destroy,
};
