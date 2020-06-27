export class Vector {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error('"x" & "y" deben ser números');
    }
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  /**
   * @param {Vector} vector
   */
  sumar(vector) {
    return new Vector(vector.x + this.x, vector.y + this.y);
  }
}

export default () => {
  const v1 = new Vector(2, 3);
  console.info(v1);

  const v2 = new Vector(5, 6);
  const v3 = v1.sumar(v2);
  console.info(v3);
};
