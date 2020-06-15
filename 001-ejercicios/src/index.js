import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  //profesoresMateria,
  //materiasUniversidad,
  //idDeUniversidad,
  //idDeAlumno,
  //objetosMaterias,
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

//const s = idDeAlumno('Suzanaz Mendez');
//console.log(s);


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


//const s = idDeUniversidad('Universidad del Cxomahue');
//console.log(s);


//const s = materiasUniversidad(1);
//console.log(s);


//const s = profesoresMateria(baseDeDatos.materias);
//console.log(s);


//const s = objetoAlumno2(10);
//console.log(s);

//const s = idDeAlumno2('Rigoberto Manchu');
//console.log(s);

//const s = objetosMaterias(1);
//console.log("materias de universidad",s);


const s = promedioDeEdad();
console.log("Promedio de edad: ", s);

const prom = 8;
const p = alumnosConPromedioMayorA(prom);
console.log("Estudiantes con promedio mayor: ", p);


const r = materiasSinAlumnosAnotados();
console.log("Materias sin alumnos inscriptos: ", r);

const t = promedioDeEdadByUniversidadId(1);
console.log("Promedio de edad de universidad: ", t);


