/*funcion chequea ganador*/
function checkGanaste() {
  if (totalGlobos <= 0) {
    alert('Ganaste');
  }
}

/* reinicar Juego*/
function reiniciarJuego() {
  divJuego.innerHTML = '';
}

/*Función para inicializar el juego del ejercicio 4*/
const divJuego = document.getElementById('juego');
function jugar() {
  reiniciarJuego();

  for (let g = 1; g <= totalGlobos; g++) {
    const globo = document.createElement('div');
    globo.className = 'globo globo' + (g % 3);
    globo.addEventListener('click', (e) => {
      e.target.remove();
      totalGlobos--;
      checkGanaste();
    });
    divJuego.appendChild(globo);
  }

  return 0;
}

/*Preparando el botón para generar el ejercicio 4*/
let totalGlobos = 0;

const botonGlobo = document.getElementById('jugar');
botonGlobo.addEventListener('click', (e) => {
  /*Defino la cantidad de Juegos*/
  totalGlobos = 10 + Math.floor(20 * Math.random());
  jugar();
});
