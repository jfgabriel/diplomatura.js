import { printTitle } from './utils';
import { run as collection } from './1.collection';
import { run as vector } from './2.vector';
import { run as delay } from './3.delay';

console.clear();
console.info('='.repeat(80));

printTitle('1. Collection');
collection();

printTitle('2. Vector ');
vector();

printTitle('3. Delay con callbacks');
delay();
