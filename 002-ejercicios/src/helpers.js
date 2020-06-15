import { database } from './basededatos';

//Obtener tabla. Si es un nombre devuelve la tabla con el nombre indicado o genera error not founded
function getTabla(nombreTabla){
    const tabla = ((typeof nombreTabla)==='string')?
                   database[nombreTabla]
                 :
                   nombreTabla;
    
    return (tabla)?
        tabla
        :
        console.log('Tabla no encontrada. ¿El nombre es correcto?');
}

//Insertar datos indicados en una tabla señalada. Bool optativo si la tabla tiene id
function insertNew(nombreTabla,datos,usesId=true){
    const nuevaInfo=((typeof datos)==='string')?
                     {nombre: datos}
                    :
                     datos;

    const tabla=getTabla(nombreTabla);
    const lastId=getLastId(tabla);

    const newObject=usesId?{id: lastId+1}:{};//Object to return

    return Object.assign(newObject,nuevaInfo);
}

//Params: Nombre de la tabla, valor y campo:
//1- Si viene el CAMPO busca el VALOR que en el CAMPO
//2- Si NO VIENE CAMPO, busca VAL por ID
//3- Si no viene VALOR, busca todo
function getFromDB(nombreTabla,val,campo){
    const tabla = getTabla(nombreTabla);

    if (!val && campo) return console.log('Si viene el campo envíe también el valor'); //Can't send campo if not send val too

    return campo?
            tabla.find(elem=>elem[campo]===val)
            :
             val?
            tabla.find(elem=>elem.id===val)
            :
            tabla;
}

/////
// -----> Funciones a exportar
////

//Dada una tabla obtener el último id insertado
const getLastId = (nombreTabla)=>{
    return getTabla(nombreTabla).reduce((last,elem)=>
        Math.max(elem.id,last)
    ,0)
}//o return getTabla(nombreTabla).slice(-1)[0].id;

const getUniversidades  = (id)=>getFromDB('universidades' ,id);
const getProfesores     = (id)=>getFromDB('profesores'    ,id);
const getMaterias       = (id)=>getFromDB('materias'      ,id);
const getCalificaciones = (id)=>getFromDB('calificaciones',id);
const insertarProvincia = (nombre)=>{
    const newObject=insertNew('provincias',nombre);
    database.provincias.push(newObject);
    console.log('Impresión de soporte para ver la nueva provincia');
    console.log(database.provincias);
    return newObject;
};
const getMateriaData    = (id)=>{
    const materia=getMaterias(id);

    materia.universidad=getUniversidades(materia.universidad);
    if (!materia.universidad) return 'Universidad no encontrada'
    else materia.universidad=materia.universidad.nombre;

    materia.profesores=materia.profesores.map((profesorId)=>
        getProfesores(profesorId).nombre
    )
    return materia;
};
const getNotasDeAlumnos= function(){
    const materias       = getMaterias();
    const calificaciones = getCalificaciones();
    let alumnos = getFromDB('alumnos')
                    .map((alumno,y)=>
                    [
                        'ALUMNO '+(y+1),
                        alumno.nombre.toUpperCase(),
                        calificaciones.filter(calificacion=>calificacion.alumno===alumno.id)
                                        .reduce((txt,calificacion)=>
                                            txt+=`${getFromDB(materias, calificacion.materia).nombre}: ${calificacion.nota}\n`
                                        ,'')||'Sin calificaciones'
                    ].join('\n')
                    ).join('\n');


    return  'NOTAS DE ALUMNOS\n'+
            '----------------\n'+
            alumnos+
            '\n\n';
};
const calificarAlumnado= (nombreAlumno,nombreMateria,nota)=>{
    const alumno = getFromDB('alumnos',nombreAlumno,'nombre')||insertNew('alumnos',nombreAlumno);
    const materia = getFromDB('materias',nombreMateria,'nombre')||insertNew('materias',nombreMateria);

    return insertNew('calificaciones', { alumno: alumno.id, materia: materia.id, nota},false);
}

export const helpers={
    getUniversidades,
    getProfesores,
    getMaterias,
    getCalificaciones,

    getLastId,

    insertarProvincia,
    getMateriaData,
    getNotasDeAlumnos,
    calificarAlumnado
}
