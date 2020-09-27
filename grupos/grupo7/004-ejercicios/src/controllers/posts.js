import express from 'express';
import fetch from 'node-fetch';

var postApi = express.Router();

postApi.get('/', async function (req, res) {
  
  try {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsJson = await posts.json();
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersJson = await users.json();

    const response = await postsJson.map(el => {
      return {
        id: el.id,
        title: el.title,
        body: el.body,
        user: usersJson.find(us => us.id === el.userId)
      }
    })
    res.send(response);

  } catch(err) {
    console.log(err);
  }
  
});

postApi.get('/:id', async function (req, res) {

  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
  const postJson = await post.json();
  const commentsRaw = await fetch(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`);
  const comments = await commentsRaw.json();
    
  res.send({...postJson,comments});
});

export default postApi;
