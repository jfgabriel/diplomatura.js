import { arrayToTable, MOUNTAINS } from './helpers/helper';

// document.getElementById('app').innerHTML = 'Hello World!';

const btnGenerarTabla = document.getElementById('btnGenerarTabla');
btnGenerarTabla.addEventListener('click', () => {
  const tabla = arrayToTable(MOUNTAINS, document, false);
  const app = document.getElementById('app');
  const oldtable = app.getElementsByTagName('table')[0];

  if (oldtable) {
    app.removeChild(oldtable);
  }

  app.appendChild(tabla);
});

const btnGenerarTablaCastellano = document.getElementById(
  'btnGenerarTablaCastellano'
);

btnGenerarTablaCastellano.addEventListener('click', () => {
  const tabla = arrayToTable(MOUNTAINS, document, true);
  const app = document.getElementById('app');
  const oldtable = app.getElementsByTagName('table')[0];

  if (oldtable) {
    app.removeChild(oldtable);
  }

  app.appendChild(tabla);
});
