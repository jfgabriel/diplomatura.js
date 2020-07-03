// ## 6. Delay (_TAREA PARA EL HOGAR_)
//
// - Modificar nuestra función `delay` para que utilice Promises. `delay` tomará un sólo parámetro 
//   `segundos` y debe devolver una Promise que resuelva cuando el tiempo ha finalizado.
// - Una vez modificada, cambiar nuestra función run() para que muestre en orden los siguientes mensajes. 
//
//   1
//   Terminó 1
//   2
//   Terminó 2
//   3
//   Terminó 3
////////////////////////////////////////////////////////////////////////////////////////////////////////

function delay_promise(mensaje, segundos = 500) {
    return new Promise((resolve, reject) => {
        if (mensaje === '') reject('mensaje vacio');
        setTimeout(() => {
            console.log(mensaje);
            resolve();
        }, segundos);
    })
}

function run_promise() {
    console.log(1);
    delay_promise('Terminó 1', 1000)
        .then(() => {
            console.log(2);
            delay_promise('Terminó 2', 100)
                .then(() => {
                    console.log(3);
                    delay_promise('Termino 3', 1000).catch(err => console.error(err));
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))

}

export default run_promise;