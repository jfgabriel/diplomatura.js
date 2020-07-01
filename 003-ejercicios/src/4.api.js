/*
## 4. Consumir una API con Promise Chaining

Consumir la API https://jsonplaceholder.typicode.com/users y mostrar por consola los datos requeridos

- Abrir el archivo archivo 4.api.js

- Utilizar la función fetch para obtener los datos desde la URL.

- Mostrar por consola el resultado de fetch

- Convertir los resultados a un objeto utilizando resultado.json() **utilizando promise chaining**

- Mostrar por consola el nombre del usuario y la ciudad donde vive
*/
import fetch from 'node-fetch';

// fetch('..... aquí va la url')
// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })

/*

//Mostrar por consola el resultado de fetch
export const datos1 = fetch('https://jsonplaceholder.typicode.com/users')
                    .then((value) => console.log(value)); 



//Convertir los resultados a un objeto utilizando resultado.json()
export const datos2 = fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    .then(json => json.map(elemento => console.log(elemento)))
                    .catch(error => console.log(error)); 



//Mostrar por consola el nombre del usuario y la ciudad donde vive
export const datos3 = fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    .then(json => json.map(elemento => console.log("Nombre de usuario: "+elemento.name+", Ciudad:"+elemento.address.city)))
                    .catch(error => console.log(error));
*/
               