import express from 'express';
import { getJsonByUrl, URL_BASE } from '../helpers.js';

var postApi = express.Router();

postApi.get('/', async function (req, res) {
  const posts = await getJsonByUrl(`${URL_BASE}/posts`);
  const users = await getJsonByUrl(`${URL_BASE}/users`);
  let user;
  posts.map((post) => {
    user = users.find((user) => user.id === post.userId);
    if (user) {
      post.user = user;
      delete post.userId;
    }
  });
  res.send(posts);
});

postApi.get('/:id', async function (req, res) {
  const post = await getJsonByUrl(`${URL_BASE}/posts/${req.params.id}`);
  const AllComments = await getJsonByUrl(`${URL_BASE}/comments`);
  const comments = AllComments.filter((comment) => comment.postId === post.id);
  if (comments) {
    comments.forEach((comment) => delete comment.postId);
    post.posts = comments;
  }
  res.send(post);
});

export default postApi;
