class Collection {
  constructor(elementos = null) {
    this.elementos = elementos || [];
  }

  add(elemento) {
    this.elementos.push(elemento);
    return this.elementos;
  }

  delete(elemento) {
    if (this.has(elemento)) {
      let index = this.elementos.indexOf(elemento);
      this.elementos.splice(index, 1);
      return this.elementos;
    }
  }

  has(elemento) {
    return this.elementos.find((e) => e == elemento);
  }
}

module.exports = Collection;
