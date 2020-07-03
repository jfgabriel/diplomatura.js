export class Collection {
    
    constructor(lista=[]) {
        this.elements = lista;
    }

    add(obj) {
        this.elements.push(obj);
    }
    has(obj) {
        return this.elements.indexOf(obj) >=0;
    }
    delete(obj) {
        let pos = this.elements.indexOf(obj);
        if (pos >= 0) {
            this.elements.splice(pos,1);
            return true;
        } else {
            return false;
        }
    }


}