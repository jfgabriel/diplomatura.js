/*## 1. Collection

Escribir una clase Collection que representa una colección de elementos. Esta clase debe:

- Poder construirse o vacía (sin elementos) o con una lista inicial de elemenetos
- Debe tener un método `add` para poder agregar un elemento
- Debe tener un método `delete` para poder eliminar un elemento
- Debe tener un método `has` para poder determinar un elemento existe en la colección
 */

 export class Collection{
     constructor(listaN){//constructor(listaN=[]) si undefined asigna 
        !listaN?this.lista=[]:this.lista=listaN;//listaN===undefined? if(listaN)
        /* if(!listaN)
            this.listaN=[]
        else
        this.lista=listaN
 */     }
     add(e){
         if(e)this.lista.push(e);}//compruebo si es nulo

     has(e){
        /* let i=this.lista.indexOf(e);
        i===(-1)?false:true; */
        return (this.lista.indexOf(e) !== -1);
    }//comprobar si es nulo
    delete(elem) {
        let pos = this.lista.indexOf(elem);
       // console.log("lista en delet",this.lista)
        if (this.has(elem)) this.lista.splice(pos, 1);
        
    }
 }

 /* delete(elem) {
    const pos = this.lista.indexOf(elem, 0);
    if (!this.has(elem)) return this.lista.splice(pos, 1);
    return;
} */