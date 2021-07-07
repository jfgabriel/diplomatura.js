import database from './basededatos';
import {
  promedioByLista,
  edadesAlumnoBymateriaId
} from './util';
/** 1)
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
  let salida;
  for (let alumno of database.alumnos) {
    if (alumno.nombre === nombreAlumno) {
      salida = [];
      for (let calificacion of database.calificaciones) {
        if (calificacion.nota >= 4 && calificacion.alumno === alumno.id) {
          salida.push(
            database.materias.find(
              (materia) => materia.id === calificacion.materia
            )
          );
        }
      }
    }
  }
  return salida;
};

/** 2)
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
  let universidad = database.universidades.find(u => (u.nombre === nombreUniversidad));
  if (universidad) {
    universidad.materias = [];
    universidad.profesores = [];
    universidad.alumnos = [];
    database.materias.forEach((materia) => {
      if (materia.universidad === universidad.id) {
        // agrego la materia al array de materias de la universidad
        universidad.materias.push(materia);
        // agrego el profesor al array de profesores
        materia.profesores.forEach((p) => {
          let profes = database.profesores;
          for (let i = 0; i < profes.length; i++) {
            //busco los profesores de cada materia y verifico que ya no esten incluidos en el array de profesores
            if (profes[i].id === p && (!universidad.profesores.includes(profes[i]))) {
              universidad.profesores.push(profes[i]);
            }
          }
        });
        let calificaciones = database.calificaciones.filter(c => c.materia === materia.id);
        calificaciones.forEach((calif) => {
          let alumno = database.alumnos.find(a => a.id === calif.alumno);
          if (!universidad.alumnos.includes(alumno)) { universidad.alumnos.push(alumno); }
        }
        );
      }
    });
  }
  return universidad;
};

/** 3)
 * Devuelve el promedio de edad de los alumnos.
 */
export const promedioDeEdad = () => {
  return promedioByLista(database.alumnos.map((alumno) => alumno.edad));
};

/** 4)
 * Devuelve la lista de alumnos con promedio mayor al numero pasado
 * por parametro.
 * @param {number} promedio
 */
export const alumnosConPromedioMayorA = (promedio) => {
  let salida = [];
  for (let alumno of database.alumnos) {
    let califiAlumno = database.calificaciones.filter(
      (aux) => aux.alumno === alumno.id
    );
    if (promedioByLista(califiAlumno.map((calif) => calif.nota)) > promedio) {
      salida.push(alumno);
    }
  }
  return salida.length === 0
    ? 'No hay alumnos con promedio mayor a ' + promedio
    : salida;
};

/**5)
 * Devuelve la lista de materias sin alumnos
 */
export const materiasSinAlumnosAnotados = () => {
  return database.materias.filter(mat => {
    if (!database.calificaciones.find(cali => cali.materia === mat.id)) return true;
    else false;
  });
};

/**6)
 * Devuelve el promdedio de edad segun el id de la universidad.
 * @param {number} universidadId
 */
export const promedioDeEdadByUniversidadId = (universidadId) => {
  let materiaId = database.materias.filter(
    (materia) => materia.universidad === universidadId
  );
  let salida = promedioByLista(edadesAlumnoBymateriaId(materiaId));
  return salida.length === 0
    ? 'No existe la universidad / no existe materias de esta universidad / no hay alumnos para las materias de esta universidad '
    : salida;
};
