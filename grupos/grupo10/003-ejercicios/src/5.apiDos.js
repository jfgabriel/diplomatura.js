import fetch from 'node-fetch';

export const userDos = async () => {
  let users = await getRemoteData();
  let res = users.map((user) => {
    return { id: user.id, name: user.name, city: user.address.city };
  });
  console.log(res);
};

async function getRemoteData() {
  let respuesta = fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return respuesta;
}
