import express from 'express';

var postApi = express.Router();

postApi.get('/', function (req, res) {
  res.send('Hola posts!.');
});

postApi.get('/:id', function (req, res) {
  res.send(`Hola post ${req.params.id}.`);
});

export default postApi;
