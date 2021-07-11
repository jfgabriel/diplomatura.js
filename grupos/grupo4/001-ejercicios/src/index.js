import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  promedioDeEdad,
  alumnosConPromedioMayorA,
  materiasSinAlumnosAnotados,
  promedioDeEdadByUniversidadId
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

// promedioDeEdad

console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio promedioDeEdad.');

const promedioEdad = promedioDeEdad();
console.log('Edad Promedio:', promedioEdad);

// alumnosConPromedioMayorA

console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio alumnosConPromedioMayorA.');

const alumnosPromedioMayorA = alumnosConPromedioMayorA(1);
console.log('alumnosConPromedioMayorA(1):', alumnosPromedioMayorA);

// materiasSinAlumnosAnotados

console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio materiasSinAlumnosAnotados.');

const materiasSinAlumnos = materiasSinAlumnosAnotados();
console.log('materiasSinAlumnosAnotados():', materiasSinAlumnos);

// promedioDeEdadByUniversidadId

console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio promedioDeEdadByUniversidadId.');

const promedioDeEdadByUniversidad = promedioDeEdadByUniversidadId(1);
console.log('promedioDeEdadByUniversidadId(1):', promedioDeEdadByUniversidad);

const promedioDeEdadByUniversidad2 = promedioDeEdadByUniversidadId(2);
console.log('promedioDeEdadByUniversidadId(2):', promedioDeEdadByUniversidad2);