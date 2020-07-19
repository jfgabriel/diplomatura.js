# Ejercicios 006: DOM

Este proyecto utiliza Parcel (https://parceljs.org/) que es un blundler para Javascript

Contiene tres archivos:

- index.html: documento HTML principal
- src/index.js: documento Javascript principal
- src/style.css: hoja de estilos CSS

Parcel automáticamente genera un servidor web que corre en el puerto `1234`. El servidor tiene `hot-reload`, es decir, cada vez que detecta un cambio en un archivo, la página se actualiza automáticamnete en el browser sin necesidad de refrescar ni el servidor ni el browser.

## Cómo ejecutar el proyecto

- Instalar dependencias con `npm install`
- Ejecutar `npm run start`
- Navegar al servidor web local desde un browser `http://localhost:1234/index.html`

## Ejercicio 1: Generar una tabla

Antes de comenzar este (y los demás ejercicios):

- Clonar el archivo `index.html` en uno nuevo. Por ejemplo: `index2.html`
- Navegar desde aquí `http://localhost:1234/index2.html`
- Quizás sea necesario reiniciar el servidor para que reconozca el nuevo archivo.

Escribir un script que genera dinámicamente una tabla con la siguiente estructura detro del elemento `<div id="app"></div>`

```html
<table>
  <tr>
    <th>name</th>
    <th>height</th>
    <th>place</th>
  </tr>
  <tr>
    <td>Kilimanjaro</td>
    <td>5895</td>
    <td>Tanzania</td>
  </tr>
  ...
</table>
```

La tabla debe generar a partir del siguiente array:

```javascript
const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];
```

## Ejercicio 2: Variante de tabla

Modificar el script anterior para que la tabla se genere cuando hago click en un boton `Generate now!`. Agregar, además, un botón secundario `¡Generar ahora!` que genere, alternativamente, la cabecera de la tabla en castellano.

Importante: al hacer click en cualquiera de los botones, el contenido actual del elemento `app` debería reemplazarse por el neuvo contenido.

## Ejercicio 3: Implementar una lista de compras

1. Generar una lista no ordenada de elementos (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) a partir del siguiente array:

   ```javascript
   const TODO = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];
   ```

2. Agregar un campo de texto (INPUT) y un botón (BUTTON) que permita agregar nuevos items a la lista

3. Agregar a cada item un botón pequeño que permita eliminar el item actual de la lista.

4. Agregar estilos a los botones. El botón para agregar debe tener un color de fondo verde, y el botón de eliminar colo rojo. Agregar los estilos en src/style.css

5. Investigar `localStorage API` para permitir persistir los datos entre refrescos de la página. Es posible que necesiten utilizar las funciones `JSON.parse` y `JSON.stringify` para convertir un objeto a string (y viceversa).

## Ejercicio 4: Jugando con globos

El ejercicio consiste en implementar un juego con globos.

Dibujar en la pantalla un número aleatorios de circulos de diferentes colores. El usuario puede explotarlo haciendo click sobre ellos. Cuando no quede ningún globo en pantalla mostrar un mensaje de finalización.

- Dibujar un número aleario de globos entre 10 y 30. Tip utilizar `Math.random`
- Implementar cada glovo con un elemento `DIV`. Investigar las propiedad css `border-radius` para generar el efecto apropiado
- Dibujar globos rojos, azules y amarillos intercaladamente
- Cada vez que el usuario hace clic sobre un globo, el mismo debe desaparecer de la pantalla.
- Cuando ya no queden globos mostrar el mensaje `¡Ganaste!`
