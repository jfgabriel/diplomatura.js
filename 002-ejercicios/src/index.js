// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './basededatos';
import { helpers } from './helpers';

//Ejemplos de que funcionan los metodos del helpers
//console.log(helpers.getUniversidadById(1));
//console.log(helpers.getProfesorById(1));
//console.log(helpers.getMateriaById(1));

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla

//console.log(helpers.getMaxId('profesores'));

//8) Importar helpers desde su propio módulo
//import { helpers } from './';

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper

//1 forma
const insertarProvincia = (nombreProvincia) => {
    let idNuevo = helpers.getMaxId('provincias')+1;
    database.provincias.push({id: idNuevo, nombre: nombreProvincia});
    return idNuevo;
  }
//console.log(insertarProvincia('Buenos Aires'));

//2 forma
function addItemTabla(itemNombre, tabla){
    let idNuevo = helpers.getMaxId(tabla)+1;
    database[tabla].push({id:idNuevo, nombre:itemNombre});
    return idNuevo;
  }
//console.log(addItemTabla('Buenos Aires', 'provincias'));



// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres

const infoMateria = (idMateria) => {
    let materia = helpers.getMateriaById(idMateria);
    let idUniversidad = materia.universidad;
    let profesores = materia.profesores.map(function(item){
         return helpers.getProfesorById(item);
    });
    return {idMateria, idUniversidad, profesores}
}
//console.log(infoMateria(1));



// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...

//devuelve las calificaciones por alumno
const calificacionesAlumnos = () => {
    let salida = database.alumnos.
    map(function (item){
        let calificaciones = database.calificaciones
        .filter(alumno => alumno.alumno === item.id);
        return calificaciones;
    }).filter(alumno => alumno != ''); //hay un alumno que no tiene calificaciones
    return salida;
}

const informacionAlumnos = () => {
    let calificaciones = calificacionesAlumnos();
    console.log('NOTAS DE ALUMNOS');
    console.log('-------------------------');
    for(let i=0; i<calificaciones.length;i++){
        console.log(helpers.getAlumnoById(calificaciones[i][0].alumno).nombre.toUpperCase());
        for(let y=0; y<calificaciones[i].length;y++){
            console.log(helpers
                .getMateriaById(calificaciones[i][y].materia).nombre, calificaciones[i][y].nota);
            }
        console.log('-------------------------'); 
    }
}
//console.log(informacionAlumnos());



// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas


const guardarCalificacion = (nombreAlumno, nombreMateria, nota) => {

 let alumno = obtenerObjeto(nombreAlumno, 'alumnos');
 let materia = obtenerObjeto(nombreMateria, 'materias');

 if((alumno)&&(materia)){
    let idAlumno = alumno.id;
    let idMateria = materia.id;
    database['calificaciones']
    .push({alumno:idAlumno, materia:idMateria, nota:nota});
 }
 else if (alumno){ //no existe la tabla materia
    let idMateria = addItemTabla(nombreMateria, 'materias');//creo la materia
    let idAlumno = alumno.id;
    //inserto la calificacion
    database['calificaciones'].push({alumno:idAlumno, materia:idMateria, nota:nota});
 } 
 else{ //No existe alumno ni materia
     let idAlumno = addItemTabla(nombreAlumno, 'alumnos');//creo el alumno
     let idMateria = addItemTabla(nombreMateria, 'materias');//creo la materia
     //inserto la calificacion
     database['calificaciones'].push({alumno:idAlumno, materia:idMateria, nota:nota});
 }
}

//Ingresando un nombre y tabla, devuelve el id de ese objeto
const obtenerObjeto = (nombre, tabla) => {
    const resultado = database[tabla].find(item => item.nombre === nombre);
    return resultado;
}

//guardarCalificacion('Rigoberto Manchuu', 'Ciencias Socialess', 100);
