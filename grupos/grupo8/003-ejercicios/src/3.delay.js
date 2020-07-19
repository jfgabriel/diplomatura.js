export let d = {
  delay: function (mensaje, milisegundos) {
    setTimeout(() => {
      console.log(mensaje);
    }, milisegundos);
  },
  run: function () {
    console.log(1);
    this.delay('Terminó 1', 3000);
    console.log(2);
    this.delay('Terminó 2', 2000);
    console.log(3);
    this.delay('Terminó 3', 1000);
  },
};
