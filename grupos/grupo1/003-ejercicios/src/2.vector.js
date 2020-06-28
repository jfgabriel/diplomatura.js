class Vector {
  constructor(x = null, y = nul) {
    this.x = x;
    this.y = y;
    return this;
  }

  //getters???

  sumar(vector = null) {
    let response = {
      x: this.x + vector.x,
      y: this.y + vector.y,
    };
    return response;
  }
}

module.exports = Vector;
