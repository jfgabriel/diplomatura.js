# Instalaciones:

npm i mongodb --save
npm install --save express
npm install --save escape-string-regexp

# Ejercicios 005: API de universidad

Implementar una API REST que implemente CRUD (o ABM en castellano) de:

- Alumnos
- Profesores
- Materias
- Calificaciones

## Estructura de datos

La estructura de datos debe ser similar a la del ejercicio 002, pero puede modificarse si encuentran una estructura mejor

Los datos deben guardase en una base local MongoDB. Para este ejercicio utilizar una conexión directa a MongoDB (no utilizar Mongoose).

Observación sobre resolución: se eliminaron las claves id de las colecciones, y se reemplazaron las referencias por la clave \_id.

## API REST

Debemos utilizar los métodos HTTP para implementar cada operación:

CREATE -> Método POST

READ -> Método GET

UPDATE -> Método PUT

DELETE -> Método Delete

## Especificaciones

Los 4 endpoints (alumnos, profesores, ...) deben responder a las siguientes peticiones. El resultado debe ser en formato JSON.

**GET http://localhost:8080/alumnos**

Debe devolver todos los alumnos

**GET http://localhost:8080/alumnos?nombre=XXX**

Debe devolver todos los alumnos cuyo nombre es XXX (considerar mayúsculas y minúsculas)

**POST http://localhost:8080/alumnos**

Crear un alumno son los datos enviados en body, y devolver el nuevo alumno insertado

**PUT http://localhost:8080/alumnos/:id**

Actualizar el alumno indicado en "id" con los datos enviados en body, y devolver el alumno modificado

**DELETE http://localhost:8080/alumnos/:id**

Eliminar el alumno indicado en "id" y devolver un objeto JSON {ok: true}

## Cómo probar nuestra API

Nos será dificil probar nuestra API con un browser, ya que las URL que escribo sólo me permitirán probar el método GET.
Por tanto sugerimos instalar Postman: https://www.postman.com/

Cuando probemos POST/PUT recordemos enviar los datos en el body marcando la opción "raw" y luego seleccionando el tipo "JSON"

## Este es un ejercicio integrador

La idea de este ejercicio es que sea integrador de todo lo que fuimos aprendiendo. Deberíamos utilizar:

- Funciones (arrow en lo posible)
- Fomentar el reuso, con helpers y módulos (por lo pronto no utilicemos clases, ni herencia)
- Utilizar buenas prácticas:
  - Usar let y const
  - Nombres de variables en minúscula
  - Etc, etc.
  - Sugerimos instalar el formateador prettier para tener un estilo de código parejo entre los diferentes integrantes
- Promises y Async/await
- ... entre otras cosas
