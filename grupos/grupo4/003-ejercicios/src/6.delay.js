async function delay(mensaje, milisegundos) {
  return new Promise((resolve) => {
    setTimeout(function () {
      console.log(mensaje);
      resolve(); //resuelve la promesa.
    }, milisegundos);
  });
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
  console.log(1);
  await delay('Terminó 1', 1000);
  console.log(2);
  await delay('Terminó 2', 1000);
  console.log(3);
  await delay('Terminó 3', 1000);
}

export const testDelay = {
  test() {
    run();
  },
};
