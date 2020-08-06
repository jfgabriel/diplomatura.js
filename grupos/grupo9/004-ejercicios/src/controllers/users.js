import express from 'express';
import { recuperarJsonByUrl, URL_RAIZ } from '../utiles/util';

const usersApi = express.Router();
let usersJson, almbumsJson, postsJson;

usersApi.get('/', async function (req, res) {
    usersJson = await recuperarJsonByUrl(`${URL_RAIZ }users/`);
    almbumsJson = await recuperarJsonByUrl(`${URL_RAIZ }albums/`)
    postsJson = await recuperarJsonByUrl(`${URL_RAIZ }posts/`);
    usersJson.forEach(elemento => {
        elemento.almbums = almbumsJson.filter( unAlbum => unAlbum.userId === elemento.id );
        elemento.posts = postsJson.filter( unPost => unPost.userId === elemento.id );        
    });
    res.send(usersJson);
});

export default usersApi;//exporta la api.