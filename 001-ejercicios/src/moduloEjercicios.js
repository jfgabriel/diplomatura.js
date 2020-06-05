import basededatos from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de que no encuentre ninguna, devuelve un array vacio []
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
  return [];
};

/**
 * Devuelve informacion ampliada sobre una universidad.
 * Ademas de devolver el objeto universidad completo,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores que participan.
 * Ejemplo de formato del resultado:
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
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  return {};
};

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
