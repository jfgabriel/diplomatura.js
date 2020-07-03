import {Collection} from './1.collection';

const col = new Collection([1,2,3]);

console.log(col);

col.add(4);
console.log(col);

col.delete(3);
console.log(col);

console.log(col.has(2));
console.log(col.has(3));
