//document.getElementById('app').innerHTML = 'Hello index 2!';

//los datos para la tabla
const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const app = document.getElementById('app');
const botones = document.getElementById('botones');

//creamos los botones
var boton = document.createElement('button');
boton.innerHTML = 'Generate Now!';
botones.appendChild(boton);
var boton2 = document.createElement('button');
boton2.innerHTML = 'Generar ahora!';
botones.appendChild(boton2);

//funcion para eliminar la tabla y generar la nueva
function armarTabla(dato) {
  return () => {
    if (app.children.length !== 0) {
      app.removeChild(app.lastElementChild);
    } else {
      generartabla(dato);
    }
  };
}

function generartabla(dato) {
  let table = document.createElement('table');
  table.setAttribute('border', 1);
  let trCabecera = document.createElement('tr');
  let thName = document.createElement('th');
  let thHeight = document.createElement('th');
  let thPlace = document.createElement('th');

  thName.textContent = dato.name;
  thHeight.textContent = dato.height;
  thPlace.textContent = dato.place;

  trCabecera.appendChild(thName);
  trCabecera.appendChild(thHeight);
  trCabecera.appendChild(thPlace);
  table.appendChild(trCabecera);
  app.appendChild(table);

  MOUNTAINS.forEach((montania) => {
    const tr = document.createElement('tr');
    let tdName = document.createElement('td');
    tdName.textContent = montania.name;
    tr.appendChild(tdName);
    let tdHeight = document.createElement('td');
    tdHeight.textContent = montania.height;
    tr.appendChild(tdHeight);
    let tdPlace = document.createElement('td');
    tdPlace.textContent = montania.place;
    tr.appendChild(tdPlace);
    table.appendChild(tr);
    app.appendChild(table);
  });
}
const dato1 = { name: 'name', height: 'heigth', place: 'place' };
const dato2 = { name: 'nombre', height: 'altura', place: 'sitio' };

boton.addEventListener('click', armarTabla(dato1));
boton2.addEventListener('click', armarTabla(dato2));
