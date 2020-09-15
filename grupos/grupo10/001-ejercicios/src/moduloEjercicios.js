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
  const alumnos = basededatos.alumnos; // Alumnos
  const cantAlumnos = alumnos.length; // Cantidad de alumnos

  const calificaciones = basededatos.calificaciones; // Calificaciones
  const cantCalificaciones = calificaciones.length; // Cantidad de calificaciones

  const materias = basededatos.materias; // Materias
  const cantMaterias = materias.length; // Cantidad de materias

  let respuesta;

  let contador = 0;
  let control = false;
  let alumno;

  do {
    if (alumnos[contador].nombre === nombreAlumno) {
      alumno = alumnos[contador];
      control = true;
    }
    // Control para salir
    if (cantAlumnos === contador+1) {
      control = true;
    }
    contador++
  } while (!control);
  
  let materiasAprobadas = []
  if (alumno) {
    for (let i = 0; i < calificaciones.length; i++) {
     const unaCalificacion = calificaciones[i];
     if (unaCalificacion.alumno === alumno.id) {
      let contador = 0;
      let control = false;
      do {
        if (materias[contador].id === unaCalificacion.materia) {
          materiasAprobadas.push(materias[contador]);
          control = true;
        }
        // Control para salir
        if (cantMaterias === contador+1) {
          control = true;
        }
        contador++
      } while (!control);
     }
    }
  }

  // Control respuesta
  (materiasAprobadas.length > 0) ? respuesta = materiasAprobadas : null;

  return respuesta;
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
  const universidades = basededatos.universidades; // Universidades
  const cantUniversidades = universidades.length; // Cantidad de universidades

  const materias = basededatos.materias; // Materias
  const cantMaterias = materias.length; // Cantidad de materias
  let materiasUniversidad = [];

  const profesores = basededatos.profesores; // Profesores
  const cantProfesores = profesores.length; // Cantidad de profesores
  let profesoresUniversidad = [];

  const calificacionesAlumnos = basededatos.calificaciones; // Calificaciones de alumnos
  const alumnos = basededatos.alumnos; // Alumnos
  let alumnosUniversidad = [];

  let salir = false; // Control para salir del while
  let universidad;
  let i = 0; // Inicializamos contador
  // Buscamos la universidad
  do {
    // Seteo la universidad si existe
    if(universidades[i].nombre === nombreUniversidad){
      universidad = universidades[i];
      salir = true;
    }
    // Control para salir
    if (cantUniversidades === i+1){
      salir = true;
    }
    // Sumamos en 1 al contador
    i++
  } while (!salir);

  // Probamos que exista la universidad
  if (universidad) {
    // Recorremos las materias para encontrar las que pertenecen a la universidad
    for (let j = 0; j < materias.length; j++) {
      const unaMateria = materias[j];
      if(universidad.id === unaMateria.universidad) {
        materiasUniversidad.push(unaMateria);
        // Buscamos los profesores de la materia
        const infoProfesores = buscarProfesores(unaMateria.profesores, profesores);
        // Buscamos ycontrolamos para agregar sin repetir a los profesores
        for (let k = 0; k < infoProfesores.length; k++) {
          const unProfesor = infoProfesores[k];
          let agregar = true;
          let control = false;
          let contador = 0;
          if(profesoresUniversidad.length > 0){
            do {
              if(unProfesor.id === profesoresUniversidad[contador].id) {
                agregar = false;
                control = true;
              }
              // Control para salir
              if (profesoresUniversidad.length === contador+1){
                control = true;
              }
              contador++
            } while (!control);
          }
          if(agregar) {
            profesoresUniversidad.push(unProfesor)
          }
        }
      }
    }
    universidad['materias'] = materiasUniversidad;
    universidad['profesores'] = profesoresUniversidad;

    for (let i = 0; i < universidad.materias.length; i++) {
      const unaMateria = universidad.materias[i];
      const alumosMateria = buscarAlumnos(unaMateria.id, calificacionesAlumnos, alumnos);
  
      for (let j = 0; j < alumosMateria.length; j++) {
        const unAlumno = alumosMateria[j];
        let agregar = true;
        let control = false;
        let contador = 0;
        if(alumnosUniversidad.length > 0){
          do {
            if(unAlumno.id === alumnosUniversidad[contador].id ) {
              agregar = false;
              control = true;
            }
            
            // Control para salir
            if (alumnosUniversidad.length === contador+1){
              control = true;
            }
            contador++
          } while (!control);
        }
        if(agregar) {
          alumnosUniversidad.push(unAlumno)
        }
        
      }    
    }
    universidad['alumnos'] = alumnosUniversidad;
  }
  
  return universidad;
};

export const buscarAlumnos = (idMateria, calificacionesAlumnos, alumnos) => {
  let respuesta = [];
  for (let i = 0; i < calificacionesAlumnos.length; i++) {
    const unaCalificacion = calificacionesAlumnos[i];
   
    if(unaCalificacion.materia === idMateria) {
      // Buscamos los datos del alumno
      let contador = 0;
      let control = false;
      do {

        if(unaCalificacion.alumno === alumnos[contador].id) {
          respuesta.push(alumnos[contador]);
          control = true;
        }
        
        // Control para salir
        if (calificacionesAlumnos.length === contador+1){
          control = true;
        }
        contador++
    
      } while (!control);
    }

  }
  return respuesta;
}

export const buscarProfesores = (arregloProfesores, profesores) => {
  const cantProfesores = profesores.length; // Cantidad de profesores
  let respuesta = [];

  for (let i = 0; i < arregloProfesores.length; i++) {
    const idProfesor = arregloProfesores[i];
    let j = 0; // Contador
    let salir = false; // Control while
    do {
      let unProfesor = profesores[j];
      if(idProfesor === unProfesor.id) {
        respuesta.push(unProfesor);
        salir = true;
      }
      // Control para salir
      if (cantProfesores === j+1){
        salir = true;
      }
      j++;
    } while (!salir);
  }
  return respuesta;
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
