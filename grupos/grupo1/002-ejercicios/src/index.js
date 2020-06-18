// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './basededatos';

// 2) Implementar una función que obtenga una universidad por Id
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados

// const getById = (table, id) => database[table].find(item => item.id === id);
// const getById =  (table) => (id) => database[table].find(item => item.id === id);

// const getUniversidadById = (id) => database.universidades.find(item => item.id === id);
// const getUniversidadById = getById('universidades');

// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');

// let c = getUniversidadById(1);
// let d = getById('universidades')(2);

// console.log(c);
// console.log(d);

// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 3) Implementar una función que obtenga un profesor por Id
// const getProfesorbyId = getById('profesores');

// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');

// let c = getProfesorbyId(1);
// console.log(c);

// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 4) Implementar una función que obtenga una materia por Id
// const getMateriabyId = getById('materias');

// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');

// let c = getMateriabyId(5);
// console.log(c);

// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos
// let helpers = {
//     getById,
//     getUniversidadById,
//     getProfesorbyId,
//     getMateriabyId,
// }
// 
// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');

// let c = helpers.getMateriabyId(5);
// console.log(c);

// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js
// Ver archivo helpers

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
// Ver archivo helpers
// const getLastId = (table) =>  Math.max(...database[table].map(item => item.id)) ;
// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');

// // let c = getLastId('universidades');


// // let c =  Math.max(...database['materias'].map(item => item.id));

// // let c =  database['materias']['id'];

// // console.log(c);
// // let c = database['materias' ]['id'];

// console.log(getLastId('profesores'));  
// // console.log(Math.max(...database['materias'].id));
// // console.log(Math.max(...database['materias'].id));

// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 8) Importar helpers desde su propio módulo
import { helpers } from './helpers';
// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');
// console.log(helpers.getLastId('profesores')); 
// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helpert
const instertNewProvice = (newProvince) => {
    
    database.provincias.push({
        id: helpers.getLastId('provincias')+1,
        nombre: newProvince,
    })
    // console.log(database.provincias);

    return  helpers.getLastId('provincias');
}


// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');
// // console.log(helpers.getLastId('provincias')); 
// // console.log(database.provincias);
// console.log(instertNewProvice('Mendoza'));
// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug

// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres
// const getUniandProfFromMateria = (idMateria) =>  tabla => database['Materia'].id
// .map(item => item.id) ;/ .map(item => item.id) ;

// function getUniandProfFromMateria(idMateria){
//     let selectedMateria = helpers.getMateriabyId(idMateria);

//     console.log('---------------------------------');
//     console.log(selectedMateria);
//     console.log('---------------------------------');
//     let profesorName = helpers.getProfesorbyId(selectedMateria.profesores);
//     console.log(profesorName);
//     console.log('---------------------------------');
//     return
// }

const getUniandProfFromMateria = (id) => {

    let materia = helpers.getMateriabyId(id);

    let nombre_universidad = helpers.getUniversidadById(materia.universidad).nombre;

    let profesores = materia.profesores.map((profesor)=> helpers.getProfesorbyId(profesor).nombre);

    materia.universidad = nombre_universidad;
    materia.profesores = profesores;


    return materia
}

// -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');
// console.log(getUniandProfFromMateria(4));
// // console.log(;

// console.log('---------------------------------');
// console.log('---------------------------------');
// -------------------------------------------------------- end debug


// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// // ...
const notasAlumnos = () => {
    console.log("NOTAS DE ALUMNOS");
    console.log("----------------");

    let alumnos = database.alumnos;
    
    alumnos.forEach(alumno => {
        
        console.log(alumno.nombre.toUpperCase());
        
        let notas = database.calificaciones;

            notas.forEach(nota => {
                if (nota.alumno === alumno.id) {
                    
                    console.log(helpers.getMateriabyId(nota.materia).nombre + ": " + nota.nota);
            
                }
            });

            console.log("....");
        }
    );

}




// // -------------------------------------------------------- line for debug
// console.log('---------------------------------');
// console.log('---------------------------------');

// notasAlumnos();


// console.log('---------------------------------');
// console.log('---------------------------------');
// // -------------------------------------------------------- end debug



// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas


function insterGrade(nombreAlumno, nombreMateria, nota){
    let alumno = database.alumnos.find(alumno => alumno.nombre===nombreAlumno);
    let materia = database.materias.find(materia => materia.nombre===nombreMateria);

    if(!alumno){
        let id = helpers.getLastId("alumnos");

        let objetoAlumno = {
            id: id+1,
            nombre: nombreAlumno,
        };
        database.alumnos.push(objetoAlumno);

        alumno = objetoAlumno;
    }

    if(!materia){
        let id = helpers.getLastId("materias");

        let objetoMateria = {
            id: id+1,
            nombre: nombreMateria,
        };
        database.materias.push(objetoMateria);
        materia = objetoMateria;
    }
    let nuevaNota = {
        alumno:  alumno.id,
        materia: materia.id,
        nota: nota,
    }
    database.calificaciones.push(nuevaNota);
    
    return
}



// -------------------------------------------------------- line for debug
console.log('---------------------------------');
console.log('---------------------------------');

insterGrade("Gachi Pachi", "Analisis 1", 7);
insterGrade("Pablo Tomafi", "Analisis 1", 5);
insterGrade("Pablo Tomafi", "Diseño de indumentaria", 8);
insterGrade("Coqui Argento", "Programación orientada a objetos", 6);
console.log('---------------------------------');
console.log('---------------------------------');
notasAlumnos();

console.log('---------------------------------');
console.log('---------------------------------');
// -------------------------------------------------------- end debug
// const insertarNotas = (nombreAlumno, nombreMateria, nota) => {

// 	let alumno = database.alumnos.find(alumno => alumno.nombre === nombreAlumno);
// 	let materia = database.materias.find(materia => materia.nombre === nombreMateria);
//

// 	let nuevoAlumno = {};
// 	if (!alumno) {
// 		let ultimoIdAlumno = helpers.obtenerByIdMaxTabla('alumnos');

// 		nuevoAlumno = {
// 			id: ultimoIdAlumno+1,
// 			nombre: nombreAlumno,
// 			//edad: 0,
// 			//provincia: 0,
// 		};

// 		database.alumnos.push(nuevoAlumno);
// 	}

// 	let nuevaMateria = {};
// 	if (!materia) {
// 		let ultimoIdMateria = helpers.obtenerByIdMaxTabla('materias');

// 		nuevaMateria = {
// 			id: ultimoIdMateria+1,
// 			nombre: nombreMateria,
// 			//profesores: [],
// 			//universidad: 0,
// 		};

// 		database.materias.push(nuevaMateria);
// 	}

// 	let nuevaIdMateria = nuevaMateria.id;

// 	let nuevaCalificacion = {
// 		alumno: (alumno ? alumno.id : nuevoAlumno.id),
// 		materia:  (materia ? materia.id : nuevaMateria.id),
// 		nota: nota
// 	};

// 	database.calificaciones.push(nuevaCalificacion)

// 	return database.calificaciones;

// }
