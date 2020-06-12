import basededatos from './basededatos';

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
 * @param {nombreAlumno} nombreAlumno
 */



export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  let alumno = findAlumnoByName(nombreAlumno)
  if(!alumno) throw new Error("No se encontro el nombre especificado en la base de datos.")

  let idAlumno = findAlumnoByName(nombreAlumno).id

  let calificaciones = basededatos.calificaciones.filter(findCalificacionWithNotaGreaterThan(idAlumno, 4))
  
  return findMateriasWithSameIdAsIndicatedByCalificaciones(basededatos.materias, calificaciones)

};

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
  return []
  const cant_universidades = basededatos["universidades"].length
  let id_universidad = -1
  let universidad;

  for(let i = 0; i < cant_universidades; i++){
    if(basededatos["universidades"][i].nombre === nombreUniversidad){
        id_universidad = basededatos["universidades"][i].id
        universidad = basededatos["universidades"][i]
        break;
    }
  }


  //busca las materias asociadas a la universidad
  const cant_materias = basededatos["materias"].length
  let materiasDeUniversidad = []
  let profesores = []

  for(let i = 0; i < cant_materias; i++){
    if(basededatos["materias"][i].universidad === id_universidad){
      materiasDeUniversidad.push(basededatos["materias"][i])
      let db_Profesores = basededatos["materias"][i].profesores;
      let cantProfesores = db_Profesores.length
     
      for(let k = 0; k < cantProfesores; k++){
        profesores.push(db_Profesores[k]) // estoy guardando los ids en esta lista
      }
    }
  }
  
  
  let profesoresRetorno = []
  for(let i = 0; i < profesores.length; i++){
    for(let j = 0; j < basededatos["profesores"].length; j++){
      if(basededatos["profesores"][j].id === profesores[i]){
        profesoresRetorno.push(basededatos["profesores"][j])
      }
    }
  }

  
  // materiasUniverisdad = id de las materias
  
  let idalumnos = []

  for(let i = 0; i < materiasDeUniversidad.length; i++){
    for(let j = 0; j < basededatos["calificaciones"].length; j++){
      if(materiasDeUniversidad[i].id === basededatos["calificaciones"][j].alumno){
        idalumnos.push(basededatos["calificaciones"][j].alumno)
        break;
      }
    }
  }

  let alumnos = [];

for(let i = 0; i < basededatos["alumnos"].length; i++){
  for(let j = 0; j < idalumnos.length; j++){
    if(basededatos["alumnos"][i].id === idalumnos[j]){
      alumnos.push(basededatos["alumnos"][i])
    }
  }
}
  //busca los profesores de esas materias
  return {
    id: universidad.id,
    nombre: universidad.nombre,
    direccion: universidad.direccion,
    materias: materiasDeUniversidad,
    profesores: profesoresRetorno,
    alumnos: alumnos
  };
};



/**
 * Dado un nombre se busca el alumno en la base de datos y se devuelve.
 * @param{string} name - Nombre del alumno a buscar.
 * @returns{databasededatos.alumnos} alumno - El alumno buscado.
 */
const findAlumnoByName = (name) =>
  basededatos.alumnos.find((value) =>
     value.nombre === name)


     
/* mismo resultado que findCalificacionWithNotaGreaterThan*/

  const testFunction = (id, nota) => {
  return basededatos.calificaciones.find((value) =>{
    return value.alumno === id && value.nota >= nota
  })
}

const findCalificacionWithNotaGreaterThan = (id, nota) =>{
  return (value) => {
    return value.alumno === id && value.nota >= nota;
  }
}

const findMateriasWithSameIdAsIndicatedByCalificaciones = (materias, calificaciones) => {
  let res = []
  materias.forEach((materia) => {
    return calificaciones.forEach((calificacion) => {
      if(calificacion.materia === materia.id){
        res.push(materia)
      }
    })
  })
  return res;
  }

     




// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
// export const promedioDeEdad = () => {
//   return [];
// };

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
// export const alumnosConPromedioMayorA = (promedio) => {
//   return [];
// };

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
// export const materiasSinAlumnosAnotados = () => {
//   return [];
// };

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
// export const promedioDeEdadByUniversidadId = (universidadId) => {
//   return [];
// };







/*

OLD VERSION

export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
   //const idAlumno = basededatos[]

  // const cantidadAlumnos = basededatos["alumnos"].length
  // let idAlumno = -1;
  // for(let i = 0; i < cantidadAlumnos; i++){
  //   if(basededatos["alumnos"][i].nombre === nombreAlumno){
  //       idAlumno = basededatos["alumnos"][i].id;
  //     break;
  //   }
  // }
  let alumno = findAlumnoByName(nombreAlumno)
  if(!alumno) throw new Error("No se encontro el nombre especificado en la base de datos.")

  let idAlumno = findAlumnoByName(nombreAlumno).id
  let materiasAprobadasPorAlumno = []


  let test = basededatos.calificaciones.filter(findCalificacionWithNotaGreaterThan(idAlumno, 4))
  
  // Obtener materias del alumno si la calificacion fue mayor o igual a nota
  const cant_calificaciones = basededatos["calificaciones"].length
  for(let i = 0; i < cant_calificaciones; i++){
    if(basededatos["calificaciones"][i].alumno === idAlumno && basededatos["calificaciones"][i].nota >= 4){
      materiasAprobadasPorAlumno.push(basededatos["calificaciones"][i].materia)
    }
  }

  let test2 = findMateriasWithSameIdAsIndicatedByCalificaciones(basededatos.materias, test)

  //
  console.log("CALIFICACIONES: ", test)
  const cant_materias = basededatos["materias"].length
  let nombreMateriasAprobadas = []

  for(let i = 0; i < cant_materias; i++){
    for(let j = 0; j < materiasAprobadasPorAlumno.length; j++){
      if(basededatos["materias"][i].id == materiasAprobadasPorAlumno[j]){
        nombreMateriasAprobadas.push(basededatos["materias"][i])
        break;
      }
    }
  }


  
  return test2;
};*/