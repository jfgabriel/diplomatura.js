import basededatos from './basededatos';

const getById = (tabla) => (id) => basededatos[tabla].find((i) => i.id === id);
const getMateriasById = getById('materias');
const getAlumnosById = getById('alumnos');
const getProfesoresById = getById('profesores');
const getByName = (tabla) => (nombre) => basededatos[tabla].find((i) => i.nombre === nombre);
const getUniversidadesByName = getByName('universidades');
const getAlumnosByName = getByName('alumnos');
const promedioArray = (array) => array.reduce((a, b) => a + b) / array.length;

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

  let alumnoId = getAlumnosByName(nombreAlumno)?.id;
  let materiasAprobadas = basededatos.calificaciones
    .filter(cal => cal.alumno === alumnoId && cal.nota >= 4)
    .map(i => getMateriasById(i.materia));

  return materiasAprobadas;
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
  let materiasArray = [];
  let profesoresArray = [];
  let alumnosArray = [];

  basededatos.materias
    .filter((m) => {
      if(m.universidad === universidad.id) {
        materiasArray = [...materiasArray, m];
      }
    });

  basededatos.materias
    .filter((m) => {
      if(m.universidad === universidad.id) {
        for (const prof of m.profesores) {
          if (!profesoresArray.find((i) => i.id === prof)) {
            profesoresArray = [...profesoresArray, getProfesoresById(prof)];
          }
        }
      }
    });

  basededatos.materias
    .filter((m) => {
      if(m.universidad === universidad.id) {
        for (const calif of basededatos.calificaciones) {
          if (calif.materia === m.id) {
            if (!alumnosArray.find((i) => i.id === calif.alumno)) {
              alumnosArray = [...alumnosArray, getAlumnosById(calif.alumno)];
            }
          }
        }
      }
    });

  universidad.materias   = materiasArray;
  universidad.profesores = profesoresArray;
  universidad.alumnos    = alumnosArray;
    
  return universidad;
  
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
export const promedioDeEdad = () => {
  let promedio = basededatos.alumnos.map(al => al.edad);
  return promedioArray(promedio).toFixed(2);
};

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
  promedio = arrayAlumnos
    .map(al => al.edad);

  return promedioArray(promedio).toFixed(2);

};
