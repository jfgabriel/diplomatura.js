export const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const traducir = (word) => {
  const objConverter = {
    name: 'nombre',
    height: 'altura',
    place: 'lugar',
  };
  const palabra = objConverter[word];
  return palabra;
};

export const arrayToTable = (arreglo, document, traducirEncabezado = false) => {
  let tabla = document.createElement('table');
  let cuerpoTabla = document.createElement('tbody');
  let agregarEncabezado = true; //bandera obtener el encabezado del 1er objeto del arreglo
  let encabezado = document.createElement('tr');
  arreglo.forEach((objeto) => {
    let fila = document.createElement('tr');
    for (let key in objeto) {
      if (agregarEncabezado) {
        let keyEncabezado = key;
        let celdaEncabezado = document.createElement('th');
        if (traducirEncabezado) {
          keyEncabezado = traducir(keyEncabezado);
        }
        const celdaTextoEncabezado = document.createTextNode(
          `${keyEncabezado}`
        );
        celdaEncabezado.appendChild(celdaTextoEncabezado);
        encabezado.appendChild(celdaEncabezado);
      }
      let celdaFila = document.createElement('th');
      const celdaTextoFila = document.createTextNode(`${objeto[key]}`);
      celdaFila.appendChild(celdaTextoFila);
      fila.appendChild(celdaFila);
    }
    if (agregarEncabezado) {
      agregarEncabezado = false;
      cuerpoTabla.appendChild(encabezado);
    }
    cuerpoTabla.appendChild(fila);
  });
  tabla.appendChild(cuerpoTabla);

  return tabla;
};

export const arrayToTableString = (arreglo) => {
  let agregarEncabezado = true;
  let encabezado = '<tr>';
  let cuerpo = '';
  arreglo.forEach((json) => {
    let fila = '<tr>';
    for (const key in json) {
      if (agregarEncabezado) {
        encabezado += `<th>${key}</th>`;
      }
      fila += `<th>${json[key]}</th>`;
    }
    fila += '</tr>';
    if (agregarEncabezado) {
      encabezado += '</tr>';
      agregarEncabezado = false;
    }
    cuerpo += fila;
  });
  const tabla = '<table>' + encabezado + cuerpo + '</table>';

  return tabla;
};
