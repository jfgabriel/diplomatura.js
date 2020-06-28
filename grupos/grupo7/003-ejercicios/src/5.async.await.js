import fetch from 'node-fetch';

async function getRemoteData() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    let data = await response.json()
    let ret = [];
    data.map(el => {
        ret.push({user: el.name, city: el.address.city});
    });
    console.log(ret)
}

export default getRemoteData;