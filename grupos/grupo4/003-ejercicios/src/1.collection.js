// Escribir una clase Collection que representa una colección de elementos. Esta clase debe:
export class Collection {
  // Poder construirse o vacía (sin elementos) o con una lista inicial de elementos
  constructor(list = []) {
    this.list = [...list];
    // Debe tener un método `add` para poder agregar un elemento
    this.add = (element) => {
      if (!this.has(element)) {
        return this.list.push(element);
      }
    };
    // Debe tener un método `delete` para poder eliminar un elemento
    this.delete = (element) => {
      if (this.has(element)) {
        const index = this.list.indexOf(element);
        return this.list.splice(index, 1);
      }
    };
    // Debe tener un método `has` para poder determinar un elemento existe en la colección
    this.has = (element) => {
      return this.list.includes(element);
    };
    this.toString = () => {
      return this.list;
    };
  }
}

export const testCollection = {
  test() {
    const myCollection = new Collection(['una lista']);
    myCollection.add('elemento1');
    myCollection.add(1001);
    myCollection.add(1002);

    console.log(myCollection.toString());

    myCollection.delete(1001);

    console.log(myCollection.toString());
  },
};
