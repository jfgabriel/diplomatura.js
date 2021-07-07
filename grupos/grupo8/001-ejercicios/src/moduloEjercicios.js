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
  // Ejemplo de como accedo a datos dentro de la base de datos
  let arregloFinal = [];

  let alumno = basededatos.alumnos.find(
    (alumno) => alumno.nombre === nombreAlumno
  );

  if (alumno) {
    let materiasAprobadas = basededatos.calificaciones.filter(
      (c) => c.alumno === alumno.id && c.nota >= 4
    );

    materiasAprobadas.forEach((m) => {
      arregloFinal.push(basededatos.materias.find((a) => a.id === m.materia));
    });
    return arregloFinal;
  }
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
  let universidadFinal = [];
  let profesores = [];
  let alumnos = [];

  let universidad = basededatos.universidades.find(
    (universidad) => universidad.nombre === nombreUniversidad
  );

  if (universidad) {
    // Buscar materias por Universidad
    let materias = basededatos.materias.filter(
      (materia) => materia.universidad === universidad.id
    );

    // Recorre todas las materias que dicta la Universidad
    materias.forEach((m) => {
      let profesoresMateria = m.profesores;
      let alumnosMateria = m.id;

      // Recorre todos los profesores que participan en las materias e insertarlos en el arreglo
      profesoresMateria.forEach((profeMateria) => {
        let profesor = basededatos.profesores.find(
          (p) => p.id == profeMateria && !profesores.includes(p)
        );
        if (profesor) profesores.push(profesor);
      });

      let notasAlumnos = basededatos.calificaciones.filter(
        (c) => alumnosMateria === c.materia
      );

      // Recorre todos las calificaciones para obtener datos de los alumnos e insertarlos en el arreglo
      notasAlumnos.forEach((c) => {
        let alumno = basededatos.alumnos.find(
          (alumno) => alumno.id === c.alumno && !alumnos.includes(alumno)
        );
        if (alumno) alumnos.push(alumno);
      });
    });

    universidadFinal.materias = materias;
    universidadFinal.profesores = profesores;
    universidadFinal.alumnos = alumnos;

    return universidadFinal;
  }
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
