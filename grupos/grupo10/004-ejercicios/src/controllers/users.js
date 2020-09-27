import express from 'express';
import { getJsonByUrl, URL_BASE } from '../helpers.js';

var postApi = express.Router();

postApi.get('/', async function (req, res) {
  const users = await getJsonByUrl(`${URL_BASE}/users`);
  const allPosts = await getJsonByUrl(`${URL_BASE}/posts`);
  const allAlbums = await getJsonByUrl(`${URL_BASE}/albums`);
  let albums;
  let posts;
  users.map((user) => {
    albums = allAlbums.filter((album) => album.userId === user.id);
    if (albums) {
      albums.forEach((album) => delete album.userId);
      user.albums = albums;
    }
    posts = allPosts.filter((post) => post.userId === user.id);
    if (posts) {
      posts.forEach((post) => delete post.userId);
      user.posts = posts;
    }
  });
  res.send(users);
});

export default postApi;

// //  if (albums) {
//     albums.forEach((album) => delete album.userId);
//     users.albums = albums;
//   }
//   if (posts) {
//     posts.forEach((post) => delete post.userId);
//     users.posts = albums;
//   }
