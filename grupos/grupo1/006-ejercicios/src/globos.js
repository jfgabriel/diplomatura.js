import colaURL from './cola.png';

const getGameSpace = () => document.getElementById('app');
const checkRemaining = () => getGameSpace().children.length === 0;

function newGlobo() {
  const space = document.createElement('div');
  space.classList.add('globoDiv');

  const globo = document.createElement('div');
  globo.classList.add('globo');
  globo.style.backgroundColor =
    colores[Math.trunc(Math.random() * colores.length)];
  globo.addEventListener('click', destroy);

  const cola = document.createElement('img');
  cola.src = colaURL;

  space.appendChild(globo);
  space.appendChild(cola);
  return space;
}

function destroy(e) {
  e.target.parentNode.remove();
  if (checkRemaining()) {
    const gameSpace = getGameSpace();
    gameSpace.innerHTML = '¡Ganaste!<br/><br/>';

    const botonEmpezar = document.createElement('button');
    botonEmpezar.addEventListener('click', appConstructor);
    botonEmpezar.innerText = 'Empezar';
    gameSpace.appendChild(botonEmpezar);
  }
}

function getGlobos(numberOfGlobos) {
  return Array.from({ length: numberOfGlobos }, () => newGlobo());
}

function appConstructor() {
  const cantidad = Math.round(10 + Math.random() * 20);
  const globos = getGlobos(cantidad);
  const gameSpace = getGameSpace();
  gameSpace.innerHTML = '';
  globos.forEach((x) => {
    gameSpace.appendChild(x);
  });
}

window.onload = () => {
  appConstructor();
};

const colores = [
  'red',
  'yellow',
  'black',
  'green',
  'gray',
  'purple',
  'pink',
  'blue',
  'lightblue',
  'lightgreen',
];
