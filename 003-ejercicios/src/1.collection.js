/*
1. Collection

Escribir una clase Collection que representa una colección de elementos. Esta clase debe:

- Poder construirse o vacía (sin elementos) o con una lista inicial de elemenetos
- Debe tener un método `add` para poder agregar un elemento
- Debe tener un método `delete` para poder eliminar un elemento
- Debe tener un método `has` para poder determinar un elemento existe en la colección
*/

export class Collection{
    constructor(lista = []){
        this.lista = lista;
    }
    add(elemento){
        if(!this.has(elemento)){ //Si no existe el elemento
            this.lista.push(elemento);
        }
    }
    delete(elemento){
        let posicion = this.lista.indexOf(elemento); //-1 si no existe
        if(posicion !== -1){
            let cantidad = 1;
            this.lista.splice(posicion, cantidad);
        }
       //return posicion;
    }
    has(elemento){
        return (this.lista.indexOf(elemento)!== -1);
    }
    has2(elemento){
        return (this.lista.includes(elemento));
    }
}