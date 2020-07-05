import fetch from 'node-fetch';
import express from 'express';

var userApi = express.Router();

userApi.get('/', async function (req, res) {

  try { 
  
  const dataUser = await (await fetch('https://jsonplaceholder.typicode.com/users/')).json();
    
  const dataAlbum = await (await fetch(' https://jsonplaceholder.typicode.com/albums/ ')).json();

  const dataPosts = await (await fetch('https://jsonplaceholder.typicode.com/posts/')).json();


  let dataSalida = await dataUser.map(usuario => {
        
    return{
      user: usuario,
      albums: (dataAlbum.filter(alb => 
        (alb.userId === usuario.id))).map(elem => ({
            id:elem.id,
            title:elem.title}
        )),
      
      posts: dataPosts.filter(post => 
        (post.userId === usuario.id)).map(elem => ({
          id:elem.id, 
          title:elem.title,
          body:elem.body}
        ))
    } 
  }
  );
   
  res.json(dataSalida); 

  } catch (error) {
      console.log("ERROR",error)
  }
     
});

export default userApi;



 