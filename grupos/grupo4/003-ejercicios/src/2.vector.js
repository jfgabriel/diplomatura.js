// Escribir una clase Vector que represente un espacio de dos dimensiones x e y. Esta clase debe:
export class Vector {
  // - Poder construirse desde dos valores `x` e `y`
  constructor(x = 0, y = 0) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  }
  // - Debe tener dos getters para obtener esos valores
  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }
  set X(value) {
    return (this.x = value);
  }
  set Y(value) {
    return (this.y = value);
  }
  // -  Debe tener un método `sumar` que tome un vector por parámetro
  //    y devuelva _un nuevo vector_ sumando los valores de x e y de ambos vectores
  sumar(vectorNew) {
    return new Vector(this.X + vectorNew.X, this.Y + vectorNew.Y);
  }
}

export const testVector = {
  test() {
    const vector1 = new Vector('1', 2);
    const vector2 = new Vector(3, '4');
    console.log('vector1;', vector1);
    console.log('vector2:', vector2);
    console.log('vector1.sumar(vector2):', vector1.sumar(vector2));
    console.log(new Vector(3, 2).sumar(new Vector(2, 3)));
  },
};
