import { Collection } from './1.collection';
import { d } from './3.delay';


const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let coleccion = new Collection(lista);


coleccion.add(11);

console.log(lista);

console.log(coleccion.delete(5));

console.log(coleccion.has(3));

//d.delay('hola mundo desde index', 2000);

d.run();

//setTimeout(() => { console.log('hola mundo') }, 3000);
