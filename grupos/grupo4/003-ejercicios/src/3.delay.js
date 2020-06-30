export const delay = (message, time) => {
  return setTimeout(() => {
    console.log(message);
  }, time);
};

export const testDelay = {
  run() {
    // console.log('Test N°1:');
    // console.log(1);
    // delay('Terminó 1', 1000);
    // console.log(2);
    // delay('Terminó 2', 1000);
    // console.log(3);
    // delay('Terminó 3', 1000);

    console.log('Test N°2:');
    console.log(1);
    delay('Terminó 1', 3000);
    console.log(2);
    delay('Terminó 2', 2000);
    console.log(3);
    delay('Terminó 3', 1000);
  },
};
