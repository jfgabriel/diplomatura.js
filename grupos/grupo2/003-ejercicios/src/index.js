import { Collection } from './1.collection';

// const { Collection } = require('./1.collection');
let coleccion = new Collection([3, 7]);
coleccion.add(5);
console.log(coleccion.elementos);
console.log(coleccion.has(3));
console.log(coleccion.has(7));
coleccion.delete(7);
console.log(coleccion.elementos);
