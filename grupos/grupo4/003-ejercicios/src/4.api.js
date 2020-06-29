import fetch from 'node-fetch';

export const testApi = {
  test() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((resultado) => resultado.json()) // equivalente a: function(resultado){return resultado.json()}
      .then((json) =>
        json.map(({ name, address }) => ({
          name,
          city: address.city,
        }))
      )
      .then((jsonUsuarios) => {
        const cantUsuarios = Object.keys(jsonUsuarios).length;
        console.log('Cantidad de Usuarios:', cantUsuarios);
        console.log(jsonUsuarios);
      })
      .catch((error) => console.error(error))
      .finally(() =>
        console.log(
          'Finalmente https://jsonplaceholder.typicode.com/users  en 4.api.js concluyó'
        )
      );
  },
};

