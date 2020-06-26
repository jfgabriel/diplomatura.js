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

## 3. Delay con callbacks

- Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.
   ```
   setTimeout(() =>  {.... do something ...}, delay_in_milliseconds);
   ```

- Crear una función `delay` que tome dos parámetros `mensaje` y `milisegundos` y muestre un mensaje después del tiempo indicado.
   
- Crear una función `run` con el siguiente código

   ```
   console.log(1);
   delay('Terminó 1', 1000);
   console.log(2);
   delay('Terminó 2', 1000);
   console.log(3);
   delay('Terminó 3', 1000);
  ```

  Luego invocarla con `run()`. ¿Cuál es el resultado?

- Modificar nuestra función `run` con el siguiente código. Ejecutarla y observar el resultado.

   ```
   console.log(1);
   delay('Terminó 1', 3000);
   console.log(2);
   delay('Terminó 2', 2000);
   console.log(3);
   delay('Terminó 3', 1000);
   ```

## 4. Consumir una API con Promise Chaining

Consumir la API https://jsonplaceholder.typicode.com/users y mostrar por consola los datos requeridos

- Abrir el archivo archivo 4.api.js

- Utilizar la función fetch para obtener los datos desde la URL.

- Mostrar por consola el resultado de fetch

- Convertir los resultados a un objeto utilizando resultado.json() **utilizando promise chaining**

- Mostrar por consola el nombre del usuario y la ciudad donde vive

## 5. Consumir una API con asyc/await
- Copiar el código de el ejercicio 4 en el cuerpo de una nueva función asincrónica `async function getRemoteData()`.

- Modificar el cuerpo de la función para utilizar async/await en vez de Promise chaining.

## 6. Delay (_TAREA PARA EL HOGAR_)

- Modificar nuestra función `delay` para que utilice Promises. `delay` tomará un sólo parámetro `segundos` y debe devolver una Promise que resuelva cuando el tiempo ha finalizado.

- Una vez modificada, cambiar nuestra función run() para que muestre en orden los siguientes mensajes. 

  ```
  1
  Terminó 1
  2
  Terminó 2
  3
  Terminó 3
  ```

#### Tip 1: Puede usarse Promise chaining o async/await

#### Tip 2: Si usamos async/await tenemos que convertir nuestra función run a asincrónica: `async run(...){ .... }`

#### Tip 3: utilizar el constructor de Promise que nos permite obtener una referencia una función `resolve` que nos permite resolver la promesa
```
return new Promise(resolve => { 
     .... something ...
     resolve( ... something ...)
     .... something ...
   });
}
```
