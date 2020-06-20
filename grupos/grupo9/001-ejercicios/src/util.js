import { database } from './basededatos';
/**
 * Devuelvo un null en el caso de que la lista este vacia. Por que puede haber sumado 0.
 * @param {numero} lista
 */
export const promedioByLista = (lista) => {
    let cantidad = lista.length !== 0 ? lista.reduce(sumador) : null;
    if (cantidad !== null) {
        cantidad = cantidad ? cantidad / lista.length : 0;
    }
    return cantidad;
};
//Funcion sumador que utilizo con reduce, esta es propia de array.
const sumador = (acumulador, valor) => acumulador + valor;

/**
 * Me devuelve un arreglo con las edades de los alumnos sin repetir por un arreglo de materias.
 * @param {arreglo} materiaId
 */
export const edadesAlumnoBymateriaId = (materiaId) => {
    let salida = [];
    let controlAlumno = [];
    for (let calif of database.calificaciones) {
        if (materiaId.find((materia) => materia.id === calif.materia)) {
            let unAlumno = database.alumnos.find(
                (alumno) => alumno.id === calif.alumno
            );
            if (!controlAlumno.find((id) => id === unAlumno.id)) {
                controlAlumno.push(unAlumno.id);
                salida.push(unAlumno.edad);
            }
        }
    }
    return salida;
};
