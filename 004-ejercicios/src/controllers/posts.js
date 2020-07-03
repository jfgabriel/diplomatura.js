import express from 'express';

var postApi = express.Router();

postApi.get('/', function (req, res) {
  res.send('Hello from APIv1 root route.');
});

postApi.get('/:id', function (req, res) {
  res.send(`Hola post ${req.params.id}.`);
});

export default postApi;
