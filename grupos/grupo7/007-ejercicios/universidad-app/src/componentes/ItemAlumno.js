import React from "react";
import { Link } from "react-router-dom";

export default function ItemAlumno(props) {
  const estilo = props.selected ? "table-active" : "table";
  return (
    <tr className={estilo} onClick={props.onSelectedAlumno.bind(this)}>
      <th scope="row">{props.alumno.id}</th>
      <td>{props.alumno.nombre}</td>
      <td>{props.alumno.edad}</td>
      <td>
        <Link to={`/alumno/${props.alumno.id}`}>
          <button className="btn btn-outline-info">ver</button>
        </Link>
        <Link to={`/alumno/${props.alumno.id}/edit`}>
          <button className="btn btn-outline-info">editar</button>
        </Link>
        <button className="btn btn-outline-info" onClick={props.onDeleteAlumno}>
          eliminar
        </button>
      </td>
    </tr>
  );
}
