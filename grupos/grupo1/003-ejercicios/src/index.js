'use strict';
const Collection = require('./1.collection.js');
const Vector = require('./2.vector.js');
const delay = require('./3.delay.js');

let collection = new Collection([1, 2, 3]);

//console.log(collection.add("x"));
//console.log(collection.delete("3"));
//console.log(collection.has(1));

//delay.run();


console.log(new Vector(1, 2).sumar(new Vector(2, 3)));
//console.log(new Vector(1, 2));