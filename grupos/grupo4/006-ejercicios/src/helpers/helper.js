export const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const TEXT_CONVERTER = {
  name: 'nombre',
  height: 'altura',
  place: 'lugar',
};

const traducir = (word) => {
  return TEXT_CONVERTER[word];
};

export const arrayToTable = (arreglo, document, traducirEncabezado = false) => {
  const tabla = document.createElement('table');
  const cuerpoTabla = document.createElement('tbody');
  let agregarEncabezado = true; //bandera obtener el encabezado del 1er objeto del arreglo
  const encabezado = document.createElement('tr');

  arreglo.forEach((objeto) => {
    const fila = document.createElement('tr');

    for (const key in objeto) {
      if (agregarEncabezado) {
        let keyEncabezado = key;
        const celdaEncabezado = document.createElement('td');

        if (traducirEncabezado) {
          keyEncabezado = traducir(keyEncabezado);
        }

        const celdaTextoEncabezado = document.createTextNode(
          `${keyEncabezado}`
        );

        celdaEncabezado.appendChild(celdaTextoEncabezado);
        encabezado.appendChild(celdaEncabezado);
      }

      const celdaFila = document.createElement('td');
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
