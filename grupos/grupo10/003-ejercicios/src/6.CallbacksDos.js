const delay = (milisegundos) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve;
    }, milisegundos);
  });
};

export const runDos = async () => {
  console.log(1);
  await delay(3000);
  console.log('Terminó 1');

  console.log(2);
  await delay(2000);
  console.log('Terminó 2');

  console.log(3);
  await delay(1000);
  console.log('Terminó 3');
};
