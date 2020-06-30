export const delay2 = (message, time) => {
  console.log(message);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, time);
  });
};

export const testDelay2 = {
  async run() {
    const msg1 = await delay2(1, 1000);
    console.log(`Terminó ${msg1}`);
    const msg2 = await delay2(2, 1000);
    console.log(`Terminó ${msg2}`);
    const msg3 = await delay2(3, 1000);
    console.log(`Terminó ${msg3}`);
  },
};
