import express from 'express';
import { recuperarJsonByUrl, URL_RAIZ } from '../utiles/util';

let albumsApi = express.Router();
let userJson, photoAlbunsById;

albumsApi.get('/', async function (req, res) {
  const albumsJson = await recuperarJsonByUrl(`${URL_RAIZ}albums/`);
  userJson = await recuperarJsonByUrl(`${URL_RAIZ}users`);
  albumsJson.forEach((elemento) => {
    elemento.user = userJson.find((usuario) => usuario.id === elemento.userId);
    delete elemento.userId;
  });
  res.send(albumsJson);
});

albumsApi.get('/:id', async function (req, res) {
  const albumsJsonById = await recuperarJsonByUrl(
    `${URL_RAIZ}albums/${req.params.id}`
  );
  photoAlbunsById = await recuperarJsonByUrl(
    `${URL_RAIZ}albums/${req.params.id}/photos`
  );
  photoAlbunsById.forEach((elemento) => delete elemento.albumId);
  albumsJsonById.photos = photoAlbunsById;
  res.send(albumsJsonById);
});

export default albumsApi;
