import { Collection, collectionTest } from './1.collection';
import { Vector, vectorTest } from './2.vector';
import { delay, testSetTimeout } from './3.setTimeout';
import { testApi } from './4.api';
import { testApiAsyncAwait } from './5.apiAsyncAwait';
import { testDelay } from './6.delay';

////////////////////////// EJERCICIO 1:
console.log('\n#### EJERCICIO 1 ####');
collectionTest.test();

////////////////////////// EJERCICIO 2:
console.log('\n#### EJERCICIO 2 ####');
vectorTest.test();

////////////////////////// EJERCICIO 4:
console.log('\n#### EJERCICIO 4 ####');
testApi.test();

////////////////////////// EJERCICIO 5:
console.log('\n#### EJERCICIO 5 ####');
testApiAsyncAwait.test();

////////////////////////// EJERCICIO 3:
setTimeout(() => {
  console.log('\n#### EJERCICIO 3 ####');
  testSetTimeout.test();
}, 6000);

////////////////////////// EJERCICIO 6:
setTimeout(() => {
  console.log('\n#### EJERCICIO 6 ####');
  testDelay.test();
}, 12000);
