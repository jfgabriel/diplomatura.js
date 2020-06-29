import fetch from 'node-fetch';

async function getRemoteData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    const json = await response.json();
    const cantUsuarios = Object.keys(json).length;
    console.log('Cantidad de Usuarios:', cantUsuarios);
    let jsonUsuarios = json.map(({ name, address }) => ({
      name,
      city: address.city,
    }));
    console.log(jsonUsuarios);
  } catch (error) {
    console.error(error);
  } finally {
    console.log(
      'Finalmente https://jsonplaceholder.typicode.com/users  en 5.apiAsyncAwait.js concluyó'
    );
  }
}

export const testApiAsyncAwait = {
  test() {
    getRemoteData();
  },
};
