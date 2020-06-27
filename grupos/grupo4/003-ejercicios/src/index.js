import { printTitle } from './utils';
import { run as collection } from './1.collection';
import { run as vector } from './2.vector';
import { run as delay } from './3.delay';
import { run as api } from './4.api';

console.clear();
console.info('='.repeat(80));

(async () => {
  printTitle('1. Collection');
  collection();

  printTitle('2. Vector ');
  vector();

  printTitle('3. Delay con callbacks');
  await delay();

  printTitle('4. Consumir una API con Promise Chaining');
  await api();
})();
