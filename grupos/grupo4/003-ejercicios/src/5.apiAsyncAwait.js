import fetch from 'node-fetch';

async function getRemoteData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    const json = await response.json();

    //console.log(json);

    const cantUsuarios = Object.keys(json).length;
    console.log('Cantidad de Usuarios: ' + cantUsuarios);
    json.forEach((element) => {
      console.log('  ' + element.name + ' vive en ' + element.address.city);
    });
  } catch (error) {
    console.log(error);
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
