import express from 'express';
import { recuperarJsonByUrl, URL_RAIZ } from '../utiles/util';

const postApi = express.Router();
let userJson;

// 2.1 - "/posts/"
postApi.get('/', async function (req, res) {
  const postsJson = await recuperarJsonByUrl(`${URL_RAIZ}posts`);
  if (Object.keys(postsJson).length !== 0) {
    userJson = await recuperarJsonByUrl(`${URL_RAIZ}users/`);
    postsJson.forEach((elemento) => {
      elemento.user = userJson.find((aux) => aux.id === elemento.userId);
      delete elemento.userId;
    });
  }
  res.send(postsJson);
});

// 2.2 - "/posts/x"
postApi.get('/:id', async function (req, res) {
  let postsJsonById = {};
  if (req.params.id) {
    postsJsonById = await recuperarJsonByUrl(
      `${URL_RAIZ}posts/${req.params.id}`
    );
    if (Object.keys(postsJsonById).length !== 0) {
      const comentarios = await recuperarJsonByUrl(
        `${URL_RAIZ}posts/${req.params.id}/comments`
      );
      comentarios.forEach((elemento) => delete elemento.postId);
      postsJsonById.posts = comentarios;
    }
  }
  res.send(postsJsonById);
});

export default postApi;
