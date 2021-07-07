import fetch from 'node-fetch';

// fetch('..... aquí va la url')
// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    console.log(response);
    return response;
  })
  .then((data) => {
    return data.json();
  })
  .then((data2) => {
    return data2.map((m) => ({
      Nombre: m.name,
      Ciudad: m.address.city,
    }));
  })
  .then((data3) => {
    console.log(data3);
  })
  .catch((err) => {
    console.error('salioo error');
  });
