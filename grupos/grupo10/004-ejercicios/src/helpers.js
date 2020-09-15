import fetch from 'node-fetch';
export const URL_BASE = 'https://jsonplaceholder.typicode.com';
export const getJsonByUrl = (url) => {
  return fetch(url).then(async (response) => response.json());
};
