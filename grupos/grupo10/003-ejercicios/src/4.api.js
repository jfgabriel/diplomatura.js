import fetch from 'node-fetch';

export const user = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
      let res = json.map((user) => {
        return { id: user.id, name: user.name, city: user.address.city };
      });

      console.log(res);
    })
    .catch((error) => console.error(error));
};
