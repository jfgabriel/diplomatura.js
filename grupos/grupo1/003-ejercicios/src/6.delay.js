export const delay = (mensaje, tiempo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log(mensaje);
        }, tiempo);
    });
  };
  
  export async function run() {
    console.log(1);
    delay('Terminó 1', 1000).then('Terminó 1');
    console.log(2);
    delay('Terminó 2', 2000).then('Terminó 2');
    console.log(3);
    delay('Terminó 3', 3000).then('Terminó 3');
  };
  