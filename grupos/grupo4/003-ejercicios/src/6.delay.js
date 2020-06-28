//C- Modificar nuestra función `delay` para que utilice Promises. `delay` tomará un
//sólo parámetro `segundos` y debe devolver una Promise que resuelva cuando el tiempo
//ha finalizado.
//https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise

async function delay(mensaje, milisegundos) {
  return new Promise((resolve) => {
    setTimeout(function () {
      console.log(mensaje);
      resolve(); //resuelve la promesa.
    }, milisegundos);
  });

  ////Para crear una promesa: new Promise((resolve, reject) => {...}
  ////https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
  //return new Promise((resolve, reject) => {
  //  setTimeout(function () {
  //    console.log(mensaje);
  //    resolve();
  //  }, milisegundos);
  //});

  ///Promise.resolve devuelve un objeto promise,
  // Cual es la diferencia con el código anterior. claramente si lo ejecuto es <>?
  //return Promise.resolve(
  //  setTimeout(() => {
  //    console.log(mensaje);
  //  }, milisegundos)
  //);
}

//cambiar nuestra función run() para que muestre en orden los siguientes mensajes.
// ```
// 1
// Terminó 1
// 2
// Terminó 2
// 3
// Terminó 3
// ```
async function run() {
  // al usar await,la fc run si o si tiene que ser async
  // await es con el then, encadena la ejecución, espera que se cumpla la promesa para seguir.
  console.log(1);
  await delay('Terminó 1', 1000);
  //console.log(2, 'Inspeccionar Promise:', promesa1);
  console.log(2);
  await delay('Terminó 2', 1000);
  //console.log(3, 'Inspeccionar Promise: ', promesa2);
  console.log(3);
  await delay('Terminó 3', 1000);
  //console.log('Inspeccionar Promise:', promesa3);
}

async function run2() {
  //Sin await sigue ejecutando secuencialmente, sin espera:
  console.log(1);
  delay('Terminó 1', 3000);
  console.log(2);
  delay('Terminó 2', 2000);
  console.log(3);
  delay('Terminó 3', 1000);
}

export const testDelay = {
  test() {
    run();
    //run2();
  },
};
