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