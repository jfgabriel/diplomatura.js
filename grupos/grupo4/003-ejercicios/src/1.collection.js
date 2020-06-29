/*
## 1. Collection

Escribir una clase Collection que representa una colección de elementos. 
Esta clase debe:

- Poder construirse o vacía (sin elementos) o con una lista inicial de eltos
- Debe tener un método `add` para poder agregar un elemento
- Debe tener un método `delete` para poder eliminar un elemento
- Debe tener un método `has` para poder determinar un elemento existe en la colección
*/

export class Collection {
  constructor() {
    this.listaElementos = [];
  }

  add(elemento) {
    if (!this.has(elemento)) {
      this.listaElementos.push(elemento);
    }
  }

  has(elemento) {
    return this.listaElementos.includes(elemento);
  }

  delete(elemento) {
    const posicion = this.listaElementos.findIndex((x) => x === elemento);
    if (posicion >= 0) {
      this.listaElementos.splice(posicion, 1);
    }
  }

  toString() {
    console.log('Lista de elementos:', this.listaElementos.join(','));
  }
}

export const collectionTest = {
  test() {
    const miColeccion = new Collection();

    //Agregar 5 elementos:
    const max = 100;
    const min = 1;
    for (let index = 0; index < 5; index++) {
      let element = parseInt(Math.random() * (max - min + 1), 10) + min;
      miColeccion.add(element);
    }

    //Agregar elementos repetidos:
    miColeccion.add(-1);
    miColeccion.add(-1);
    miColeccion.add(-2);

    //imprimir la lista:
    miColeccion.print();

    //indicar que el varlor existe:
    let valor = -2;
    if (miColeccion.has(valor)) {
      console.log('El valor', valor, 'existe!');
    } else {
      console.log('El valor', valor, 'NO existe!');
    }

    valor = 300;
    if (miColeccion.has(valor)) {
      console.log('El valor', valor, 'existe!');
    } else {
      console.log('El valor', valor, 'NO existe!');
    }

    //eliminar un elemento
    miColeccion.delete(-1);
    miColeccion.delete(25);

    //imprimir la lista:
    miColeccion.print();
  },
};
