import fetch from 'node-fetch';

export const URL_RAIZ = 'https://jsonplaceholder.typicode.com/';

export const recuperarJsonByUrl = (url) =>
  fetch(url).then((elemento) => elemento.json());
