// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './baseDeDatos';

// 2) Implementar una función que obtenga una universidad por Id
const getObjetoById = (tabla) => (id) => tabla.find((item)=> item.id===id);
const getObjetoByName = (tabla) => (name) => tabla.find((item)=> item.nombre===name);
const getUniversidadById = getObjetoById(database.universidades);



// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados

// 3) Implementar una función que obtenga un profesor por Id
const getProfesorById = getObjetoById(database.profesores);

// 4) Implementar una función que obtenga una materia por Id
// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
//const getMateriaById = (id) => database.materias.find((i) => i.id === id)
const getMateriaById = getObjetoById(database.materias);

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla
const getUltimoId = (tabla) => {
    let max=0;
    for (const objeto of tabla) {
        if (objeto.id > max) max=objeto.id;
    }
    return max;
}
// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper

const addProvincia = (nombre) => {
    let prov = getObjetoByName(database.provincias)(nombre); 
    if (!prov) {
        let idNuevo = getUltimoId(database.provincias) + 1;
        prov = {id: idNuevo, nombre: nombre};
        database.provincias.push(prov);
    }
    return prov;
}

const expandirMateria = (idMateria) => {
    let mat = getObjetoById(database.materias)(idMateria);
    if (mat) {
        mat.nombresProfesores= mat.profesores.map( (idProfesor) => getObjetoById(database.profesores)(idProfesor).nombre);
        mat.nombreUniversidad = getObjetoById(database.universidades)(mat.universidad).nombre;
    }
    return mat;
}

// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...
const logNotasAlumnos = () => {
    let notas;
    console.log('NOTAS DE ALUMNOS');
    console.log('----------------');
    for (const alumno of database.alumnos) {
        console.log(alumno.nombre.toUpperCase());
        notas = database.calificaciones.filter(c=>c.alumno===alumno.id);
        for (const nota of notas) {
            console.log(getObjetoById(database.materias)(nota.materia).nombre + ': ' + nota.nota)
        }
    }
}

const addAlumno = (nombre) => {
    let alumno = {
        id: getUltimoId(database.alumnos) + 1,
        nombre: nombre
    }
    database.alumnos.push(alumno);
    console.log('alumno creado ' + alumno);
    return alumno;
}
const addMateria = (nombre) => {
    let materia = {
        id: getUltimoId(database.materias) + 1,
        nombre: nombre
    }
    return materia;
}

// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas
const setCalificacion = (alumnoNombre, materiaNombre, nota) => {
    let alumno = getObjetoByName(database.alumnos)(alumnoNombre);
    if (!alumno) alumno = addAlumno(alumnoNombre);
    console.log(alumno);

    let materia = getObjetoByName(database.materias)(materiaNombre);
    if (!materia) materia = addMateria(materiaNombre);

    let calificacion = { alumno: alumno.id, materia: materia.id, nota: nota };
    database.calificaciones.push(calificacion);
}


export const helpers = {
    getProfesorById,
    getUniversidadById,
    getMateriaById,
    getUltimoId,
    addProvincia,
    expandirMateria,
    logNotasAlumnos,
    setCalificacion
}