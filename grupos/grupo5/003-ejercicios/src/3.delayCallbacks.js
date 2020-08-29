"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;
exports.run = run;
exports.run2 = run2;

/*
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
*/
function delay(mensaje, milisegundos) {
  setTimeout(function () {
    console.log(mensaje);
  }, milisegundos);
}

function run() {
  console.log(1);
  delay('Terminó 1', 1000);
  console.log(2);
  delay('Terminó 2', 1000);
  console.log(3);
  delay('Terminó 3', 1000);
}

;

function run2() {
  console.log(1);
  delay('Terminó 1', 3000);
  console.log(2);
  delay('Terminó 2', 2000);
  console.log(3);
  delay('Terminó 3', 1000);
}