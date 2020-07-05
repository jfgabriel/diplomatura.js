import express from 'express';
import fetch from 'node-fetch';

var albumsApi = express.Router();

albumsApi.get('/', async function (req, res) {
  try {
    let respuestaUrl = await fetch(
      'https://jsonplaceholder.typicode.com/albums/'
    );
    let respuestaJson = await respuestaUrl.json();

    res.json(respuestaJson);
  } catch (error) {
    return error;
  }
});

albumsApi.get('/:id', function (req, res) {
  res.send(`Hola album ${req.params.id}.`);
});

export default albumsApi;
