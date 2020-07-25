import express from 'express';
import fetch, { Body } from 'node-fetch';

let usersApi = express.Router();

usersApi.get('/', async function (req, res) {
  try {
    let users = await fetch('https://jsonplaceholder.typicode.com/users/');
    let usersJson = await users.json();

    let albums = await fetch('https://jsonplaceholder.typicode.com/albums');
    let albumsJson = await albums.json();

    let posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    let postsJson = await posts.json();

    for (let user of usersJson) {
      user.albums = albumsJson.filter((a) => a.userId === user.id);
      //Remove userId from response
      user.albums.forEach((a) => {
        delete a.userId;
      });

      user.posts = postsJson.filter((p) => p.userId === user.id);
      //Remove userId from response
      user.posts.forEach((p) => {
        delete p.userId;
      });
    }

    res.send(usersJson);
  } catch (e) {
    return e;
  }
});

export default usersApi;
