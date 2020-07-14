import express from 'express';
import fetch from 'node-fetch';
import lodash from 'lodash';

var userApi = express.Router();

async function getData(req){
  const respuesta = await fetch(req);
  const respuestaJSON = await respuesta.json();
  console.log(respuestaJSON);
  return respuestaJSON;
}

function inyectAlbums(user, albums)
{
  const newUser = lodash.cloneDeep(user);
  newUser.albums = albums.filter(a => a.userId === user.id).map(a => {
    return {
      id: a.id,
      title: a.title,
    }
  });
  return newUser;
}

function inyectPosts(user, posts)
{
  const newUser = lodash.cloneDeep(user);
  newUser.posts = posts.filter(p => p.userId === user.id).map(p => {
    return {
      id: p.id,
      title: p.title,
      body: p.body
    }
  });
  return newUser;
}

async function getExtendUsers(){
  try
  {
    const posts = await getData('https://jsonplaceholder.typicode.com/posts/');
    const albums = await getData('https://jsonplaceholder.typicode.com/albums/');
    const users = await getData('https://jsonplaceholder.typicode.com/users/');
    
    return users.map(u => inyectAlbums(u, albums)).map(u => inyectPosts(u, posts));
  }
  catch(error){
    console.log(error);
  }
}


async function getOneExtendUser(id){
  try
  {
    const posts = await getData('https://jsonplaceholder.typicode.com/posts/');
    const albums = await getData('https://jsonplaceholder.typicode.com/albums/');
    const user = await getData('https://jsonplaceholder.typicode.com/users/'+id);

    return inyectPosts(inyectAlbums(user, albums), posts);
  }
  catch(error){
    console.log(error);
  }
}

userApi.get('/', function (req, res) {
  getExtendUsers()
  .then(users => res.send(users));
});

userApi.get('/:id', function (req, res) {
  getOneExtendUser(req.params.id)
  .then(r => res.send(r));
});

export default userApi;