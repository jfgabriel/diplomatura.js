function delay(mensaje, milisegundos) {
    console.time(mensaje)
    setTimeout(() => {
        console.timeEnd(mensaje);
    }, milisegundos);
}

export function run() {
    console.log(1);
    delay('Terminó 1.1', 1000);
    console.log(2);
    delay('Terminó 1.2', 1000);
    console.log(3);
    delay('Terminó 1.3', 1000);
}

export function run_two() {
    console.log(1);
    delay('Terminó 2.1', 3000);
    console.log(2);
    delay('Terminó 2.2', 2000);
    console.log(3);
    delay('Terminó 2.3', 1000);
}