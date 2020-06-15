// 1) Importar el objeto 'database' del archivo "./basededatos"
import { helpers } from './helpers';
import { database } from './baseDeDatos';

// 2) Implementar una función que obtenga una universidad por Id
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados

console.log('------------------------------------------------------');
console.log('Inc 2) universidad por ID');
console.log(helpers.getUniversidadById(2));

// 3) Implementar una función que obtenga un profesor por Id
console.log('------------------------------------------------------');
console.log('Inc 3) profesor por ID');
console.log(helpers.getProfesorById(1));

// 4) Implementar una función que obtenga una materia por Id
// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
console.log('------------------------------------------------------');
console.log('Inc 4) materia por ID');
console.log(helpers.getMateriaById(3));

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos
console.log('------------------------------------------------------');
console.log('Inc 5) objeto helpers');
console.log('helpers {');
for (const prop in helpers) {
    console.log('\t ' + prop);
}
console.log('}');

// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
console.log('------------------------------------------------------');
console.log('Inc 7) ultimo ID en una tabla (materias)');
console.log(helpers.getUltimoId('materias'));

// 8) Importar helpers desde su propio módulo

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper
console.log('------------------------------------------------------');
console.log('Inc 9) insertar provincia ("Chubut")');
const addProvincia = prov => {
    const newProv = {
        id: helpers.getUltimoId('provincias').id + 1,
        nombre: prov
    };
    helpers.getTabla('provincias').push(newProv);
    return helpers.getUltimoId('provincias').id;
};

console.log(addProvincia('Chubut'));

// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres
console.log('------------------------------------------------------');
console.log('Inc 10) Info de materia');

const getMateriaDetallada = idMateria => {
    const materia = helpers.getMateriaById(idMateria);
    const nombresProfesores = [];
    
    materia.profesores.forEach( id => 
        nombresProfesores.push(helpers.getProfesorById(id).nombre)
    );

    return {
        id: idMateria,
        nombre: materia.nombre,
        profesores: nombresProfesores,
        universidad: helpers.getUniversidadById(materia.universidad).nombre
    } 
};

console.log(getMateriaDetallada(1));
// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...
console.log('------------------------------------------------------');
console.log('Inc 11) Info de materias x alumno');

const alumnos = helpers.getTabla('alumnos');
const calificaciones = helpers.getTabla('calificaciones');

alumnos.getInfoMaterias = () => {
    console.log("NOTAS DE ALUMNOS");
    console.log("----------------");
    
    alumnos.forEach(alumno => {
        console.log("\n" + alumno.nombre.toUpperCase());

        calificaciones
            .filter(c => c.alumno === alumno.id)
            .map(({materia, nota}) => {
                console.log(helpers.getMateriaById(materia).nombre + " : " + nota);
                }
            )
        }
    );
};
alumnos.getInfoMaterias(); 

// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas
console.log('------------------------------------------------------');
console.log('Inc 12) agrega calificacion de alumno y materia');

const addCalificacion = (nombreAlumno, nombreMateria, calificacion) => {
    const alumno = helpers.getAlumnoByNombre(nombreAlumno);
    if (! alumno){
        //tabla alumnos definida en inc 11)
        //console.log('alumno no existe');
        alumnos.push({
            id: helpers.getUltimoId('alumnos').id + 1,
            nombre: nombreAlumno
        });
        //console.log(alumnos);
    }

    const materia = helpers.getMateriaByNombre(nombreMateria);
    if (! materia){
        const materias = helpers.getTabla('materias');
        //console.log('materia no existe');
        materias.push({
            id: helpers.getUltimoId('materias').id + 1,
            nombre: nombreMateria
        });
        //console.log(materias);
    }

    //console.log(helpers.getAlumnoByNombre(nombreAlumno).id);
    //console.log(helpers.getMateriaByNombre(nombreMateria).id);

    //tabla calificaciones definida en inc 11)
    calificaciones.push(
        {
            alumno: helpers.getAlumnoByNombre(nombreAlumno).id,
            materia: helpers.getMateriaByNombre(nombreMateria).id,
            nota: calificacion
        }
    )
}

addCalificacion('Gabriel', 'Ciencias Sociales', 7);
console.log(calificaciones);