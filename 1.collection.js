'use strict'

export class Collection {



    constructor(lista = []) {

        this.lista = lista;
    }


    add(elem) {

        this.lista.push(elem);

    }

    delete(elem) {

        return this.lista.filter(m => m !== elem);
    }

    has(elem) {

        return this.lista.includes(elem);
    }


}
