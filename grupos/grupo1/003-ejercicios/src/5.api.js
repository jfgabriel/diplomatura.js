import fetch from 'node-fetch';

export async function getRemoteData(iduser) {
  const respuesta = await fetch(
    'https://jsonplaceholder.typicode.com/users/' + iduser
  )
    .then((value) => value.json())
    .then((respuesta) =>
      console.log(
        'Name: ' + respuesta.name + ' | City: ' + respuesta.address.city
      )
    );
}
