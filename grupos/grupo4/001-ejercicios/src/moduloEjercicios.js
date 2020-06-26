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
 * @param {string} nombreAlumno el id del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  //console.log(basededatos.alumnos);
  let retorno = [];
  // Primera resolución
  // basededatos.alumnos.forEach( alumno => {
  //   if(alumno.nombre === nombreAlumno)
  //     {
  //       //console.log(alumno);
  //       basededatos.calificaciones.forEach( calificacion => {
  //         if ((calificacion.alumno === alumno.id) && (calificacion.nota >= 4))
  //            {
  //              //console.log(calificacion)
  //              basededatos.materias.forEach( materia => {
  //                if (materia.id === calificacion.materia) 
  //                 //console.log(materia);
  //                 retorno.push(materia)
  //               });
  //            }
  //       });
  //     }
  // });
  // return retorno;


  // Segunda resolución

  // Busco el alumno
  const alumno = basededatos.alumnos.filter(alumno => alumno.nombre === nombreAlumno);
  // Busco las calificaciones aprobadas de ese alumno
  const calificaciones = basededatos.calificaciones.filter(calificacion => (calificacion.alumno === alumno[0].id) && (calificacion.nota >= 4));
  // Por cada materia aprobada busco el objeto completo
  calificaciones.forEach(calificacion => {
    retorno.push(basededatos.materias.find(materia => materia.id === calificacion.materia));
  });
  // Devuelvo el resultado
  return retorno;
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
  // Recolectores de datos
  let materias = [];
  let profesores = [];
  let alumnos = [];
  //Recupero el objeto Universidad
  let universidad = basededatos.universidades.find(univ => univ.nombre === nombreUniversidad);
  // Si no es undefined busco el resto de info
  if (universidad) {
    //Filtro las materias de esa universidad
    materias = basededatos.materias.filter(materia => materia.universidad === universidad.id);
    //Por cada materia busco el resto de la informacion
    materias.forEach(materia => {
      // Busco los profesores
      materia.profesores.forEach(profId => {
        // Por cada profesor encontrado
        let profesorFound = basededatos.profesores.find(prof => prof.id === profId);
        //verifico que no esté ya incluido y lo agrego
        if (!profesores.includes(profesorFound)) {
          profesores.push(profesorFound);
        }
        // Recorro las calificaciones
        basededatos.calificaciones.forEach(calificacion => {
          // por cada Materia encontrada en calificaciones
          if (calificacion.materia === materia.id) {
            // busco el alumno de esa calificacion
            let alumnoXMateria = basededatos.alumnos.find(alumno => alumno.id === calificacion.alumno);
            //verifico que no esté ya incluido y lo agrego
            if (!alumnos.includes(alumnoXMateria)) {
              alumnos.push(alumnoXMateria);
            }
          }
        });
      });
    });
  }
  // presento la información utilizando el operador spread
  return {
    ...universidad,
    materias: materias,
    profesores: profesores,
    alumnos: alumnos
  };
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
export const promedioDeEdad = () => {
  // para sumar las edades
  let partialEdades = 0;
  // recorro el array de alumnos, uso la edad de cada uno e incremento la cantidad
  basededatos.alumnos.forEach(alumno => {
    partialEdades += alumno.edad;
  });
  // presento el resultado
  return [partialEdades / basededatos.alumnos.length];
};

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
export const alumnosConPromedioMayorA = (promedioIn) => {
  // Para sacar el resultado
  let resultado = [];
  // Recorro los alumnos
  basededatos.alumnos.forEach(alumno => {
    // Busco las calificaciones por cada alumno
    let calificacionesXAlumno = basededatos.calificaciones.filter(calificacion => calificacion.alumno === alumno.id);
    // Inicializo la suma parcial
    let sumaParcial = 0;
    // Sumo las calificaciones por alumno
    calificacionesXAlumno.forEach(calif => {
      sumaParcial += calif.nota
    });
    // Obtengo el promedio
    let promedio = sumaParcial / calificacionesXAlumno.length;
    // Si supera el promedio ingresado lo pongo en resultado para mostrar
    if (promedio > promedioIn) {
      resultado.push({ ...alumno, promedio: promedio });
    }
  });
  // Presento resultado.
  return resultado;
};

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
export const materiasSinAlumnosAnotados = () => {
  // Para sacar el resultado
  let resultado = [];
  // Recorro las materias
  basededatos.materias.forEach(materia => {
    // Busco en las calificaciones cuantos almunos rindieron
    let calificaciones = basededatos.calificaciones.filter(calificacion => calificacion.materia === materia.id);

    //En el caso de querer la data completa de inscriptos por materia
    // resultado.push({...materia, inscriptos: calificaciones.length});

    // Verifico que no tenga inscriptos
    if (calificaciones.length === 0) {
      resultado.push(materia);
    }
  });
  // Presento resultado.
  return resultado;
};

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
export const promedioDeEdadByUniversidadId = (universidadId) => {
  // Para cargar los alumnos
  let alumnos = [];
  // Busco las materias de la universidadId
  basededatos.materias.filter(materia => {
    if (materia.universidad === universidadId) {
      // Busco las calificacion de dicha materia
      basededatos.calificaciones.filter(calificacion => {
        if (calificacion.materia === materia.id) {
          // Busco los alumnos con calificaciones en esas materias    
          basededatos.alumnos.filter(alumno => {
            if (alumno.id === calificacion.alumno) {
              // Cargo en este arreglo los alumnos de esas materias de la universidadId
              if (!alumnos.includes(alumno)) {
                alumnos.push(alumno)
              }
            }
          });
        }
      });
    }
  });
  // Calculo el promedio
  let sumaParcial = 0;
  alumnos.forEach(alumno => {
    // Ver los alumnos
    // console.log(alumno);
    sumaParcial += alumno.edad;
  });
  // Presento resultado.
  return [sumaParcial / alumnos.length];
};
