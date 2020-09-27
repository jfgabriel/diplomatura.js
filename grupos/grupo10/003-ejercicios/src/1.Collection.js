export class Collection {
  constructor(coleccion = []) {
    this.coleccion = coleccion;
  }
  add(elemento) {
    elemento ? this.coleccion.push(elemento) : null;
  }
  delete(elemento) {
    let i = this.coleccion.indexOf(elemento);
    i !== -1 && this.coleccion.splice(i, 1);
  }
  has(elemento) {
    const found = this.coleccion.find((element) => element === elemento);
    return found ? true : false;
  }
}
