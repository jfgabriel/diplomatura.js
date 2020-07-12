import express from 'express';
import fetch, { Body } from 'node-fetch';
let postApi = express.Router();

postApi.get('/', async function (req, res) {
  try {
    let posts = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    );
    let postsJson = await posts.json();

    let users = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    let usersJson = await users.json();

    let response = await postsJson.map((post) => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        user: usersJson.find((u) => u.id === post.userId),
      };
    });

    res.send(response);
  } catch (e) {
    return e;
  }
});

postApi.get('/:id', async function (req, res) {
  try {
    let postId = req.params.id;
    let post = await fetch(
      'https://jsonplaceholder.typicode.com/posts/' + postId
    );
    let postJson = await post.json();

    let comments = await fetch(
      'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments'
    );
    let commentsJson = await comments.json();

    let response = postJson;

    response.posts = await commentsJson.map((comments) => {
      return {
        id: comments.id,
        name: comments.name,
        email: comments.email,
        body: comments.body,
      };
    });

    res.send(response);
  } catch (e) {
    return e;
  }
});

export default postApi;
