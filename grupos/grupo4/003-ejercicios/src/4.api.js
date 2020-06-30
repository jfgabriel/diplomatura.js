import fetch from 'node-fetch';

export const Api = {
  fetch: fetch('https://jsonplaceholder.typicode.com/users')
    .then((resp) => resp.json())
    .catch((err) => err.json()),
};

export const testApi = {
  test() {
    // Api.fetch.then((result) => console.log(result));
    Api.fetch.then((result) => {
      result.forEach((element) => {
        console.log(element.name, 'lives in', element.address.city);
      });
    });
  },
};

// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })
