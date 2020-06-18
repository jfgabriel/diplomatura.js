import { database } from './basededatos';
//import { helpers } from './';

// 6) Mover helpers y el todo el c贸digo a un m贸dulo, creando un nuevo archivo helpers.js

// 2) Implementar una funci贸n que obtenga una universidad por Id
// 馃 Tip: pueden ir probando las funciones usando console.log() asegur谩ndose que los resultados sean los esperados
/*
const universidad = (idUniversidad) => {
    const resultado = database.universidades
    .find(universidad => universidad.id === idUniversidad);
    return resultado;
  }
*/

// 3) Implementar una funci贸n que obtenga un profesor por Id
/*
const profesor = (idProfesor) => {
    const resultado = database.profesores.find(profesor => profesor.id === idProfesor);
    return resultado;
}
*/

// 4) Implementar una funci贸n que obtenga una materia por Id
// 馃 Tip: Comparar con la funci贸n del ejercicio (3) y ver si se les ocurre una funci贸n gen茅rica que sirva para cualquier tabla

const getById = (tabla) => function(id) {
    return database[tabla].find((item) => item.id === id);
}

// 5) Crear un objeto 'helpers' que contenga las funciones como m茅todos
const getUniversidadById = getById('universidades');
const getProfesorById = getById('profesores');
const getMateriaById = getById('materias');
const getAlumnoById = getById('alumnos');


//7
const getMaxId = function(tabla){
  let maxId = 0;
  database[tabla].forEach(item => { 
      if(item.id > maxId){ 
          maxId = item.id; 
      }})
  return maxId;
}

//Ingresando un nombre y tabla, devuelve el id de ese objeto
const getObtenerObjeto = (nombre, tabla) => {
  const resultado = database[tabla].find(item => item.nombre === nombre);
  return resultado;
}

//9
const addItemTabla = (itemNombre, tabla) => {
  let idNuevo = helpers.getMaxId(tabla)+1;
  database[tabla].push({id:idNuevo, nombre:itemNombre});
  return idNuevo;
}

const insertarProvincia = (nombreProvincia) => {
  let idNuevo = helpers.getMaxId('provincias')+1;
  database.provincias.push({id: idNuevo, nombre: nombreProvincia});
  return idNuevo;
}


//10
const getInfoMateria = (idMateria) => {
  let materia = helpers.getMateriaById(idMateria);
  let idUniversidad = materia.universidad;
  let profesores = materia.profesores.map(function(item){
       return helpers.getProfesorById(item);
  });
  return {idMateria, idUniversidad, profesores}
}


//11
//devuelve las calificaciones por alumno
const getCalificacionesAlumnos = () => {
  let salida = database.alumnos.
  map(function (item){
      let calificaciones = database.calificaciones
      .filter(alumno => alumno.alumno === item.id);
      return calificaciones;
  }).filter(alumno => alumno != ''); //hay un alumno que no tiene calificaciones
  return salida;
}

const getInformacionAlumnos = () => {
  let calificaciones = getCalificacionesAlumnos();
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


//12
const guardarCalificacion = (nombreAlumno, nombreMateria, nota) => {

  let alumno = helpers.getObtenerObjeto(nombreAlumno, 'alumnos');
  let materia = helpers.getObtenerObjeto(nombreMateria, 'materias');
 
  if((alumno)&&(materia)){
     let idAlumno = alumno.id;
     let idMateria = materia.id;
     database['calificaciones']
     .push({alumno:idAlumno, materia:idMateria, nota:nota});
  }
  else if (alumno){ //no existe la tabla materia
     let idMateria = helpers.addItemTabla(nombreMateria, 'materias');//creo la materia
     let idAlumno = alumno.id;
     //inserto la calificacion
     database['calificaciones'].push({alumno:idAlumno, materia:idMateria, nota:nota});
  } 
  else{ //No existe alumno ni materia
      let idAlumno = helpers.addItemTabla(nombreAlumno, 'alumnos');//creo el alumno
      let idMateria = helpers.addItemTabla(nombreMateria, 'materias');//creo la materia
      //inserto la calificacion
      database['calificaciones'].push({alumno:idAlumno, materia:idMateria, nota:nota});
  }
 }



export const helpers = {getUniversidadById, 
  getProfesorById, getMateriaById, getAlumnoById, 
  getMaxId, getObtenerObjeto, addItemTabla, 
  insertarProvincia, getInfoMateria, getInformacionAlumnos,
  guardarCalificacion};





