import fetch from 'node-fetch';

export function run() {
  return (
    fetch('https://jsonplaceholder.typicode.com/users')
      // Mostrar por consola el resultado de fetch
      .then((response) => {
        console.info('Restultado `fetch`:', response);
        return response;
      })

      // Convertir los resultados a un objeto utilizando
      .then((response) => response.json())

      // Mostrar por consola el nombre del usuario y la ciudad donde vive
      .then((json) =>
        json.map(({ name, address }) => ({
          name,
          city: address.city,
        }))
      )
      .then((result) => console.info('Resultado:', result))
  );
}
