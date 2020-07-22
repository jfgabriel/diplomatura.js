# Ejercicios 004: NodeJs y Express

## Intro

Cada grupo debe subir solo una copia de los ejercicios
Copiar la carpeta 004-ejercicios dentro de la carpeta de nuestro grupo. Y trabajar ahi.

El proyecto actual contiene un proyecto de Express.js
Nuestro grupo debe construir 3 rutas o endpoints, todos del tipo GET que devuelvan json con la informacion requerida en cada punto/ruta.
Estas pueden (y deberian) construirse en paralelo por distintos miembros del grupo.

## 1 - Ruta raiz o "/"

En esta ruta utilizaremos el modulo build-in os y modulo externo moment.js

Este endpoint debe devolver informacion respecto al servidor. Se debe utilizar moment js para escribir la fecha de arranque del servidor y el tiempo transcurrido desde el arranque.

Formato de respuesta de ejemplo y definiciones:

- serverCurrentTime, tiempo actual, devuelto por new Date() utilizando el formato 'MMMM Do YYYY, h:mm:ss a'
- serverStartUpTime, guardado cuando arranca el server, utilizando el formato 'MMMM Do YYYY, h:mm:ss a'
- serverUpTime, utilizando el formato relativo de moment 'hace 10 minutos'
- status.freemem, utilizando el modulo os -> os.freemem()
- status.totalmem, utilizando el modulo os -> os.totalmem
- status.uptime, utilizando el modulo os -> os.uptime
- status.hostname, utilizando el modulo os -> os.hostname
- status.platform, utilizando el modulo os -> os.platform

```javascript
const result = {
  serverCurrentTime: 'julio 3º 2020, 12:07:23 pm', // En español
  serverStartUpTime: 'julio 3º 2020, 12:06:54 pm', // En español
  serverUpTime: 'hace 10 minutos', // usando moment relative time

  status: {
    freemem: 34634636346,
    totalmem: 346346346,
    uptime: 235,
    hostname: 'localhost',
    platform: 'win32',
  },
};
```

## 2 - Ruta "/posts/" y "/posts/1"

Esta ruta devuelve la informacion de la api utilizada en los ejercicios anteriores ( https://jsonplaceholder.typicode.com/ ), pero agregandolos de una manera especial.

### 2.1 - "/posts/"

Este endpoint debe devolver los posts como https://jsonplaceholder.typicode.com/posts/ pero reemplazando userId, por el objeto user completo.
Ej:

```json
[

  {
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    "user":{
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  }
  // ...
]
```

### 2.2 - "/posts/1" o "/posts/x"

Similar al anterior, pero esta vez vamos a mostrar el post dado, mas sus comentarios.

// con esta url puedo obtener los comments de un post, en este caso post 1, y removerle el postId
https://jsonplaceholder.typicode.com/posts/1/comments

Ej.:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  "posts": [
    {
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      "id": 2,
      "name": "quo vero reiciendis velit similique earum",
      "email": "Jayne_Kuhic@sydney.com",
      "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    }
  ]
}
```

## 3 - Ruta "/albums/" y "/albums/1"

Esta ruta devuelve la informacion de la api utilizada en los ejercicios anteriores ( https://jsonplaceholder.typicode.com/ ), pero agregandolos de una manera especial.

### 3.1 - "/albums/"

Este endpoint debe devolver los posts como https://jsonplaceholder.typicode.com/albums/ pero reemplazando userId, por el objeto user completo.
Ej:

```json
[
  {
    "id": 1,
    "title": "quidem molestiae enim",
    "user": {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  }
  // ...  mas filas.
]
```

### 3.2 - "/albums/1" o "/albums/x"

Similar al anterior, pero esta vez vamos a mostrar el album dado, mas sus photos.

// con esta url puedo obtener las photos de un album, en este caso album 1 y remover el albumId que seria redundante.


```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "quidem molestiae enim",
    "photos": [
      {
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
      },
      {
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
      }
    ]
  }
]
```

## 4 - Endpoint usuarios

crear un nuevo controller, y un endpoint para que devuelva los usuarios de https://jsonplaceholder.typicode.com/users/ pero a la vez que agregue la informacion de albums y posts de cada usuario.

Ej:

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    },
    "albums": [
      {
        "id": 1,
        "title": "quidem molestiae enim"
      },
      {
        "id": 2,
        "title": "sunt qui excepturi placeat culpa"
      },
    ],
    "posts": [
      {
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
    ]
  },
  {
    "id": 2,
    ... // otro user
  },
```
