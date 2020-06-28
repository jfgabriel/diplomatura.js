//Escribir una clase Vector que represente un espacio de dos dimensiones x e y. Esta clase debe:
//
//- Poder construirse desde dos valores `x` e `y`
//- Debe tener dos getters para obtener esos valores --> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/get
//- Debe tener un método `sumar` que tome un vector por parámetro y devuelva _un nuevo vector_ sumando los valores de x e y de ambos vectores
//
//  Por ejemplo:
//
//  ```
//  console.log(new Vector(1, 2).sumar(new Vector(2, 3)));
//
//  // → Vector{x: 3, y: 5}
//  ```

export class Vector {
  /**
   * Constructor clase vector
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.valorX = x;
    this.valorY = y;
  }

  get x() {
    return this.valorX;
  }
  get y() {
    return this.valorY;
  }
  /**
   * sumar un vector
   * @param {Vector} unVector
   */
  sumar(unVector) {
    const nuevoX = this.x + unVector.x;
    const nuevoY = this.y + unVector.y;
    const nuevoVectorSuma = new Vector(nuevoX, nuevoY);
    return nuevoVectorSuma;
  }
}

export const vectorTest = {
  test() {
    console.log(new Vector(1, 2).sumar(new Vector(2, 3)));
  },
};
