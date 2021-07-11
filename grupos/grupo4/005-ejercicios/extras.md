# Creación base de datos:

db.getCollection('universidades').insertMany([
/_ 1 _/
{
"\_id" : ObjectId("5f03a4491c362804a23a8e66"),
"nombre" : "Universidad del Comahue",
"direccion" : {
"calle" : "Av. Siempre viva",
"numero" : 2043.0,
"provincia" : "Neuquen"
}
}

    /* 2 */
    {
        "_id" : ObjectId("5f03a4491c362804a23a8e67"),
        "nombre" : "Universidad de Rio Negro",
        "direccion" : {
            "calle" : "Av. Roca",
            "numero" : 3023.0,
            "provincia" : "Rio Negro"
        }
    }
    ]);

db.getCollection('alumnos').insertMany([
/_ 1 _/
{
"\_id" : ObjectId("5f03a5121c362804a23a8e73"),
"nombre" : "Rigoberto Manchu",
"edad" : 22.0,
"provincia" : "5f03a5051c362804a23a8e71"
}

    /* 2 */
    {
        "_id" : ObjectId("5f03a5121c362804a23a8e74"),
        "nombre" : "Alina Robles",
        "edad" : 21.0,
        "provincia" : "5f03a5051c362804a23a8e72"
    }

    /* 3 */
    {
        "_id" : ObjectId("5f03a5121c362804a23a8e75"),
        "nombre" : "Suzana Mendez",
        "edad" : 33.0,
        "provincia" : "5f03a5051c362804a23a8e72"
    }

    /* 4 */
    {
        "_id" : ObjectId("5f03a5121c362804a23a8e76"),
        "nombre" : "Adrian Soto",
        "edad" : 26.0,
        "provincia" : "5f03a5051c362804a23a8e71"
    }

    /* 5 */
    {
        "_id" : ObjectId("5f03a5121c362804a23a8e77"),
        "nombre" : "Martin Sarnaga",
        "edad" : 23.0,
        "provincia" : "5f03a5051c362804a23a8e72"
    }

    /* 6 */
    {
        "_id" : ObjectId("5f03a5121c362804a23a8e78"),
        "nombre" : "Pablo Tomafi",
        "edad" : 24,
        "provincia" : "5f03a5051c362804a23a8e72"
    }
    ]);

db.getCollection('provincias').insertMany([
/_ 1 _/
{
"\_id" : ObjectId("5f03a5051c362804a23a8e71"),
"nombre" : "Neuquen"
}

    /* 2 */
    {
        "_id" : ObjectId("5f03a5051c362804a23a8e72"),
        "nombre" : "Rio Negro"
    }
    ]);

db.getCollection('materias').insertMany([
/_ 1 _/
{
"\_id" : ObjectId("5f03a4c21c362804a23a8e6c"),
"nombre" : "Análisis matemático",
"profesores" : [
"5f0939b52552f25994a500ea",
"5f0939b52552f25994a500eb"
],
"universidad" : "5f03a4491c362804a23a8e66"
}

    /* 2 */
    {
        "_id" : ObjectId("5f03a4c21c362804a23a8e6d"),
        "nombre" : "Corte y confección de sabanas",
        "profesores" : [
            "5f0939b52552f25994a500ec"
        ],
        "universidad" : "5f03a4491c362804a23a8e67"
    }

    /* 3 */
    {
        "_id" : ObjectId("5f03a4c21c362804a23a8e6e"),
        "nombre" : "Diseño de indumentaria",
        "profesores" : [
            "5f0939b52552f25994a500ed"
        ],
        "universidad" : "5f03a4491c362804a23a8e67"
    }

    /* 4 */
    {
        "_id" : ObjectId("5f03a4c21c362804a23a8e6f"),
        "nombre" : "Programación orientada a objetos",
        "profesores" : [
            "5f0939b52552f25994a500ea",
            "5f0939b52552f25994a500ec"
        ],
        "universidad" : "5f03a4491c362804a23a8e66"
    }

    /* 5 */
    {
        "_id" : ObjectId("5f03a4c21c362804a23a8e70"),
        "nombre" : "Ciencias Sociales",
        "profesores" : [
            "5f0939b52552f25994a500ed"
        ],
        "universidad" : "5f03a4491c362804a23a8e66"
    }
    ]);

db.getCollection('calificaciones').insertMany([
/_ 1 _/
{
"\_id" : ObjectId("5f03a5211c362804a23a8e79"),
"alumno" : "5f03a5121c362804a23a8e73",
"materia" : "5f03a4c21c362804a23a8e6c",
"nota" : 5.0
}

    /* 2 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e7a"),
        "alumno" : "5f03a5121c362804a23a8e73",
        "materia" : "5f03a4c21c362804a23a8e6e",
        "nota" : 7.5
    }

    /* 3 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e7b"),
        "alumno" : "5f03a5121c362804a23a8e74",
        "materia" : "5f03a4c21c362804a23a8e6d",
        "nota" : 4.0
    }

    /* 4 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e7c"),
        "alumno" : "5f03a5121c362804a23a8e74",
        "materia" : "5f03a4c21c362804a23a8e6e",
        "nota" : 5.0
    }

    /* 5 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e7d"),
        "alumno" : "5f03a5121c362804a23a8e74",
        "materia" : "5f03a4c21c362804a23a8e6f",
        "nota" : 2.0
    }

    /* 6 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e7e"),
        "alumno" : "5f03a5121c362804a23a8e75",
        "materia" : "5f03a4c21c362804a23a8e6c",
        "nota" : 6.0
    }

    /* 7 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e7f"),
        "alumno" : "5f03a5121c362804a23a8e75",
        "materia" : "5f03a4c21c362804a23a8e6e",
        "nota" : 5.0
    }

    /* 8 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e80"),
        "alumno" : "5f03a5121c362804a23a8e75",
        "materia" : "5f03a4c21c362804a23a8e6f",
        "nota" : 6.0
    }

    /* 9 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e81"),
        "alumno" : "5f03a5121c362804a23a8e76",
        "materia" : "5f03a4c21c362804a23a8e6c",
        "nota" : 9.0
    }

    /* 10 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e82"),
        "alumno" : "5f03a5121c362804a23a8e76",
        "materia" : "5f03a4c21c362804a23a8e6d",
        "nota" : 9.5
    }

    /* 11 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e83"),
        "alumno" : "5f03a5121c362804a23a8e76",
        "materia" : "5f03a4c21c362804a23a8e6f",
        "nota" : 8.5
    }

    /* 12 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e84"),
        "alumno" : "5f03a5121c362804a23a8e77",
        "materia" : "5f03a4c21c362804a23a8e6e",
        "nota" : 7.0
    }

    /* 13 */
    {
        "_id" : ObjectId("5f03a5211c362804a23a8e85"),
        "alumno" : "5f03a5121c362804a23a8e77",
        "materia" : "5f03a4c21c362804a23a8e6f",
        "nota" : 1.0
    }
    ]);

db.getCollection('profesores').insertMany([
/_ 1 _/
{
"\_id" : ObjectId("5f0939b52552f25994a500ea"),
"nombre" : "Jorge Esteban Quito"
}

    /* 2 */
    {
        "_id" : ObjectId("5f0939b52552f25994a500eb"),
        "nombre" : "Marta Raca"
    }

    /* 3 */
    {
        "_id" : ObjectId("5f0939b52552f25994a500ec"),
        "nombre" : "Silvia Torre Negra"
    }

    /* 4 */
    {
        "_id" : ObjectId("5f0939b52552f25994a500ed"),
        "nombre" : "Ramon Martinez"
    }
    ]);
