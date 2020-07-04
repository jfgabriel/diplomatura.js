

export async function run_Delay() {
    
try {
    console.log(1);
    let mostrar1 = await delay(3000)
    console.log(mostrar1);

    console.log(2);
   let mostrar2 =  await delay(2000)
   console.log(mostrar2);

    console.log(3)
    let mostrar3 = await delay(1000)
    console.log(mostrar3);
}
    catch(err)
    {console.log('Ha ocurrido un error:',err);}
    
};

const contadorMensajes= [0] ;

const delay = (demoraMinima)=>{

    return new Promise( (resolve)=> {
        setTimeout(() =>resolve(salidaDelay()),demoraMinima);
    });  
};


const salidaDelay= ()=>{    
    let mensaje ='Terminó '+(contadorMensajes[0]+1);    
    contadorMensajes[0]+=1;    

    return mensaje;
} 