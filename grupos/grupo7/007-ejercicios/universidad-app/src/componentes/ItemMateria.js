import React from "react";
import { Link } from "react-router-dom";

export default function ItemMateria(props) {
  const estilo = props.selected ? "table-active" : "table";

  const nombresProfesores = props.materia.profesores
    .map((idPr) => props.profesores.find((pr) => pr.id === idPr).nombre)
    .join(", ");

  return (
    <tr className={estilo} onClick={props.onSelectedMateria.bind(this)}>
      <th scope="row">{props.materia.id}</th>
      <td>{props.materia.nombre}</td>
      <td>{nombresProfesores}</td>
      <td>
        <Link to={`/materia/${props.materia.id}`}>
          <button className="btn btn-outline-info">ver</button>
        </Link>
        <Link to={`/materia/${props.materia.id}/edit`}>
          <button className="btn btn-outline-info">editar</button>
        </Link>
        <button
          className="btn btn-outline-info"
          onClick={props.onDeleteMateria}
        >
          eliminar
        </button>
      </td>
    </tr>
  );
}
