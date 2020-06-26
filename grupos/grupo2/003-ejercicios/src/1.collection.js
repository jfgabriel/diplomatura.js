export class Collection {
    //constructor 
    constructor (elementos = []) {
        this.elementos = elementos;
    }

    //sumar elemento 
    add(element) {
        if (!this.has(element))
            this.elementos.push(element);
    }

    //eliminar elemento 
    delete(element) {
        let index = this.elementos.indexOf(element);
        if (index >= 0)
            this.elementos.splice(index, 1);
    }

    //eliminar elemento 
    has(element) {
        return this.elementos.indexOf(element) !== -1;
    }
}

// module.exports.Collection = Collection;