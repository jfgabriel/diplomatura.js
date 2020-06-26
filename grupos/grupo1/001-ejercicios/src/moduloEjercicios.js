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
 * @param {number} alumnoId el id del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  let alumnos = basededatos.alumnos;
  let calificaciones = basededatos.calificaciones;
  let materias = basededatos.materias;
  let idalumno;
  let idmaterias = [];
  let response = [];

  //Busco id de alumno
  for (let i in alumnos) {
    if (alumnos[i].nombre === nombreAlumno) {
      idalumno = alumnos[i].id;
      break;
    }
  }

  if (!idalumno) return idalumno; //undefined

  // Busco materias aprobadas
  for (let i in calificaciones) {
    if (calificaciones[i].alumno === idalumno && calificaciones[i].nota > 4) {
      idmaterias.push(calificaciones[i].materia);
    }
  }

  // Agrego las materias al response
  for (let i in materias) {
    if (idmaterias.includes(materias[i].id)) {
      response.push(materias[i]);
    }
  }

  return response;
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
  let universidades = basededatos.universidades;
  let materias = basededatos.materias;
  let profesores = basededatos.profesores;
  let alumnos = basededatos.alumnos;
  let calificaciones = basededatos.calificaciones;
  let iduniversidad;
  let idprofesores = [];
  let idmaterias = []
  let idalumnos = []
  let response = [];
  let responseMaterias = [];
  let responseProfesores = [];
  let responseAlumnos = [];

  //Matcheo universidad
  for (let i in universidades) {
    if (universidades[i].nombre === nombreUniversidad) {
      iduniversidad = universidades[i].id;
      response = universidades[i];
      break;
    }
  }

  //Busco profes de materias
  for (let i in materias) {
    if (materias[i].universidad === iduniversidad) {
      idmaterias.push(materias[i].id)
      materias[i].profesores = materias[i].profesores.toString(); //Chequear esto, si no se ve como "[Array]"
      responseMaterias.push(materias[i]);
      for (let x in materias[i].profesores) {

        if (!idprofesores.includes(materias[i].profesores[x])){
          idprofesores.push(materias[i].profesores[x]);
          if (profesores[materias[i].profesores[x]]) {
            responseProfesores.push(profesores[materias[i].profesores[x]]);
          }
        }
      }
    }
  }

  if (!idmaterias) return idmaterias;

  // Busco alumnos x calificaciones... buuu
  for (let i in calificaciones) {
    if (idmaterias.includes(calificaciones[i].materia)
      && !idalumnos.includes(calificaciones[i].alumno)
      && materias[calificaciones[i].materia].universidad === iduniversidad) { // Sucede que hay varios alumnos cursando en ambas universidades y me estaba volviendo loco

      idalumnos.push(calificaciones[i].alumno)
      responseAlumnos.push(alumnos[calificaciones[i].alumno]);

    }
  }

  response.materias = responseMaterias;
  response.profesores = responseProfesores;
  response.alumnos = responseAlumnos;
  return response;
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
