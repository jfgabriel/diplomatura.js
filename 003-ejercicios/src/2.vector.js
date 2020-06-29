/*
## 2. Vector (_TAREA PARA EL HOGAR_)

Escribir una clase Vector que represente un espacio de dos dimensiones x e y. Esta clase debe:

- Poder construirse desde dos valores `x` e `y`
- Debe tener dos getters para obtener esos valores
- Debe tener un método `sumar` que tome un vector por parámetro y devuelva _un nuevo vector_ sumando los valores de x e y de ambos vectores

  Por ejemplo:

  ```
  console.log(new Vector(1, 2).sumar(new Vector(2, 3)));

  // → Vector{x: 3, y: 5}
*/
export class Vector {
    constructor(x,y) {
      this.x = x;
      this.y = y;
    }
    print() {
      console.log(`Valores del vector ${this.x} ${this.y}`);
    }
    getx(){
      return this.x;
    }
    gety(){
      return this.y;
    }
    sumar(vector){
      let salida = new Vector(vector.getx()+this.x, vector.gety()+this.y);
      return salida;
    }
}