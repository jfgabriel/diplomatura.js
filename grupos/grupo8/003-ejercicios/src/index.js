import { Collection } from './1.collection';
import { Vector } from './2.vector';
import { ejercicio3 } from './3.delay';
import { ejercicio4 } from './4.api';
import { getRemoteData } from './5.api';
import { run } from './6.delay';

const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let coleccion = new Collection(lista);

coleccion.add(11);

console.log(lista);

console.log(coleccion.delete(5));

console.log(coleccion.has(3));

ejercicio3.delay('hola mundo desde index', 2000);

ejercicio3.run();

setTimeout(() => {
  console.log('hola mundo');
}, 3000);

getRemoteData().then((datos) => console.log(datos));

run(5000).then((datos) => {
  console.log(datos);
});

console.log(new Vector(1, 2).sumar(new Vector(2, 3)));
