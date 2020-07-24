document.getElementById('app').innerHTML = 'Hello World!';
const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

document.getElementById('app').innerHTML += '<table> <tr>  <th>name</th>  <th>height</th>   <th>place</th>  </tr>';
for (let i = 0; i < MOUNTAINS.length; i++) {
    document.getElementById('app').innerHTML += '<tr>';
    document.getElementById('app').innerHTML += '<td>'+ MOUNTAINS[i].name +'</td>';
    document.getElementById('app').innerHTML += '<td>'+ MOUNTAINS[i].height +'</td>';
    document.getElementById('app').innerHTML += '<td>'+ MOUNTAINS[i].place +'</td>';
    document.getElementById('app').innerHTML = '</tr>';
}
document.getElementById('app').innerHTML = '</table>';
