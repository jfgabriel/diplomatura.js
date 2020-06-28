function delay_promise(mensaje, segundos = 500) {
    return new Promise(resolve => {
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
            delay_promise('Terminó 2', 1000)
                .then(() => {
                    console.log(3);
                    delay_promise('Terminó 3', 1000);
                })
        })

}

export default run_promise;