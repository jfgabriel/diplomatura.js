'use strict';

export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  sumar(vector) {
    let vectorNuevo = {
      x: this.getX() + vector.getX(),
      y: this.getY() + vector.getY(),
    };
    return vectorNuevo;
  }
}
