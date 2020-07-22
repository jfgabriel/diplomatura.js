import express from 'express';
import { recuperarJsonByUrl, URL_RAIZ } from '../utiles/util';

const postApi = express.Router();
let userJson, comentarios;

// 2.1 - "/posts/"
postApi.get('/', async function (req, res) {
  const postsJson = await recuperarJsonByUrl(`${URL_RAIZ}posts`);
  userJson = await recuperarJsonByUrl(`${URL_RAIZ}users/`);
  postsJson.forEach((elemento) => {
    elemento.user = userJson.find((aux) => aux.id === elemento.userId);
    delete elemento.userId;
  });
  res.send(postsJson);
});

// 2.2 - "/posts/x"
postApi.get('/:id', async function (req, res) {
  let postsJsonById = await recuperarJsonByUrl(
    `${URL_RAIZ}posts/${req.params.id}`
  );
  comentarios = await recuperarJsonByUrl(
    `${URL_RAIZ}posts/${req.params.id}/comments`
  );
  comentarios.forEach((elemento) => delete elemento.postId);
  postsJsonById.posts = comentarios;
  res.send(postsJsonById);
});

export default postApi;
