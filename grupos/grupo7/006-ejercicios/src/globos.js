// SETEOS
globos = [];
document.getElementById('btnJugar').addEventListener('click', iniciarJuego);
let animador;

function iniciarJuego() {
  inflarGlobos();
  if (!animador) animador = setInterval(moverGlobos, 10);
}

function inflarGlobos() {
  const cant = parseInt(Math.random() * 5.0 + 10);
  console.log(cant);
  for (let i = 0; i < cant; i++) {
    let unGlobo = document.createElement('div');
    unGlobo.setAttribute('class', 'globo' + parseInt(Math.random() * 3));
    unGlobo.setAttribute('vel', parseInt(Math.random() * 2 + 1));
    esconderGlobo(unGlobo);
    unGlobo.addEventListener('click', reventarGlobo);
    globos.push(unGlobo);
    document.getElementById('cielo').appendChild(unGlobo);
  }
  actualizarCant();
}

function actualizarCant() {
  document.getElementById('btnGlobos').innerText = 'Globos ' + globos.length;
  mostrarGanaste(globos.length === 0);
}
function esconderGlobo(unGlobo) {
  unGlobo.style.left = parseInt(Math.random() * 80 + 10) + 'vw';
  unGlobo.style.top =
    parseInt(Math.random() * window.innerHeight * 0.7 + window.innerHeight) +
    'px';
}

function mostrarGanaste(ver = true) {
  document.getElementById('ganaste').style.display = ver ? 'block' : 'none';
}
function reventarGlobo(e) {
  e.target.remove();
  globos = globos.filter((g) => g !== e.target);
  actualizarCant();
}

function moverGlobos() {
  let velocidad = 1;
  let y;
  for (var globo of globos) {
    velocidad = globo.getAttribute('vel');
    y = parseInt(globo.style.top) - velocidad;
    if (y < -60) {
      esconderGlobo(globo);
    } else {
      globo.style.top = y + 'px';
      globo.style.left =
        parseFloat(parseFloat(globo.style.left) + (Math.random() * 0.2 - 0.1)) +
        'vw';
    }
  }
}
