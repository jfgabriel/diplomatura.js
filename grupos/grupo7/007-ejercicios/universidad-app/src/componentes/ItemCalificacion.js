import React from "react";
import { Link } from "react-router-dom";

export default function ItemCalificacion(props) {
  const estilo = props.selected ? "table-active" : "table";

  const nombreAlumno = props.alumnos.find(
    (al) => al.id === props.calificacion.alumno
  ).nombre;
  const nombreMateria = props.materias.find(
    (ma) => ma.id === props.calificacion.materia
  ).nombre;

  return (
    <tr className={estilo} onClick={props.onSelectedCalificacion.bind(this)}>
      <th scope="row">
        {props.calificacion.materia * 1000 + props.calificacion.alumno}
      </th>
      <td>{nombreAlumno}</td>
      <td>{nombreMateria}</td>
      <td>{props.calificacion.nota}</td>
      <td>
        <Link
          to={`/calificacion/${
            props.calificacion.materia * 1000 + props.calificacion.alumno
          }`}
        >
          <button className="btn btn-outline-info">ver</button>
        </Link>
        <Link
          to={`/calificacion/${
            props.calificacion.materia * 1000 + props.calificacion.alumno
          }/edit`}
        >
          <button className="btn btn-outline-info">editar</button>
        </Link>
        <button
          className="btn btn-outline-info"
          onClick={props.onDeleteCalificacion}
        >
          eliminar
        </button>
      </td>
    </tr>
  );
}
