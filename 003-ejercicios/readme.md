# Ejercicios 003: Objetos y programación asincrónica

- Crear un archivo dentro de `./src` para cada ejercicio. Por ejemplo .`/src/1.collection.js`
- Cada archivo corresponde a un módulo que exporte sólo las clases y/o funciones requeridas
- Utilizar `./src/index.js` para importar las clases/funciones y mostrar resultados por consola
- Como siempre, utilizar `npm install` para instalar todas las dependencias necesarias.

## 1. Collection

Escribir una clase Collection que representa una colección de elementos. Esta clase debe:

- Poder construirse o vacía (sin elementos) o con una lista inicial de elemenetos
- Debe tener un método `add` para poder agregar un elemento
- Debe tener un método `delete` para poder eliminar un elemento
- Debe tener un método `has` para poder determinar un elemento existe en la colección

## 2. Vector (_TAREA PARA EL HOGAR_)

Escribir una clase Vector que represente un espacio de dos dimensiones x e y. Esta clase debe:

- Poder construirse desde dos valores `x` e `y`
- Debe tener dos getters para obtener esos valores
- Debe tener un método `sumar` que tome un vector por parámetro y devuelva _un nuevo vector_ sumando los valores de x e y de ambos vectores

  Por ejemplo:

  ```
  console.log(new Vector(1, 2).sumar(new Vector(2, 3)));

  // → Vector{x: 3, y: 5}
  ```

## 3. Reloj

Construir un programa que muestre por consola la hora actual cada un segundo durante 10 segundos y luego finalice.

_Tip: construir una nueva instacia del objeto `Date` para obtener la hora actual_

## 4. Consumir una API

Consumir la API https://jsonplaceholder.typicode.com/users y mostrar por consola los datos requeridos

- Abrir el archivo archivo 4.api.js
- Utilizar la función fetch para obtener los datos desde la URL. Fetch devuelve una promise.
- Convertir los resultados a un objeto utilizando resultados.json()
- Mostra por consola el nombre del usuario y la ciudad donde vive

## 5. Delay (_TAREA PARA EL HOGAR_)

Crear una función `delay` que devuelva una Promise que resuelva en un `mensaje` después de `n` millisegundos.
Tip: utilizar el constructor que nos permite obtener una referenci a una función `resolve` que nos permite resolver la promesa
new Promise(resolve => {
resolve(....)
});
}

## 6. Muchas promesas (_TAREA PARA EL HOGAR_)

Crear un programa que construya 3 promesas con la función `delay` del ejercicio anterior (con 3 mensajes y tiempos diferentes) y que muestre
los tres mensajes cuando todas las promesas hayan resuelto.

_Tip: investigar y utilizar `Promise.all`_
