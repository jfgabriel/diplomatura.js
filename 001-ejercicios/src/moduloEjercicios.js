import basededatos, { database } from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {number} alumnoId el id del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  // console.log(basededatos.alumnos);

  let id = idDeAlumno(nombreAlumno); //Obtengo el id del alumno
  if(id){
    let materias=[];
    let calificaciones = basededatos.calificaciones;
    for(let i=0;i<calificaciones.length;i++){
      if((calificaciones[i].nota >= 4)&&(calificaciones[i].alumno===id)){
        let salida = objetoMateria(calificaciones[i].materia);
        materias.push(salida);
      }
    }
    return materias;
  }
};

//Obtengo un alumno ingresando un nombre de alumno. Si no existe devuelve undefined
const idDeAlumno = (nombreAlumno) => {
  const resultado = basededatos.alumnos.find(alumno => alumno.nombre === nombreAlumno);
  return resultado.id;
}

//Obtengo una materia ingresando un id de materia
const objetoMateria = (idMateria) => {
  const resultado = basededatos.materias.find(materia => materia.id === idMateria);
  return resultado;
}


/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  //return {};
  let salida = {};
  let universidad = objetoUniversidad(nombreUniversidad)
  if(universidad){
    let materias = objetosMaterias(universidad.id);
    let profesores = profesoresMateria(materias);
    let alumnos = alumnosMateria(materias);
    salida = {universidad, materias, profesores, alumnos};
  }
  return salida;
};


//Obtengo la universidad ingresando un nombre. Si no existe devuelve undefined
const objetoUniversidad = (nombreUniversidad) => {
  const resultado = basededatos.universidades.find(universidad => universidad.nombre === nombreUniversidad);
  return resultado;
}

//Obtengo las materias ingresando un id de universidad
const objetosMaterias = (idUniversidad) => {
  const resultado = basededatos.materias.filter(materia => materia.universidad === idUniversidad);
  return resultado;
}

//Obtengo el profesor ingresando un id. Si no existe devuelve undefined
const objetoProfesor = (idProfesor) => {
  const resultado = basededatos.profesores.find(profesor => profesor.id === idProfesor);
  return resultado;
}


//Obtengo los profesores ingresando un arreglo de materias
const profesoresMateria = (materias) =>{
  let contador = materias.length;
  let salida=[];
  for(let i=0; i<contador;i++){
    let profesores = materias[i].profesores;
    let contador2 = profesores.length;
    for(let j=0; j<contador2;j++){
        if(!salida.includes(objetoProfesor(profesores[j]))){//para no ingresar repetidos
         salida.push(objetoProfesor(profesores[j]));
        }
    }
  }
  return salida;
}

//Obtengo los alumnos ingresando un arreglo de materias
const alumnosMateria = (materias) =>{
  let calificaciones = basededatos.calificaciones;
  let salida=[];
  for(let i=0; i<materias.length;i++){
    for(let j=0; j<calificaciones.length;j++){
     if(materias[i].id === calificaciones[j].materia){
      if(!salida.includes(objetoAlumno(calificaciones[j].alumno))){
       salida.push(objetoAlumno(calificaciones[j].alumno));
      }
     }
    }
  }
  return salida;
}

//Obtengo el alumno ingresando un id. Si no existe devuelve undefined
const objetoAlumno = (idAlumno) => {
  const resultado = basededatos.alumnos
  .find(alumno => alumno.id === idAlumno);
  return resultado;
}


// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
export const promedioDeEdad = () => {
//   return [];
    let alumnos = basededatos.alumnos;
    let cantidad = 0;
    for(let i=0;i<alumnos.length;i++){
      cantidad = cantidad + alumnos[i].edad;
    }
    return [cantidad/alumnos.length];
 };

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
 export const alumnosConPromedioMayorA = (promedio) => {
//   return [];
    const alumnosPromedio = basededatos.alumnos
    .filter(alumno => promedioAlumno(alumno.id) > promedio);
    return alumnosPromedio;
 };

 const promedioAlumno = (idAlumno) => {
  const getNotas = basededatos.calificaciones
  .filter(alumno => alumno.alumno===idAlumno);
  let contador=0;
  for(let i=0; i<getNotas.length;i++){
     contador = contador + getNotas[i].nota;
  }
  return contador/getNotas.length;
}
 
 

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
 export const materiasSinAlumnosAnotados = () => {
    let salida = [];
    let materias = basededatos.materias;
    for(let i=0; i<materias.length;i++){
      let verifica = basededatos.calificaciones
      .find(calificacion => calificacion.materia===materias[i].id);
      if(!verifica){
        salida.push(materias[i]);
      }
    }
    return salida;
 };

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
 export const promedioDeEdadByUniversidadId = (universidadId) => {
//   return [];
  let salida = [];
  //Obtengo todas las materias de una universidad
  let materias = basededatos.materias
  .filter(materia=>materia.universidad===universidadId);
  let calificaciones = basededatos.calificaciones;

  for(let i=0; i<materias.length;i++){
    let idMateria = materias[i].id;
    //Obtengo todas las calificaciones por materia
    let calif = calificaciones
    .filter(calificacion=>calificacion.materia === idMateria);
    for(let y=0; y<calif.length;y++){
      if(!salida.includes(calif[y].alumno)){//Para no insertar repetidos
        salida.push(calif[y].alumno); //inserto los id de los alumnos
      }
    }
  }
  let promedio = promedios(salida);
  return promedio;
 };

//Ingreso un array con id de alumnos no repetidos y le calculo el promedio
 const promedios = (iDalumnos) => {
  let contador=0;
  for(let i=0; i<iDalumnos.length;i++){
     let alumno = basededatos.alumnos.find(alumno=>alumno.id===iDalumnos[i]).edad;
     contador = contador + alumno
  }
  return contador/iDalumnos.length
}

 