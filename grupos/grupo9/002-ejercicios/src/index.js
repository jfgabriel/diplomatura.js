// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './baseDeDatos';
// 8) Importar helpers desde su propio módulo
import { helpers } from './helpers';
import { test } from './test';


// 2) Implementar una función que obtenga una universidad por Id
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados
export const universidadById = (id) => {
    return helpers.getByID(id, database.universidades)
}

// 3) Implementar una función que obtenga un profesor por Id
export const profesorById = (id) => {
    return helpers.getByID(id, database.profesores)
}

// 4) Implementar una función que obtenga una materia por Id
// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
export const materiaById = (id) => {
    return helpers.getByID(id, database.materias)
}

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper
export const insertProvincia = (nombreProvincia) => {
    //verifico que exista la provincia    
    let existeProvincia = helpers.findByPropierty("provincias", "nombre", nombreProvincia);

    if (!existeProvincia) {
        let ultimaPosicion = helpers.ultimoIdByTabla(database.provincias);
        let idNew = ultimaPosicion + 1;
        let itemNew = { id: idNew, nombre: nombreProvincia };
        database.provincias.push(itemNew);
        return idNew;
    }
    //En el caso de que la provincia con ese nombre exista    id=-1  
    // console.log("esta provincia ya existe.\n");
    return -1;
};


// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres

export const extenderMateriaANombres = (idMateria) => {
    //verifico que exista materia
    let materia = helpers.materiasById(idMateria);
    if (!materia) {
        console.log("La materia con ese id no existe.");
        return
    }

    let universidad = helpers.universidadById(materia.universidad);
    if (!universidad) {
        console.log("No existe la universidad que tiene cargada la materia,id Universidad=", materia.universidad);
        return;
    }
    let nombreUniversidad = universidad.nombre;
    let profesoresPorNombre = materia.profesores.map((Element) => {
        let profesor = (helpers.profesorById(Element))
        if (!profesor)
            return "No existe profesor con id:" + Element;

        return profesor.nombre
    });

    let materiaExtendida = {
        id: materia.id,
        nombre: materia.nombre,
        profesores: profesoresPorNombre,
        universidad: nombreUniversidad
    };
    // console.log(materiaExtendida);                   
    return materiaExtendida
};

// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...

export const listarAlumnosCalificaciones = () => {

    console.log("NOTAS DE ALUMNOS ");;
    console.log("-----------------\n");
    return database.alumnos.map(anAlumno => mostrarAlumno(anAlumno));
    //  console.log("listadoAlumnosCalificaciones:",listadoAlumnosCalificaciones);
};
const mostrarAlumno = (anAlumno) => {
    let ColCalificacionesByAlumno = database.calificaciones.filter((aCalificacion) => aCalificacion.alumno === anAlumno.id);

    let nameUpper = (anAlumno.nombre).toUpperCase();
    console.log(nameUpper);

    if (ColCalificacionesByAlumno.length === 0) {
        console.log("El alumno no se ha inscripto a ninguna materia");
        return { nombre: nameUpper };
    }

    let listadoMateriasNota = ColCalificacionesByAlumno.map((aCalificacion) =>
        BuscarMateriaByCalificacion(aCalificacion));
    // console.log(listadoMateriasNota);
    console.log("\n");
    return { nombre: nameUpper, materias: listadoMateriasNota };
};

const BuscarMateriaByCalificacion = (aCalificacion) => {
    let nombreMateriaCalificacion = (helpers.materiasById(aCalificacion.materia)).nombre;
    nombreMateriaCalificacion += ": " + aCalificacion.nota;
    console.log(nombreMateriaCalificacion);
    return nombreMateriaCalificacion;
};



// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas
export const insertarCalificacion = (nombreAlumno, nombreMateria, nota) => {
    let unAlumno = database.alumnos.find(
        (elemento) => elemento.nombre === nombreAlumno
    );
    if (!unAlumno) {
        unAlumno = helpers.construirAgregar(nombreAlumno, database.alumnos);
    }
    let unMateria = database.materias.find(
        (elemento) => elemento.nombre === nombreMateria
    );
    if (!unMateria) {
        unMateria = helpers.construirAgregar(nombreMateria, database.materias);
    }
    database.calificaciones.push({
        alumno: unAlumno.id,
        materia: unMateria.id,
        nota: nota,
    });
    return 'Se inserto correctamente';
};
// ejecutamos test
test();