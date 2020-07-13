import express, { response } from 'express';
import fetch from 'node-fetch';

var albumsApi = express.Router();

postApi.get('/', async function (req, res) {
  try {
    const respuestaPosts = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    ).then((response) => {
      return response.json();
    });

    const respuestaUsers = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    ).then((response) => {
      return response.json();
    });

    const respuestaFinal = await respuestaPosts.map((m) => {
      return {
        user: respuestaUsers.find((u) => u.id === m.userId),
        id: m.id,
        title: m.title,
        body: m.body,
      };
    });
    res.json(respuestaFinal);
  } catch (error) {
    return error;
  }
});

postApi.get('/:id', async function (req, res) {
  try {
    const respuestaComments = await fetch(
      'https://jsonplaceholder.typicode.com/posts/' +
      req.params.id +
      '/comments'
    ).then((response) => {
      return response.json();
    });

    const respJsonPosts = await fetch(
      'https://jsonplaceholder.typicode.com/posts/' + req.params.id
    ).then((response) => {
      return response.json();
    });

    const respuestaFinal = {
      userId: respJsonPosts.userId,
      id: respJsonPosts.id,
      title: respJsonPosts.title,
      body: respJsonPosts.body,
      posts: respuestaComments.map((datos) => {
        return {
          id: datos.id,
          name: datos.name,
          email: datos.email,
          body: datos.body,
        };
      }),
    };

    res.json(respuestaFinal);
  } catch (error) {
    return error;
  }
});

export default albumsApi;
