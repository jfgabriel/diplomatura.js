import fetch from 'node-fetch';

export async function getRemoteData() {
  try {
    let respuestaUrl = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    let respuestaJson = await respuestaUrl.json();
    let respuestaFinal = await respuestaJson.map((m) => {
      return {
        Nombre: m.name,
        Ciudad: m.address.city,
      };
    });
    return respuestaFinal;
  } catch (error) {
    return error;
  }
}
