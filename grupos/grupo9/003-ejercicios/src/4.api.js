import fetch from 'node-fetch';

// fetch('..... aquí va la url')
// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })

export const dataFetch = {
    getUser : function (){
                 fetch('https://jsonplaceholder.typicode.com/users')
                .then( data => data.json())
                .then( jsonData => {
                    console.log( jsonData );
                    console.log('\n');
                    for(let elem of jsonData){
                        console.log('Nombre: '+elem.name);
                        console.log('Ciudad: ' +elem.address.city);
                        console.log('\n');
                    }
                });
                }
}

