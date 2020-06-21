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

## 2. Vector (TAREA PARA EL HOGAR / no realizar en clase)

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

## 5. Promise ALL (TAREA PARA EL HOGAR)

function Promise_all(promises) {
return new Promise((resolve, reject) => {
// Your code here.
});
}

// Test code.
Promise_all([]).then(array => {
console.log("This should be []:", array);
});
function soon(val) {
return new Promise(resolve => {
setTimeout(() => resolve(val), Math.random() \* 500);
});
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
.then(array => {
console.log("We should not get here");
})
.catch(error => {
if (error != "X") {
console.log("Unexpected failure:", error);
}
});
