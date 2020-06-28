import Collection from './1.collection.js';
import Vector from './2.vector.js';
import { run, run_two } from './3.delay.js';
import four_api from './4.api.js';
import getRemoteData from './5.async.await.js';
import run_promise from './6.delay.promise.js';

// 1 OK
const col = new Collection([3,4,5,6]);
console.log(col);

//2 OK
console.log(new Vector(1, 2).sumar(new Vector(2, 3)));

// 3 OK
run();
run_two();

// 4 OK
four_api();

// 5 OK
getRemoteData();

// 6
run_promise()