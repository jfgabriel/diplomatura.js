import fetch from 'node-fetch';

// fetch('..... aquí va la url')
// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })

export const testApi = {
  test() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((resultado) => resultado.json()) // equivalente a: function(resultado){return resultado.json()}
      .then((json) => {
        //console.log(json); //mostrar json completo
        const cantUsuarios = Object.keys(json).length;
        console.log('Cantidad de Usuarios: ' + cantUsuarios);
        json.forEach((element) => {
          console.log('  ' + element.name + ' vive en ' + element.address.city);
        });
      })
      .catch((error) => console.log(error))
      .finally(() =>
        console.log(
          'Finalmente https://jsonplaceholder.typicode.com/users  en 4.api.js concluyó'
        )
      );
  },
};
