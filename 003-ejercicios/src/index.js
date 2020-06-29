import * as Colecciones from './1.collection';
import * as Vectores from './2.vector';
import {delay, run, run2} from './3.delayCallbacks';
import {datos1, datos2, datos3} from './4.api';
import {getRemoteData} from './5.asycAwait';
import {delayNuevo, runNuevo} from './6.delay';


/*
//***********Prueba para 1.collection*****************
let lista = [1,2];
const a = new Colecciones.Collection(lista);
console.log(a);
console.log('Agregando un valor');
a.add(3);
console.log('Nueva coleccion',a);
console.log('Eliminando un valor');
a.delete(1);
console.log('Nueva coleccion',a);
if(a.has(4)){
   console.log('Existe el valor en la coleccion');
}
else{
   console.log('No existe el valor en la coleccion');
}

if(a.has2(2)){
   console.log('Existe el valor en la coleccion');
}
else{
   console.log('No existe el valor en la coleccion');
}
*/
//*****************************************************


//*******Prueba para 2.vector*******
/*
const v = new Vectores.Vector(1, 2);
v.print();
console.log(v.getx());
console.log(v.gety());

const v2 = new Vectores.Vector(2,3);
console.log(v.sumar(v2));
*/
//*********************************



//*****Prueba para 3.delayCallbacks*****
/*
console.log('Primer mensaje');
setTimeout(function(){
    console.log('Mensaje de espera');
}, 4000);
console.log('Ultimo mensaje');
*/

//delay('Hola mundo!', 3000);
//run();
//run2();
//**************************************




//****Prueba para 4.api****
//datos1;
//datos2;
//datos3;
//*************************


//*********Prueba para 5.asycAwait******
getRemoteData();
//**************************************



//**********Prueba para 6.delay*******************
//delayNuevo(2).then(() => console.log('Mensaje'));
//runNuevo();
//************************************************