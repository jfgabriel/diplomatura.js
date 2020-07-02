class Vector {
  constructor(x = null, y = nul) {
    this.x = x;
    this.y = y;
  }

  getX(){
    return this.x;
  }


  getY(){
    return this.y;
  }

  sumar(vector = null) {
    let response = {
      x: this.x + vector.x,
      y: this.y + vector.y,
    };
    return response;
  }
}

module.exports = Vector;
