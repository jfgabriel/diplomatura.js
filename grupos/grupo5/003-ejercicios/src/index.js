"use strict";

var Colecciones = _interopRequireWildcard(require("./1.collection"));

var Vectores = _interopRequireWildcard(require("./2.vector"));

var _3 = require("./3.delayCallbacks");

var _4 = require("./4.api");

var _5 = require("./5.asycAwait");

var _6 = require("./6.delay");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
(0, _5.getRemoteData)(); //**************************************
//**********Prueba para 6.delay*******************
//delayNuevo(2).then(() => console.log('Mensaje'));
//runNuevo();
//************************************************