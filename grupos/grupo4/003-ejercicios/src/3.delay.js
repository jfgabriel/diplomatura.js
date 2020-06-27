export function delay(message, time) {
  console.time(message);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.timeEnd(message);
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
