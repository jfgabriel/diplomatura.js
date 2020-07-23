const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

/*Estructura para manejar los idiomas*/
const traslates = {
  name: {
    eng: 'name',
    spa: 'nombre',
  },
  height: {
    eng: 'height',
    spa: 'altura',
  },
  place: {
    eng: 'place',
    spa: 'lugar',
  },
};

/*Es la función que crea la tabla de Montañas*/
function crearTabla(div, lenguaje) {
  /*borro la tabla si ya existe*/
  const tablaExistente = document.getElementById('montains_table');
  if (tablaExistente) {
    tablaExistente.remove();
  }

  /*Creo la tabla*/
  const tabla = document.createElement('table');
  tabla.setAttribute('Id', 'montains_table');
  div.appendChild(tabla);

  /*Creo los encabezados*/
  const row = document.createElement('tr');
  for (property in traslates) {
    const cell = document.createElement('th');
    cell.innerHTML = traslates[property][lenguaje];
    row.appendChild(cell);
  }
  tabla.appendChild(row);

  /*Creo cada fila*/
  for (mount of MOUNTAINS) {
    const row = document.createElement('tr');
    for (property in mount) {
      const cell = document.createElement('td');
      cell.innerHTML = mount[property];
      row.appendChild(cell);
    }
    tabla.appendChild(row);
  }

  return tabla;
}

const appDiv = document.getElementById('app');
appDiv.innerHTML = 'Hello World!';

/*Creo un Div dentro de app para agregar los botones del ejercicio 2*/
const buttonsDiv = document.createElement('div');
appDiv.appendChild(buttonsDiv);

/*Agrego el boton en ingles*/
const botonEng = document.createElement('button');
botonEng.innerHTML = `Generate now!`;
botonEng.addEventListener('click', (e) => {
  crearTabla(buttonsDiv, 'eng');
});
buttonsDiv.appendChild(botonEng);

/*Agrego el boton en Español*/
const botonSpa = document.createElement('button');
botonSpa.innerHTML = `¡Generar ahora!`;
botonSpa.addEventListener('click', (e) => {
  crearTabla(buttonsDiv, 'spa');
});
buttonsDiv.appendChild(botonSpa);
