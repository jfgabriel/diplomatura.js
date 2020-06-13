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
 * @param {String} nombreAlumno el id del alumno
 */

function getMateriasAprobadas(calificaciones) {
  const materias=basededatos.materias;
  let materiasCursadas=[];

  for (let i=0; i<calificaciones.length; i++) {
    let calificacion=calificaciones[i];
    
    for (let j=0; j<materias.length; j++) {
      let materia=materias[j];

      if (materia.id===calificacion.materia)
        materiasCursadas.push(materia);
    }
  }
  return materiasCursadas;
}

function wasApproved(calificacion) {
  return calificacion>=4;
}

function getCalificaciones(alumnoId){
  const calificaciones=basededatos.calificaciones;
  let materiasAprobadas=[];
  for (let i=0; i<calificaciones.length; i++) {
    if (calificaciones[i].alumno===alumnoId) {
      if (wasApproved(calificaciones[i].nota))
        materiasAprobadas.push(calificaciones[i]);
      }
  }
  return materiasAprobadas;
}

export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  const alumnos=basededatos.alumnos;
  let alumno;

  for (let i = 0; i<alumnos.length; i++) {
    if (alumnos[i].nombre.indexOf(nombreAlumno)>-1) {
      alumno=alumnos[i];
      break;
    }
  }
  if (!alumno) return undefined;

  const calificaciones=getCalificaciones(alumno.id);
  return getMateriasAprobadas(calificaciones);
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

/*function innerJoin(elementos,idsArray){
  const arreglo=[];

  elementos.forEach((elemento)=>{
    if (idsArray.indexOf(elemento.id)>-1)
      arreglo.push(elemento);
  })
  return arreglo;
}

export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  const universidades=basededatos.universidades;
  let universidad,
      infoUniversidad={};
  for (let i=0; i<universidades.length; i++) {
    if (universidades[i].nombre.indexOf(nombreUniversidad)>-1) {
      universidad=universidades[i];
      break;
    }
  }
  if (!universidad) 
    return undefined;
  else infoUniversidad=universidad;

  //Cargar las  materias según el Id de la universidad
  infoUniversidad.materias=[];
  for (let materia in basededatos.materias) {
    if (basededatos.materias[materia].universidad===universidad.id)
      infoUniversidad.materias.push(basededatos.materias[materia]);
  }
  
  //------ Profesores -------
  //
  //Obtener los id de los profesores en base a todas las materias ya obtenidas
  let profesoresId=[];
  for (let materia in infoUniversidad.materias) {
    let materiaProfesoresId=infoUniversidad.materias[materia].profesores;

    for (let i=0; i<materiaProfesoresId.length; i++) {
      let idActual=materiaProfesoresId[i];
      //Filtrar para evitar que se agregue más de una vez cada profesor
      if (profesoresId.indexOf(idActual)===-1)
        profesoresId.push(idActual);
    }
  }  
  //"Unir" las tabla profesores con los ids de profesores
  infoUniversidad.profesores=innerJoin(basededatos.profesores,profesoresId);
  
  //------ Alumnos -------
  //Trae las calificaciones donde estén las materias obtenidas, luego los alumnos calificados
  //
  //Obtener los id de los las materias en base a 
  const materiasId = infoUniversidad.materias.map(materia=>materia.id);

  const alumnosId=[];
  for (var i in basededatos.calificaciones) {
    let calificacion = basededatos.calificaciones[i];

    if (materiasId.indexOf(calificacion.materia)>-1 && alumnosId.indexOf(calificacion.alumno)===-1) {
      alumnosId.push(calificacion.alumno);
    }
  }

  infoUniversidad.alumnos=innerJoin(basededatos.alumnos,alumnosId);
  
  return infoUniversidad;
};*/


///////////////////

// Con operador urinario y otras funciones

function innerJoin(elementos,idsArray){
  return elementos.filter(elemento=>idsArray.includes(elemento.id));
}

export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  // Decorador urinario 
  const urinary = fn => {
    return (...args) => fn(args[0]);
  }

  const indexOf=(elemento)=>(needle)=>{
    console.log('IndexOf---------')
    console.log(elemento)
    console.log(needle)
    console.log('EndIndexOf---------')
    return elemento.indexOf(needle);
  }
  const obtenerValor=(elemento)=>(valor)=>(patron)=>{
    console.log('Obtener valor---------')
    console.log(elemento)
    console.log(valor)
    console.log(elemento[valor])
    console.log(patron)
    console.log('EndObtener valor---------')
    return !patron?
            elemento[valor]
           :
            patron(elemento[valor]);
  }
  const obtenerElemento=(tabla)=>(elemento)=>{
    return tabla.find(x=>x[elemento]==);
  };

  const buscarUniversidad=obtenerElemento=>obtenerValor;

  let infoUniversidad=buscarUniversidad(basededatos.universidades)('nombre')(nombreUniversidad)(indexOf);
  console.log('test '+JSON.stringify(infoUniversidad))
  return

  //let infoUniversidad={};
  const universidad=basededatos.universidades.filter(universidad=>universidad.nombre.indexOf(nombreUniversidad)>-1)[0];
  
  if (!universidad) 
    return undefined;
  else infoUniversidad=universidad;

  infoUniversidad.materias=basededatos.materias.filter((materia)=>materia.universidad===universidad.id);

  const profesores=infoUniversidad.materias
                   .map((materia)=>materia.profesores)
                   .flat()
                   .reduce((filtrado,elem)=>filtrado.includes(elem)?filtrado:[...filtrado,elem],[]);

  infoUniversidad.profesores=innerJoin(basededatos.profesores,profesores);

  const materiasId = infoUniversidad.materias.map((materia)=>materia.id);
  let alumnos    = basededatos.calificaciones
        .filter(calificacion=>materiasId.includes(calificacion.materia))
        .map(calificacion=>calificacion.alumno)
        .reduce((filtrado,elem)=>filtrado.includes(elem)?filtrado:[...filtrado,elem],[]);

  infoUniversidad.alumnos=innerJoin(basededatos.alumnos,alumnos);
  
  return infoUniversidad;
};


/*

function innerJoin(elementos,idsArray){
  return elementos.filter(elemento=>idsArray.includes(elemento.id));
}

export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  // Decorador urinario 
  const urinary = fn => {
    return (...args) => fn(args[0]);
  }

  const indexOf=(elemento)=>(needle)=>elemento.indexOf(needle);
  const buscarUniversidad=(universidad)=>(elemento)=>(patron)=>(valor)=>patron(universidad[elemento])(valor);

  let infoUniversidad={};
  const universidad=basededatos.universidades.filter(universidad=>universidad.nombre.indexOf(nombreUniversidad)>-1)[0];
  
  if (!universidad) 
    return undefined;
  else infoUniversidad=universidad;

  infoUniversidad.materias=basededatos.materias.filter((materia)=>materia.universidad===universidad.id);

  const profesores=infoUniversidad.materias
                   .map((materia)=>materia.profesores)
                   .flat()
                   .reduce((filtrado,elem)=>filtrado.includes(elem)?filtrado:[...filtrado,elem],[]);

  infoUniversidad.profesores=innerJoin(basededatos.profesores,profesores);

  const materiasId = infoUniversidad.materias.map((materia)=>materia.id);
  let alumnos    = basededatos.calificaciones
        .filter(calificacion=>materiasId.includes(calificacion.materia))
        .map(calificacion=>calificacion.alumno)
        .reduce((filtrado,elem)=>filtrado.includes(elem)?filtrado:[...filtrado,elem],[]);

  infoUniversidad.alumnos=innerJoin(basededatos.alumnos,alumnos);
  
  return infoUniversidad;
};
*********/

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
