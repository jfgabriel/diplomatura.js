import fetch from 'node-fetch';

export async function getRemoteData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  // Mostrar por consola el resultado de fetch
  console.info('Restultado `fetch`:', response);

  // Convertir los resultados a un objeto utilizando
  const json = await response.json();

  // Mostrar por consola el nombre del usuario y la ciudad donde vive
  const result = json.map(({ name, address }) => ({
    name,
    city: address.city,
  }));
  console.info('Resultado:', result);
}
