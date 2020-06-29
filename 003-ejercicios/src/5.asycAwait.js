/*
## 5. Consumir una API con asyc/await
- Copiar el código de el ejercicio 4 en el cuerpo de una nueva función asincrónica `async function getRemoteData()`.

- Modificar el cuerpo de la función para utilizar async/await en vez de Promise chaining.
*/
import fetch from 'node-fetch';


export async function getRemoteData(){
    const objeto = await fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    .then(json => json.map(elemento => 
                        console.log("Nombre de usuario: "+elemento.name+
                        ", Ciudad:"+elemento.address.city)))
                    .catch(error => console.log(error));
}