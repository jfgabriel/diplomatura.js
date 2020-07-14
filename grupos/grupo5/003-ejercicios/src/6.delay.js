"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayNuevo = delayNuevo;
exports.runNuevo = runNuevo;

/*
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
*/
function delayNuevo(segundos) {
  return new Promise(resolve => {
    setTimeout(resolve, segundos * 1000);
  });
}

function runNuevo() {
  console.log(1);
  delayNuevo(1).then(() => console.log('Terminó 1'));
  console.log(2);
  delayNuevo(2).then(() => console.log('Terminó 2'));
  console.log(3);
  delayNuevo(3).then(() => console.log('Terminó 3'));
}

;