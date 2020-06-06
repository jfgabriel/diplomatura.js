import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  promedioDeEdad,
  alumnosConPromedioMayorA,
  materiasSinAlumnosAnotados,
  promedioDeEdadByUniversidadId,
} from './moduloEjercicios';

import baseDeDatos from './basededatos';

// materiasAprobadasByNombreAlumno
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios materiasAprobadasByNombreAlumno.');

const materiasAprobadasPorSuzana = materiasAprobadasByNombreAlumno(
  'Suzana Mendez'
);
console.log('Materias aprobadas por Suzana:', materiasAprobadasPorSuzana);

const materiasAprobadasPorAlina = materiasAprobadasByNombreAlumno(
  'Alina Robles'
);
console.log('Materias aprobadas por Alina:', materiasAprobadasPorAlina);

// expandirInfoUniversidadByNombre
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios expandirInfoUniversidadByNombre.');

const infoUniversidadComahue = expandirInfoUniversidadByNombre(
  'Universidad del Comahue'
);
console.log('Info comahue:', infoUniversidadComahue);

const infoUniversidadRio = expandirInfoUniversidadByNombre(
  'Universidad de Rio Negro'
);
console.log('Info rio negro:', infoUniversidadRio);

const promedioEdad = promedioDeEdad();
console.log('Promedio de Edad:',promedioEdad);

const promedioMayorA = alumnosConPromedioMayorA(5);
console.log('Alumnos con promedio mayor a 5:',promedioMayorA);

const promedioMayorAocho = alumnosConPromedioMayorA(8);
console.log('Alumnos con promedio mayor a 8:',promedioMayorAocho);

const materiasSinAlumnos = materiasSinAlumnosAnotados();
console.log('Materias sin alumnos anotados:',materiasSinAlumnos);

const edadUniversidad = promedioDeEdadByUniversidadId(1);
console.log('Promedio de edad universidad ID 1:',edadUniversidad);

const edadUniversidadTwo = promedioDeEdadByUniversidadId(2);
console.log('Promedio de edad universidad ID 2:',edadUniversidadTwo);
