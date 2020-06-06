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
 * param {number} alumnoId el id del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // obtener el id del alumno
  let id = obtenerIdAlumnoByNombre(nombreAlumno);
  // obtener materias aprobadas
  let materiasAprobadas = obtenerMateriasAlumnoById(id);

  return materiasAprobadas;
};

const obtenerIdAlumnoByNombre = (nombreAlumno) => {
  for(let i=0; i < basededatos.alumnos.length; i++) {
    if(basededatos.alumnos[i].nombre === nombreAlumno) {
      return basededatos.alumnos[i].id
    }
  }
  return 0;
}

const obtenerMateriasAlumnoById = (id) => {
  let mat = [];
  const listadoMaterias = [];

  for(let i=0; i < basededatos.calificaciones.length; i++) {
    if(basededatos.calificaciones[i].alumno === id && basededatos.calificaciones[i].nota >= 4) {
      mat.push(basededatos.calificaciones[i].materia);
    }
  }

  for(let i=0; i < basededatos.materias.length; i++) {
    for(let j=0; j < mat.length; j++) {
      if(mat[j] === basededatos.materias[i].id) {
        listadoMaterias.push(basededatos.materias[i]);
      }
    }
  }

  return listadoMaterias;
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
 * param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  const materias = [];
  const profesores = [];
  const profesoresIds = [];
  const alumnos = [];
  const alumnosIds = [];
  let universidadId = 0;
  let universidadesInfo = {};

  for(let i=0; i < basededatos.universidades.length; i++) {
    if(basededatos.universidades[i].nombre === nombreUniversidad) {
      universidadesInfo = basededatos.universidades[i];
      universidadId = basededatos.universidades[i].id;
    }
  }

  ///materias
  for(let i=0; i < basededatos.materias.length; i++) {
    if(basededatos.materias[i].universidad === universidadId) {
      materias.push(basededatos.materias[i]);

      ///profesores
      for(let j=0; j < basededatos.materias[i].profesores.length; j++) {
        for(let k=0; k < basededatos.profesores.length; k++) {
          if (basededatos.profesores[k].id === basededatos.materias[i].profesores[j]) {
            if(profesoresIds.indexOf(basededatos.profesores[k].id) < 0) {
              profesoresIds.push(basededatos.profesores[k].id);
              profesores.push(basededatos.profesores[k]);
            }
          }
        }

        /// alumnos
        for(let k=0; k < basededatos.calificaciones.length; k++) {
          for(let l=0; l < basededatos.alumnos.length; l++) {
            
            if (basededatos.calificaciones[k].alumno === basededatos.alumnos[l].id &&
              alumnosIds.indexOf(basededatos.alumnos[l].id) < 0
              ) {
                alumnos.push(basededatos.alumnos[l]);
            }
            
          }
          alumnosIds.push(basededatos.calificaciones[k].alumno);
        }
      }
    }
  }
  
  universidadesInfo.materias = materias;
  universidadesInfo.profesores = profesores;
  universidadesInfo.alumnos = alumnos;

  return universidadesInfo;
  
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
export const promedioDeEdad = () => {
  const edades = arrayDeEdades(basededatos.alumnos);
  let promedio = edades.reduce((a, b) => (a + b)) / edades.length;
  return promedio.toFixed(2);
};

const arrayDeEdades = (a) => {
  let edades = [];
  a.filter(alumno => edades.push(alumno.edad));
  return edades;
}

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
export const alumnosConPromedioMayorA = (promedio) => {
  let mayores = [];
  basededatos.alumnos.filter(alumno => {
    if (promedioAlumno(alumno.id) > promedio) {
      mayores.push(alumno);
    }
  });
  return mayores;
};

const promedioAlumno = (id) => {
  let califAlumno = [];
  basededatos.calificaciones.filter(calif => {
    if (calif.alumno === id) califAlumno.push(calif.nota);
  });
  let promedio = califAlumno.reduce((a, b) => (a + b), 0) / califAlumno.length;

  return promedio.toFixed(2);
}

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
export const materiasSinAlumnosAnotados = () => {
  let materiasSinAlumnos = [];
  basededatos.materias.filter(materia => {
    let materiaId = materia.id;
    /// chequear si la materia ya existe en el array
    let flag = true;
    basededatos.calificaciones.filter(calif => {
      if(calif.materia === materiaId) flag = false;
    });
    if (flag) materiasSinAlumnos.push(materia);
  });
  return materiasSinAlumnos;
};

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
export const promedioDeEdadByUniversidadId = (universidadId) => {
  let promedio = 0;
  let arrayAlumnos = [];
  ///materia.id ==> calificaciones.materia calificaciones.alumno ==> alumno ==> armar array sin repetidos
  basededatos.materias.filter(materia => {
    let materiaId = materia.id;
    if(materia.universidad === universidadId) {
      basededatos.calificaciones.filter(calif => {
        if(calif.materia === materiaId) {
          let califId = calif.alumno;
          basededatos.alumnos.filter(alumno => {
            if(alumno.id === califId) {
              /// chequear si el alumno ya existe en el array
              let flagIfAlumno = true;
              arrayAlumnos.filter(al => {
                if (al.id === alumno.id) flagIfAlumno = false;
              })
              if (flagIfAlumno) arrayAlumnos.push(alumno);
            }
          });
        }
      });
    }
  });
  
  /// sacar promedio de edad de ese array
  const edades = arrayDeEdades(arrayAlumnos);
  promedio = edades.reduce((a, b) => (a + b), 0) / edades.length;

  return promedio.toFixed(2);
};
