import express from 'express';
import fetch, { Body } from 'node-fetch';

var albumsApi = express.Router();

albumsApi.get('/', async function (req, res) {
  try {
    let responseAlbums = await fetch(
      'https://jsonplaceholder.typicode.com/albums'
    );
    let responseAlbumsJson = await responseAlbums.json();

    let responseUsers = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    let responseUsersJson = await responseUsers.json();

    let response = await responseAlbumsJson.map((album) => {
      return {
        id: album.id,
        title: album.title,
        user: responseUsersJson.find((u) => u.id === album.userId),
      };
    });

    res.send(response);
  } catch (e) {
    return e;
  }
});

albumsApi.get('/:id', async function (req, res) {
  let albumId = req.params.id;
  let responseAlbum = await fetch(
    'https://jsonplaceholder.typicode.com/albums/' + albumId
  );
  let responseAlbumJson = await responseAlbum.json();

  let responsePhotos = await fetch(
    'https://jsonplaceholder.typicode.com/albums/' + albumId + '/photos'
  );
  let responsePhotosJson = await responsePhotos.json();

  let response = responseAlbumJson;

  response.photos = await responsePhotosJson.map((photos) => {
    return {
      id: photos.id,
      title: photos.title,
      url: photos.url,
      thumbnailUrl: photos.thumbnailUrl,
    };
  });

  res.send(response);
});

export default albumsApi;
