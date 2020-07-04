"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = void 0;

/*
1. Collection

Escribir una clase Collection que representa una colección de elementos. Esta clase debe:

- Poder construirse o vacía (sin elementos) o con una lista inicial de elemenetos
- Debe tener un método `add` para poder agregar un elemento
- Debe tener un método `delete` para poder eliminar un elemento
- Debe tener un método `has` para poder determinar un elemento existe en la colección
*/
class Collection {
  constructor() {
    var lista = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.lista = lista;
  }

  add(elemento) {
    if (!this.has(elemento)) {
      //Si no existe el elemento
      this.lista.push(elemento);
    }
  }

  delete(elemento) {
    var posicion = this.lista.indexOf(elemento); //-1 si no existe

    if (posicion !== -1) {
      var cantidad = 1;
      this.lista.splice(posicion, cantidad);
    } //return posicion;

  }

  has(elemento) {
    return this.lista.indexOf(elemento) !== -1;
  }

  has2(elemento) {
    return this.lista.includes(elemento);
  }

}

exports.Collection = Collection;