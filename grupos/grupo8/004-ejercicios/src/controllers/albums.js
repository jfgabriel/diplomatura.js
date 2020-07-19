import express from 'express';
import fetch from 'node-fetch';

var albumsApi = express.Router();

albumsApi.get('/', async function (req, res) {
  try {
    let respuestaAlbums = await fetch(
      'https://jsonplaceholder.typicode.com/albums/'
    );

    let dataAlbum = await respuestaAlbums.json();

    let respuestaUsuario = await fetch(
      'https://jsonplaceholder.typicode.com/users/'
    );

    let respuestaJsonUsuario = await respuestaUsuario.json();

    const salida = dataAlbum.map(p => {

      return {
        usuario: respuestaJsonUsuario.find(u => u.id === p.userId),
        id: p.id,
        title: p.title

      }
    })


    res.json(salida);
  } catch (error) {
    return error;
  }
});

albumsApi.get('/:id', async function (req, res) {
  try {
    let dataAlbum = await (await fetch(
      'https://jsonplaceholder.typicode.com/albums/' + req.params.id
    )).json();

    let dataFotos = await (await fetch(
      'https://jsonplaceholder.typicode.com/albums/' + req.params.id + '/photos'
    )).json();

    const salida = {

      userId: dataAlbum.userId,
      id: dataAlbum.id,
      title: dataAlbum.title,
      photo: dataFotos.map(f =>
        ({
          id: f.id,
          title: f.title,
          url: f.url,
          thumbnailUrl: f.thumbnailUrl
        })
      )

    }



    res.json(salida);
  } catch (error) {
    return error;
  }
});

albumsApi.get('/getInfo/', function (req, res) {
  res.send(`Hola album ${req.params.id}.`);
});

export default albumsApi;
