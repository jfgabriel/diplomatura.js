/*## Ejercicio 4: Jugando con globos

El ejercicio consiste en implementar un juego con globos que muestre globos de diferentes colores y permita al usuario explotarlos.
 Cuando no quede ningún globo en pantalla mostrar un mensaje de finalización.

- Dibujar un número aleario de globos entre 10 y 30. Tip utilizar `Math.random`
- Implementar cada globo con un elemento `DIV`. Investigar las propiedad css `border-radius` para generar el efecto apropiado
- Dibujar globos rojos, azules y amarillos intercaladamente
- Cada vez que el usuario hace clic sobre un globo, el mismo debe desaparecer de la pantalla.
- Cuando ya no queden globos mostrar el mensaje `¡Ganaste!`
*/
let cont = 0;
let app = document.getElementById('app');
const num_globos = 10 + Math.floor(Math.random() * 10); //ponemos una base minima de 10 globos
console.log('cant de globos: ' + num_globos);
let paleta = ['red', 'green', 'blue', 'pink', 'grey', 'yellow', 'orange']; //array de colores random al menos 5

for (let index = 0; index < num_globos; index++) {
  let selectedColor = Math.floor(Math.random() * 7);
  //crear un div por cada bucle
  //agregar ese div al app
  let nuevoGlobo = document.createElement('div');
  nuevoGlobo.id = 'globo' + index;
  nuevoGlobo.className = paleta[selectedColor];
  nuevoGlobo.append('  ');
  nuevoGlobo.style.left =
    5 + Math.floor(Math.random() * window.innerWidth) + 'px';
  nuevoGlobo.style.top =
    5 + Math.floor(Math.random() * (window.innerHeight / 2)) + 'px';
  nuevoGlobo.addEventListener('click', myFunction);
  app.appendChild(nuevoGlobo);
}

function myFunction() {
  if (this.className != 'white') {
    cont++;
    app.removeChild(this);
    this.className = 'white';
    if (cont == num_globos) {
     app.append('GANASTE');
    }
  }
}

//COLOCAR LOS DIV DISTRIBUIDOS RANDOM EN LA PANTALLA -done-
//INDIVIDUALIZARLOS Y AL HACER CLIC BORRARLOS
//cuando no hay mas globos poner ganaste!
