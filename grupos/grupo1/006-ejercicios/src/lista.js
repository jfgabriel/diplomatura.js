const TODO = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];

const getActualList = () => JSON.parse(localStorage.getItem('ToDo')) || TODO;
const getListElement = () => document.getElementById('lista');

function refreshList(elem) {
  const actualList = getListElement();
  const inputData = Array.from(document.getElementsByTagName('input'));

  let list =
    elem?.type === 'submit' ? inputData.map((x) => x.value) : getActualList();
  list = list
    .filter((x) => x !== '')
    .map((item, y) => {
      const newElem = document.createElement('li');

      const erase = document.createElement('button');
      erase.addEventListener('click', destroy);
      erase.innerHTML = 'Borrar';
      erase.classList.add('destroyButton');
      newElem.appendChild(erase);

      const text = document.createElement('span');
      text.innerText = ' ' + item;
      newElem.appendChild(text);

      return newElem;
    });
  list.forEach((x) => actualList.appendChild(x));
  save();
  inputData.forEach((x) => (x.value = ''));
}

function destroy(e) {
  e.target.parentNode.remove();
  save();
}

function save() {
  const list = getListElement().children;
  if (list.length > 0) {
    const dataToSave = Array.from(list).map(
      (x) => x.getElementsByTagName('span')[0].innerText
    );

    localStorage.setItem('ToDo', JSON.stringify(dataToSave));
  } else {
    localStorage.removeItem('ToDo');
  }
}

function appConstructor() {
  return `<form action="#">
  <input type="text" id="item" placeholder="Para hacer" />
  <button id="add" class="addButton" type="submit">Agregar</button></form>`;
}

window.onload = () => {
  const appBody = appConstructor();

  const app = document.getElementById('app');
  app.innerHTML = appBody;

  const listElement = document.createElement('ul');
  listElement.setAttribute('id', 'lista');
  app.appendChild(listElement);
  refreshList();
};
window.onsubmit = refreshList;
