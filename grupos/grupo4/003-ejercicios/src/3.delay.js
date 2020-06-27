export function delay(message, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info(message);
      resolve();
    }, time);
  });
}

export async function run() {
  console.log(1);
  await delay('Terminó 1', 1000);
  console.log(2);
  await delay('Terminó 2', 1000);
  console.log(3);
  await delay('Terminó 3', 1000);
}
