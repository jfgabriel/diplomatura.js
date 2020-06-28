// ## 5. Consumir una API con asyc/await
// - Copiar el código de el ejercicio 4 en el cuerpo de una nueva función 
//     asincrónica `async function getRemoteData()`.
// - Modificar el cuerpo de la función para utilizar async/await en vez de Promise chaining.
/////////////////////////////////////////////////////////////////////

import fetch from 'node-fetch';

async function getRemoteData() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    let data = await response.json()
    let ret = [];
    data.map(el => {
        ret.push({user: el.name, city: el.address.city});
    });
    console.log(ret)
}

export default getRemoteData;