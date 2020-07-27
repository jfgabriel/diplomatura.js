# Ejercicios 007 React Web

## Intro

Utilizando la base de datos del ejercicio 2 (alumnos, profesores, materias y calificaciones) vamos a construir 1 pantalla, que contenga 4 botones, que permita cambiar entre 4 listados distintos. Uno de alumnos, unos de profesores, uno de materias y uno de calificaciones.
Cuando clickeamos en unos de los elementos de la lista, debera mostrar una pantalla con informacion del elemento clickeado. Ya sea un alumno, un profesor, una materia o una calificacion.

La idea es construir un componente por tipo de listado <ListaAlumnos /> <ListaProfesores /> y uno <DetalleAlumno>. <DetalleProfesor>

## Como Correr la app

```bash
npm install
npm run start
```

## 1 - Crear listados

En este ejercicio, vamos a crear 4 listados distintos, uno de alumnos, uno de profesores, uno de materias y uno de calificaciones.

Cada uno debe mostrarse cuando presiono el boton correspondiente a cada listado.

## 2 - Crear vistas de detalle para cada entidad

En cada una de las listas, cuando clickeo un elemento, deberia desaparecer el listado, y mostrarme la informacion seleccionada.
Para esto creamos el componente de vista de detalle que muestra la info de la fila seleccionada. Podemos crear uno por entidad, <DetalleAlumno/>, <DetalleProfesor>
Este componente debe recibir por property la info a mostrar. En el caso de alumno deberia recibir una property alumno, con el objeto que representa al alumno. ASi con cada uno de ellos.

## 3 - eliminar del estado

El listado de cada entidad, debe permitir borrar cada una de las filas, a traves de algun icono o link o similar sobre el row.

## 4 - Crear uno nuevo.

Cada pantalla de listado, debera permitir agregar uno nuevo de la entidad que estamos viendo.
para esto, antes de mostrar el listado, deberia mostrar un Form para agregar la entidad.
En el caso de Alumno, construir el FormAddAlumno para agregar alumno. Este solo necesita dos campos, nombre y edad.
Al agregar un nuevo alumno, este debe agregarse al estado de la app.
