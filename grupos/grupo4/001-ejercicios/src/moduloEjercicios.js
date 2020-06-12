import basededatos, { database } from './basededatos';

const NOTA_MINIMA = 4;

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
  const alumno = database.alumnos.find(
    (alumno) => alumno.nombre === nombreAlumno
  );

  if (!alumno) {
    return undefined;
  }

  const result = [];

  basededatos.calificaciones
    .filter((calificacion) => calificacion.alumno === alumno.id)
    .forEach((calificacion) => {
      if (calificacion.nota >= NOTA_MINIMA) {
        result.push(
          basededatos.materias.find(
            (materia) => materia.id === calificacion.materia
          )
        );
      }
    });

  return result;
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
  const universidad = basededatos.universidades.find(
    (universidad) => universidad.nombre === nombreUniversidad
  );

  if (!universidad) {
    return undefined;
  }

  // Clone object
  const result = Object.assign({}, universidad);

  result.materias = basededatos.materias.filter(
    (materia) => materia.universidad === universidad.id
  );

  result.profesores = basededatos.profesores.filter((profesor) =>
    basededatos.calificaciones.some((calificacion) =>
      basededatos.materias.some(
        (materia) =>
          materia.id === calificacion.materia &&
          materia.universidad === universidad.id &&
          materia.profesores.indexOf(profesor.id) > -1
      )
    )
  );

  result.alumnos = basededatos.alumnos.filter((alumno) =>
    basededatos.calificaciones.some(
      (calificacion) => calificacion.alumno === alumno.id
    )
  );

  return result;
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
