document.getElementById('app').innerHTML = 'Hello World! <br/><br/>';

// Creamos el input y lo agregamos
const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'inputItem');
document.getElementById('app').appendChild(input);

// Creamos el boton de agregar
const btnAdd = document.createElement('BUTTON');
btnAdd.innerHTML = 'Agregar';
btnAdd.style.background = 'green';
btnAdd.setAttribute('id', 'btnAddItem');
document.getElementById('app').appendChild(btnAdd);

// Creamos la funcion del boton add element
const btnAddItem = document.getElementById('btnAddItem');
btnAddItem.addEventListener(
  'click',
  function (event) {
    const input = document.getElementById('inputItem').value;
    // Eliminamos los espacios para verificar que no ingrese vacio
    if (input.replace(/^\s+/, '').replace(/\s+$/, '') !== '') {
      addElement(input);
      listElements();
      document.getElementById('inputItem').value = '';
    } else {
      console.log('No ingresó ningún texto');
    }
  },
  false
);

// Function para agregar elementos al arreglo
const addElement = (input) => {
  arrayElements.push(input);
};

// Function para eliminar elementos al arreglo
const deleteElement = (input) => {
  const index = arrayElements.indexOf(input);
  if (index > -1) {
    arrayElements.splice(index, 1);
    listElements();
  }
};

// Creamos elemento ul
const ul = document.createElement('ul');
ul.setAttribute('id', 'listElements');
document.getElementById('app').appendChild(ul);

// Funcion para listar los elementos;
const listElements = () => {
  document.getElementById('listElements').innerHTML = '';
  let li;
  arrayElements.map((element) => {
    li = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      deleteElement(element);
    });
    deleteButton.style.background = 'red';

    li.innerHTML = element;
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
  localStorage.setItem('array', JSON.stringify(arrayElements));
};
let arrayElements;
if (localStorage.getItem('array')) {
  arrayElements = JSON.parse(localStorage.getItem('array'));
} else {
  arrayElements = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];
}
listElements();
