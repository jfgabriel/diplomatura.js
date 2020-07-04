import express from 'express';

var userApi = express.Router();

userApi.get('/', function (req, res) {
  res.send('Hola users!.');
});

userApi.get('/:id', function (req, res) {
  res.send(`Hola post ${req.params.id}.`);
});

export default userApi;