const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

function mostrarOcultarTablas1() {
  mostrado = 0;
  elem = document.getElementById('app');
  if (elem.style.display == 'block') mostrado = 1;
  elem.style.display = 'none';
  if (mostrado != 1) elem.style.display = 'block';
}

function mostrarOcultarTablas2() {
  mostrado = 0;
  elem = document.getElementById('tabla');
  if (elem.style.display == 'block') mostrado = 1;
  elem.style.display = 'none';
  if (mostrado != 1) elem.style.display = 'block';
}

document.getElementById('pinchable1').onclick = function () {
  mostrarOcultarTablas1(myFunction());
};

document.getElementById('pinchable2').onclick = function () {
  mostrarOcultarTablas2(myFunction1());
};

function myFunction() {
  //obtenemos referencia del DOM
  //const $cuerpoTabla = document.querySelector("#app");
  const cuerpoTabla = document.getElementById('app');

  //let myTable= document.getElementById('table');
  /*MOUNTAINS.forEach(element => {
         let fila = myTable.insertRow(myTable.rows.length);
         fila.insertCell(0).innerHTML = element.name;
           fila.insertCell(1).innerHTML = element.height;
          fila.insertCell(2).innerHTML = element.place;
     });*/

  MOUNTAINS.forEach((element) => {
    const tr = document.createElement('tr');
    // Creamos el <td> de nombre y lo adjuntamos a tr
    let tdNombre = document.createElement('td');
    tdNombre.textContent = element.name;
    // el textContent del td es el nombre
    tr.appendChild(tdNombre);
    // El td de altura
    let tdAltura = document.createElement('td');
    tdAltura.textContent = element.height;
    tr.appendChild(tdAltura);
    // El td del sitio
    let tdSitio = document.createElement('td');
    tdSitio.textContent = element.place;
    tr.appendChild(tdSitio);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    cuerpoTabla.appendChild(tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
  });

  //document.createElement – Para crear un elemento, en este caso el tr y el td
  //document.querySelector – Obtener referencia a elementos del DOM
  //elemento.appendChild – Adjuntar un elemento hijo a otro elemento
}

function myFunction1() {
  const cuerpoTabla = document.getElementById('tabla');

  MOUNTAINS.forEach((element) => {
    const tr = document.createElement('tr');
    // Creamos el <td> de nombre y lo adjuntamos a tr
    let tdNombre = document.createElement('td');
    tdNombre.textContent = element.name;
    // el textContent del td es el nombre
    tr.appendChild(tdNombre);
    // El td de altura
    let tdAltura = document.createElement('td');
    tdAltura.textContent = element.height;
    tr.appendChild(tdAltura);
    // El td del sitio
    let tdSitio = document.createElement('td');
    tdSitio.textContent = element.place;
    tr.appendChild(tdSitio);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    cuerpoTabla.appendChild(tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
  });
}

//------------------generar lista

const TODO = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];

const cuerpoTabla = document.getElementById('myList');

TODO.forEach((element) => {
  const li = document.createElement('LI');
  // Creamos el <td> de nombre y lo adjuntamos a tr
  let textnode = document.createTextNode(element);
  li.appendChild(textnode);
  cuerpoTabla.appendChild(li);
});

document.getElementById('agregarLista').onclick = function () {
  agregLista();
};

function agregLista() {
  let li = document.createElement('LI');
  let x = document.getElementById('myText').value;
  let t = document.createTextNode(x);
  li.appendChild(t);
  document.getElementById('myList').appendChild(li);
}
