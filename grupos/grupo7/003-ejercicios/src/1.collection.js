// ## 1. Collection
//
// Escribir una clase Collection que representa una colección de elementos. Esta clase debe:
//
// - Poder construirse o vacía (sin elementos) o con una lista inicial de elemenetos
// - Debe tener un método `add` para poder agregar un elemento
// - Debe tener un método `delete` para poder eliminar un elemento
// - Debe tener un método `has` para poder determinar un elemento existe en la colección
//
//////////////////////////////////////////////////////////////////////////////////////////////

class Collection {
    constructor(lista = []) {
        this.elements = lista;
    }
    add(e) { 
        return this.elements.push(e);
    }
    has(e) { 
        return this.elements.includes(e);
    }
    delete(e) {
        const pos = this.elements.indexOf(e);
        if(pos >= 0) {
            this.elements.splice(pos, 1);
            return true
        }
        return false;
    }
}

export default Collection;
