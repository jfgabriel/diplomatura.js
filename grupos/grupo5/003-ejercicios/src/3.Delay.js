"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;

/*- Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.
   ```
   setTimeout(() =>  {.... do something ...}, delay_in_milliseconds);
*/
function delay(mensaje, milisegundos) {
  setTimeout(function () {
    console.log(mensaje);
  }, milisegundos);
}