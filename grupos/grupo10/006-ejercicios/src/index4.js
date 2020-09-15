document.getElementById('app').innerHTML = 'Hello World!';
//Tomamos el elemento app
const app = document.getElementById('app');
// Generamos un numero random entre 10 y 30
const cantidadGlobos = Math.random() * 20 + 10;
// Creamos un elemeto con id globos para insertar cada elemento globo
app.innerHTML = '<div id="globos"></div>';
// Tomamos el elemento con id globo (padre)
const globos = document.getElementById('globos');

let controlColor = 1;
for (let i = 0; i < cantidadGlobos; i++) {
  let newDiv = document.createElement('div'); // Creamos un div
  newDiv.id = i; // Agregamos un id
  let color;
  if (controlColor === 1) {
    color = 'rojo';
    controlColor = controlColor + 1;
  } else if (controlColor === 2) {
    color = 'azul';
    controlColor = controlColor + 1;
  } else if (controlColor === 3) {
    color = 'amarillo';
    controlColor = 1;
  }
  newDiv.setAttribute('class', color);

  globos.appendChild(newDiv, app);
}

// Evento click sobre el elemento con id globos
globos.addEventListener(
  'click',
  function (event) {
    // Tomamos que sea diferente a id="globos"
    if (event.target.id !== 'globos') {
      let idGloboClickeado = event.target.id; // Obtenemos el id del elemento div
      let globo = document.getElementById(idGloboClickeado); // Obtenemos el elemento
      globos.removeChild(globo); // Lo eliminamos

      let cantGlobos = globos.getElementsByTagName('div').length; // Contamos cuantos div nos quedan
      // Si es igual a 0 mostramos el mensaje "¡Ganaste!"
      if (cantGlobos === 0) {
        app.innerHTML = '¡Ganaste!';
      }
    }
  },
  false
);
