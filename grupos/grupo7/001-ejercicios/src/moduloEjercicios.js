import basededatos from './basededatos';

const getById = (tabla) => (id) => basededatos[tabla].find((i) => i.id === id);
const getMateriasById = getById('materias');
const getAlumnosById = getById('alumnos');
const getProfesoresById = getById('profesores');
const getByName = (tabla) => (nombre) => basededatos[tabla].find((i) => i.nombre === nombre);
const getUniversidadesByName = getByName('universidades');
const getAlumnosByName = getByName('alumnos');
const promedioArray = (array) => {
  if (array.length < 1) { return 0; } /// En caso de que el array este vacio
  return array.reduce((a, b) => a + b) / array.length;
}

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
  
  let alumnoId = getAlumnosByName(nombreAlumno)?.id;
  
  return basededatos.calificaciones
    .filter(cal => cal.alumno === alumnoId && cal.nota >= 4)
    .map(i => getMateriasById(i.materia));

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
 * param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {

  let universidad = getUniversidadesByName(nombreUniversidad);
  let arrayMaterias = [];
  let arrayProfesores = [];
  let arrayAlumnos = [];

  basededatos.materias
    .filter((m) => {
      if(m.universidad === universidad.id) {
        arrayMaterias = [...arrayMaterias, m];
      }
    });

  basededatos.materias
    .filter((m) => {
      if(m.universidad === universidad.id) {
        for (const prof of m.profesores) {
          if (!arrayProfesores.find((i) => i.id === prof)) {
            arrayProfesores = [...arrayProfesores, getProfesoresById(prof)];
          }
        }
      }
    });

  basededatos.materias
    .filter((m) => {
      if(m.universidad === universidad.id) {
        for (const calif of basededatos.calificaciones) {
          if (calif.materia === m.id) {
            if (!arrayAlumnos.find((i) => i.id === calif.alumno)) {
              arrayAlumnos = [...arrayAlumnos, getAlumnosById(calif.alumno)];
            }
          }
        }
      }
    });

  universidad.materias   = arrayMaterias;
  universidad.profesores = arrayProfesores;
  universidad.alumnos    = arrayAlumnos;
    
  return universidad;
  
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
export const promedioDeEdad = () => {
  return promedioArray(basededatos.alumnos.map(al => al.edad)).toFixed(2);
};

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
export const alumnosConPromedioMayorA = (promedio) => {
  return basededatos.alumnos.filter(a => promedioAlumno(a.id) > promedio);
};

// /**
//  * Devuelve el promedio de edad de un alumno.
//  */
const promedioAlumno = (id) => {
  let calif = basededatos.calificaciones
    .filter(c => c.alumno === id)
    .map(r => r.nota);

  return promedioArray(calif).toFixed(2);
}

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
export const materiasSinAlumnosAnotados = () => {
  return basededatos.materias.filter(m => basededatos.calificaciones.find(c => c.materia === m.id)?.materia);
};

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
export const promedioDeEdadByUniversidadId = (universidadId) => {
  let arrayAlumnos = [];
  
  basededatos.materias.filter(materia => {
    if(materia.universidad === universidadId) {
      basededatos.calificaciones.filter(calif => {
        if(calif.materia ===  materia.id) {
          let califId = calif.alumno;
          basededatos.alumnos.filter(alumno => {
            if(alumno.id === califId) {
              /// chequear si el alumno ya existe en el array
              if (arrayAlumnos.filter(a => a.id === alumno.id).length <= 0) arrayAlumnos = [...arrayAlumnos, alumno];
            }
          });
        }
      });
    }
  });
  return promedioArray(arrayAlumnos.map(al => al.edad)).toFixed(2);
};
