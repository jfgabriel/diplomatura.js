import fetch from 'node-fetch';

export const respuestaBulk = fetch(
  'https://jsonplaceholder.typicode.com/users'
).then((value) => console.log(value));

export const respuestaJson = fetch('https://jsonplaceholder.typicode.com/users')
  .then((value) => value.json())
  .then((respuesta) => console.log(respuesta));

export const respuestaDatos = (iduser) =>
  fetch('https://jsonplaceholder.typicode.com/users/' + iduser)
    .then((value) => value.json())
    .then((respuesta) =>
      console.log(
        'Name: ' + respuesta.name + ' | City: ' + respuesta.address.city
      )
    );
