import express, { response } from 'express';
import fetch from 'node-fetch';

var postApi = express.Router();

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

    const respuestaFinal = await respuestaPosts.map((posts) => {
      return {
        user: respuestaUsers.find((users) => users.id === posts.userId),
        id: posts.id,
        title: posts.title,
        body: posts.body,
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
      posts: {
        id: respuestaComments.id,
        name: respuestaComments.name,
        email: respuestaComments.email,
        body: respuestaComments.body,
      },
    };

    res.json(respuestaFinal);
  } catch (error) {
    return error;
  }
});

export default postApi;
