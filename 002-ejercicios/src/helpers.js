import { database } from './basededatos';

//Obtener tabla. Si es un nombre devuelve la tabla con el nombre indicado o genera error not founded
function getTabla(nombreTabla){
    const tabla = ((typeof nombreTabla)==='string')?
                   database[nombreTabla]
                 :
                   nombreTabla;
    if (!tabla) {
        console.log('Tabla no encontrada. ¿El nombre es correcto?')
        return false;
    }
    else return tabla;
}

//Inserte datos indicados en una tabla señalada. Bool optativo si la tabla tiene id
function insertNew(nombreTabla,datos,usesId=true){
    if ((typeof datos)==='string') datos={nombre: datos} //If sends a string 

    const tabla=getTabla(nombreTabla);
    const lastId=getLastId(tabla);

    const newObject=usesId?{id: lastId+1}:{};//Object to return

    return Object.assign(newObject,datos); 
}

//Params: Nombre de la tabla, valor y campo:
//1- Si viene el CAMPO busca el VALOR que en el CAMPO
//2- Si NO VIENE CAMPO, busca por ID
//3- Si no viene VALOR, busca todo
function get(nombreTabla,val,campo){
    const tabla = getTabla(nombreTabla);
    if (!val && campo) return console.log('Si viene el campo envíe también el valor'); //Can't send campo if not send val too

    return campo?
            tabla.find(elem=>elem[campo]==val)
            : 
             val?
            tabla.find(elem=>elem.id===val)
            :
            tabla;
}

//Dada una tabla obtener el último id insertado
function getLastId(nombreTabla){
    return getTabla(nombreTabla).reduce((last,elem)=>
        Math.max(elem.id,last)
    ,0)
}

export const helpers={
    getUniversidades:  (id)=>get('universidades',id),
    getProfesores:     (id)=>get('profesores',id),
    getMaterias:       (id)=>get('materias',id),
    getCalificaciones: (id)=>get('calificaciones',id),

    getLastId:         (prop)=>getLastId(prop),

    insertarProvincia: (nombre)=>{
        const newObject=insertNew('provincias',nombre);
        database.provincias.push(newObject);
        console.log('Impresión de soporte para ver la nueva provincia');
        console.log(database.provincias);
        return newObject;
    },

    getMateriaData: function(id){//Convertido en function para llamar al this del helper
        const materia=this.getMaterias(id);
        
        materia.universidad=this.getUniversidades(materia.universidad);
        if (!materia.universidad) return 'Universidad no encontrada'
        else materia.universidad=materia.universidad.nombre;

        materia.profesores=materia.profesores.map((profesorId)=>
            this.getProfesores(profesorId).nombre
        )
        return materia;
    },
    getNotasDeAlumnos: function(){
        const materias       = this.getMaterias();
        const calificaciones = this.getCalificaciones();
        let alumnos = get('alumnos')
                     .map((alumno,y)=>
                       [
                           'ALUMNO '+(y+1),
                            alumno.nombre.toUpperCase(),
                            calificaciones.filter(calificacion=>calificacion.alumno===alumno.id)
                                          .reduce((txt,calificacion)=>
                                                txt+=`${get(materias, calificacion.materia).nombre}: ${calificacion.nota}\n`
                                          ,'')||'Sin calificaciones'
                        ].join('\n')
                      ).join('\n');
        

        return  'NOTAS DE ALUMNOS\n'+
                '----------------\n'+
                alumnos+
                '\n\n';
    },
    calificarAlumnado: function(nombreAlumno,nombreMateria,nota){
        const alumno = get('alumnos',nombreAlumno,'nombre')||insertNew('alumnos',nombreAlumno);
        const materia = get('materias',nombreMateria,'nombre')||insertNew('materias',nombreMateria);
        
        return insertNew('calificaciones', { alumno: alumno.id, materia: materia.id, nota},false);
    }
}

