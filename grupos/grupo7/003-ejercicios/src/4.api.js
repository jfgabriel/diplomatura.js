import fetch from 'node-fetch';
// https://jsonplaceholder.typicode.com/users
// fetch('..... aquí va la url')
// recordar que fetch devuelve una promise, entonces puede hacer fetch(....).then(resultado => {.... })

export default function four_api() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(res => {
            let ret = [];
            res.map(el => {
                ret.push({user: el.name, city: el.address.city});
            })
            return ret;
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
}