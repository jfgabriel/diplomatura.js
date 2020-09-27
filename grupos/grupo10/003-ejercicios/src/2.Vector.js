export class Vector {
  constructor(x = 0, y = 0) {
    this.vector = { x: x, y: y };
  }
  getComponentX() {
    return this.vector.x;
  }
  getComponentY() {
    return this.vector.y;
  }
  sumar(vectorDos) {
    let sumaComponenteX = this.vector.x + vectorDos.getComponentX();
    let sumaComponenteY = this.vector.y + vectorDos.getComponentY();
    let vector = new Vector(sumaComponenteX, sumaComponenteY);
    return vector;
  }
}
