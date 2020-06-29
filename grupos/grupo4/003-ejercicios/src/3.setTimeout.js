//Crear una función `delay` que tome dos parámetros `mensaje` y `milisegundos`
//y muestre un mensaje después del tiempo indicado.

export const delay = (mensaje, milisegundos) => {
  setTimeout(() => {
    console.log(mensaje);
  }, milisegundos);
};

//Crear una función `run` con el siguiente código

const run = () => {
  console.log(1);
  delay('Terminó 1', 1000);
  console.log(2);
  delay('Terminó 2', 1000);
  console.log(3);
  delay('Terminó 3', 1000);
};

//- Modificar nuestra función `run` con el siguiente código. Ejecutarla y observar el resultado.
const run2 = () => {
  console.log(1);
  delay('Terminó 1', 3000);
  console.log(2);
  delay('Terminó 2', 2000);
  console.log(3);
  delay('Terminó 3', 1000);
};

export const testSetTimeout = {
  test() {
    run2();
  },
};
