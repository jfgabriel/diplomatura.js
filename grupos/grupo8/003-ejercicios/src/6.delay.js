async function delay(segundos) {
  try {
    return setTimeout(() => {
      console.log('Entro');
      segundos;
    });
  } catch (error) {
    //...
  }
}

export async function run(segundos) {
  console.log(1);
  await delay(segundos);
  console.log(2);
  await delay(segundos);
  console.log(3);
  await delay(segundos);
}
