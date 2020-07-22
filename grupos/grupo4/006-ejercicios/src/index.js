import { arrayToTable, MOUNTAINS } from './helpers/helper';

document.getElementById('app').innerHTML = 'Hello World!';

//Agregar table al elmento <div id="app">
//const tabla = arrayToTable(MOUNTAINS, document, false);
//let app = document.getElementById('app');
//app.appendChild(tabla);

//eventos:
let btnGenerarTabla = document.getElementById('btnGenerarTabla');
btnGenerarTabla.addEventListener('click', () => {
  const tabla = arrayToTable(MOUNTAINS, document, false);
  let app = document.getElementById('app');
  const oldtable = app.getElementsByTagName('table')[0];
  if (oldtable) {
    app.removeChild(oldtable);
  }
  app.appendChild(tabla);
});

let btnGenerarTablaCastellano = document.getElementById(
  'btnGenerarTablaCastellano'
);
btnGenerarTablaCastellano.addEventListener('click', () => {
  const tabla = arrayToTable(MOUNTAINS, document, true);
  let app = document.getElementById('app');
  const oldtable = app.getElementsByTagName('table')[0];
  if (oldtable) {
    app.removeChild(oldtable);
  }
  app.appendChild(tabla);
});
