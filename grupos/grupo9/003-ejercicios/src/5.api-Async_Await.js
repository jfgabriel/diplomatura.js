import fetch from 'node-fetch';

// fetch('..... aquí va la url')
// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })

export const dataFetchAwait = {
    
    getUser : async function (){
        try {
            
            const data = await fetch('https://jsonplaceholder.typicode.com/users');
            const jsonData = await parseJson(data);
            dataUser(jsonData);               
        } catch (error) {
            console.error(error);   
        }
    }
}

const parseJson =  (data) => data.json();
const dataUser =  (jsonData) => {
    console.log( jsonData );
    console.log('\n');
    for(let elem of jsonData){
        console.log('Nombre: '+elem.name);
        console.log('Ciudad: ' +elem.address.city);
        console.log('\n');
    }
}