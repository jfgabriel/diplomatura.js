const TODO = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];
const appDiv = document.getElementById('app');

/* Funcion del ejercicio 3 para agregar una comida nueva*/
function addFood(lista, comida) {
  const li = document.createElement('li');
  li.innerHTML = comida;
  lista.appendChild(li);

  const bDelete = document.createElement('button');
  bDelete.innerHTML = `X`;
  bDelete.setAttribute('class', 'deleteButton');
  bDelete.addEventListener('click', (event) => {
    event.target.parentElement.remove();
  });
  li.appendChild(bDelete);
}

/*Creo un Div dentro de app para la lista no ordenada del ejercicio 3*/
function inicializarListaComida() {
  const lnoDiv = document.createElement('div');
  appDiv.appendChild(lnoDiv);

  const ul = document.createElement('ul');
  lnoDiv.appendChild(ul);

  for (comida of TODO) {
    addFood(ul, comida);
  }

  const inputNuevaComida = document.createElement('input');
  lnoDiv.appendChild(inputNuevaComida);
  const buttonNuevaComida = document.createElement('button');
  buttonNuevaComida.setAttribute('class', 'addButton');
  buttonNuevaComida.innerHTML = `Add food`;
  buttonNuevaComida.addEventListener('click', (e) => {
    addFood(ul, inputNuevaComida.value);
    inputNuevaComida.value = '';
  });
  lnoDiv.appendChild(buttonNuevaComida);
}

inicializarListaComida();
