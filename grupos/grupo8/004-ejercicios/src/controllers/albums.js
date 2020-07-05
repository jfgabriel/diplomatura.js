import express from 'express';

var albumsApi = express.Router();

albumsApi.get('/', function (req, res) {
  res.send('Hola albums!.');
});

albumsApi.get('/:id', function (req, res) {
  res.send(`Hola album ${req.params.id}.`);
});

albumsApi.get('/getInfo/', function (req, res) {
  res.send(`Hola album ${req.params.id}.`);
});

export default albumsApi;
