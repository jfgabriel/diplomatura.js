import React from "react";
import { Link } from "react-router-dom";

export default function ItemProfesor(props) {
  const estilo = props.selected ? "table-active" : "table";

  return (
    <tr className={estilo} onClick={props.onSelectedProfesor.bind(this)}>
      <th scope="row">{props.profesor.id}</th>
      <td>{props.profesor.nombre}</td>
      <td>
        <Link to={`/profesor/${props.profesor.id}`}>
          <button className="btn btn-outline-info">ver</button>
        </Link>
        <Link to={`/profesor/${props.profesor.id}/edit`}>
          <button className="btn btn-outline-info">editar</button>
        </Link>
        <button
          className="btn btn-outline-info"
          onClick={props.onDeleteProfesor}
        >
          eliminar
        </button>
      </td>
    </tr>
  );
}
