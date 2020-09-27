import express from 'express';
import { getJsonByUrl, URL_BASE } from '../helpers.js';

var albumsApi = express.Router();

albumsApi.get('/', async function (req, res) {
  const albums = await getJsonByUrl(`${URL_BASE}/albums`);
  const users = await getJsonByUrl(`${URL_BASE}/users`);
  let user;
  albums.map((album) => {
    user = users.find((user) => user.id === album.userId);
    if (user) {
      album.user = user;
      delete album.userId;
    }
  });
  res.send(albums);
});

albumsApi.get('/:id', async function (req, res) {
  const album = await getJsonByUrl(`${URL_BASE}/albums/${req.params.id}`);
  const allPhotos = await getJsonByUrl(`${URL_BASE}/photos`);
  const photos = allPhotos.filter((photo) => photo.albumId === album.id);
  if (photos) {
    photos.forEach((photo) => delete photo.albumId);
    album.photos = photos;
  }
  res.send(album);
});

export default albumsApi;
