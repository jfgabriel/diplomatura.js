document.getElementById('app').innerHTML = 'Hello World!';
renderTable();


  function renderTable(){
    const MOUNTAINS = [
        { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
        { name: 'Everest', height: 8848, place: 'Nepal' },
        { name: 'Mount Fuji', height: 3776, place: 'Japan' },
        { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
        { name: 'Denali', height: 6168, place: 'United States' },
        { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
        { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
      ];
      /*let template=`
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Place</th>
                        </tr>

                    </thead>
                    <tbody>
                        ${}
                    </tbody>
                    
                </table>
         `;*/
         let tabla=document.createElement("table");
         let thr = document.createElement('tr');
         //Name
         let thName=document.createElement('th');
         thName.appendChild(document.createTextNode("Name"));
         //Height
         let thHeight=document.createElement('th');
         thHeight.appendChild(document.createTextNode("Height"));
         //Place
         let thPlace=document.createElement('th');
         thPlace.appendChild(document.createTextNode("Place"));
         thr.appendChild(thName);
         thr.appendChild(thHeight);
         thr.appendChild(thPlace);
         tabla.appendChild(thr);

         //body
         
         MOUNTAINS.forEach((element=>{
             let trBody=document.createElement("tr");
             let tdName=document.createElement("td");
             let tdHeight=document.createElement("td");
             let tdPlace=document.createElement("td");
             tdName.appendChild(document.createTextNode(element.name));
             tdHeight.appendChild(document.createTextNode(element.height));
             tdPlace.appendChild(document.createTextNode(element.place));
             trBody.appendChild(tdName);
             trBody.appendChild(tdHeight);
             trBody.appendChild(tdPlace);
             tabla.appendChild(trBody);      

         }));
         document.querySelector("#app").appendChild(tabla);
         



  }
