export class Collection {
  constructor(initialData = []) {
    this._data = [...initialData];
  }

  add(item) {
    this._data.push(item);
    return this;
  }

  delete(item) {
    if (this.has(item)) {
      this._data.splice(this._data.indexOf(item), 1);
    }

    return this;
  }

  has(item) {
    return this._data.includes(item);
  }
}

export function run() {
  const original = ['fox', 'red'];
  const c = new Collection(original);

  c.add(123);
  c.add('foo');
  c.add('bar');
  console.info(c);
  c.delete('foo');
  console.info(c);

  console.info(original);
}
