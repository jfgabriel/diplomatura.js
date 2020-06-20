import {
    universidadById,
    profesorById,
    materiaById,
    insertProvincia,
    extenderMateriaANombres,
    listarAlumnosCalificaciones,
    insertarCalificacion,
} from './index';
import { helpers } from './helpers';
import { database } from './baseDeDatos';

export const test = () => {
    console.log('-------------------------TEST-----------------------------');

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 2.',
        '\n',
        '------------------------------------------------------',
        '\n',
        universidadById(1)
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 3.',
        '\n',
        '------------------------------------------------------',
        '\n',
        profesorById(1)
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 4.',
        '\n',
        '------------------------------------------------------',
        '\n',
        materiaById(1)
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 5.',
        '\n',
        '------------------------------------------------------',
        '\n',
        helpers.universidadById(2),
        '\n',
        helpers.profesorById(2),
        '\n',
        helpers.materiasById(4)
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 6, 7 y 8.',
        '\n',
        '------------------------------------------------------',
        '\n',
        helpers.universidadById(1),
        '\n',
        helpers.profesorById(3),
        '\n',
        helpers.materiasById(4)
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 9.',
        '\n',
        '------------------------------------------------------',
        '\n',
        !insertProvincia('La Pampa') > 0
            ? 'Se inserto correctamente.'
            : 'Se inserto incorrectamente.',
        '\n',
        database.provincias
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 10.',
        '\n',
        '------------------------------------------------------',
        '\n',
        extenderMateriaANombres(1)
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 11.',
        '\n',
        '------------------------------------------------------',
        '\n',
        listarAlumnosCalificaciones()
    );

    console.log(
        '------------------------------------------------------',
        '\n',
        'Ejecutando ejercicios numero 12.',
        '\n',
        '------------------------------------------------------',
        '\n',
        insertarCalificacion('Carlos Perez', 'Soldadura 1', 7)
    );
};