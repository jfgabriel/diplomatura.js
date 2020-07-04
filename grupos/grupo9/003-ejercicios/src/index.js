import{Collection}from './1.collection';
import{Vector}from './2.Vector';
import {delay1,delay2,run,run2} from './3.Delay';
import {dataFetch} from './4.api';
import {dataFetchAwait} from './5.api-Async_Await';
import {run_Delay} from './6.Delay'



index();




export function index() {
    
    try {
        console.log("entro al index");
        
        ej1() 

        setTimeout(() => {ej2() }, 2000);
   
        setTimeout(() => {ej3()}, 3000);
       
       setTimeout(() => {ej4() }, 7000);
    
       setTimeout(() => {ej5() },9000);    
     
       setTimeout(() => {ej6() }, 11000);
        
    }
        catch(err)
        {console.log('Ha ocurrido un error:',err);}
        
    };
    


function  ej1 (){ 
//1 Collection
console.log("------------------------------------------------------\n \t Ejercicios 1 Collection\n------------------------------------------------------");
let c=new Collection();
console.log("constructor vacio: ",c);
c=new Collection([1,2,3,4]);
console.log("constructor con lista como parametro: ",c);
c.add(5);
console.log("agrego elemento 5: ",c);
c.delete(3);
console.log("borro elemento 3: ",c);
console.log("la lista tiene el elem 2? : ",c.has(2));
 

};


// //2 Vector
 

function  ej2(){

    console.log("------------------------------------------------------\n \t Ejercicios 2 Vector\n------------------------------------------------------");
    let v=new Vector(3,2);
    console.log("constructor vector ",v);
    console.log("Suma vector (1,2)+(2,3) ");
    
    console.log(new Vector(1, 2).sumar(new Vector(2,3)));//new Vector(2,3)
     
}

 
// // // 3 Delay
// // Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.

const ej3=()=>{
    console.log("------------------------------------------------------\n \t Ejercicios 3 Delay\n------------------------------------------------------");
    console.log("Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.")
    console.log("mira como imprimo");
    delay1();
    console.log("Crear una función `delay` que tome dos parámetros `mensaje` y `milisegundos` y muestre un mensaje después del tiempo indicado");
    delay2("mesajito para cele",4000); 
    console.log("Crear una función `run` con el siguiente código...Luego invocarla con `run()`. ¿Cuál es el resultado?");
    run();
    console.log("Modificar nuestra función `run` con el siguiente código. Ejecutarla y observar el resultado");
    run2();
    
} 

function  ej4  (){

//Ejercicio 4
console.log("------------------------------------------------------\n \t Ejercicio 4\n------------------------------------------------------");
dataFetch.getUser();
};


function ej5 () 
{
//Ejercicio 5
console.log("------------------------------------------------------\n \t Ejercicio 5\n------------------------------------------------------");
dataFetchAwait.getUser();
};



// // //  Ejercicio 6
const ej6=()=>{
    console.log("------------------------------------------------------\n \t Salida Ejercicio 6.\n------------------------------------------------------");
    run_Delay() 
    
}
 

