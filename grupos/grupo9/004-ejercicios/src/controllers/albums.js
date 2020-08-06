import express from 'express';
import { recuperarJsonByUrl, URL_RAIZ } from '../utiles/util';

let albumsApi = express.Router();
//let userJson, photoAlbunsById;

albumsApi.get('/', async function (req, res) {
  const albumsJson = await recuperarJsonByUrl(`${URL_RAIZ}albums/`);
  if (Object.keys(albumsJson).length !== 0) {
    const userJson = await recuperarJsonByUrl(`${URL_RAIZ}users`);
    albumsJson.forEach((elemento) => {
      elemento.user = userJson.find(
        (usuario) => usuario.id === elemento.userId
      );
      delete elemento.userId;
    });
  }
  res.send(albumsJson);
});

albumsApi.get('/:id', async function (req, res) {
  let albumsJsonById = {};
  if (req.params.id) {
    albumsJsonById = await recuperarJsonByUrl(
      `${URL_RAIZ}albums/${req.params.id}`
    );
    //verificamos que exista el album antes de obtener las fotos
    if (Object.keys(albumsJsonById).length !== 0) {
      const photoAlbumsById = await recuperarJsonByUrl(
        `${URL_RAIZ}albums/${req.params.id}/photos`
      );
      photoAlbumsById.forEach((elemento) => delete elemento.albumId);
      albumsJsonById.photos = photoAlbumsById;
    }
  }
  res.send(albumsJsonById);
});

export default albumsApi;
