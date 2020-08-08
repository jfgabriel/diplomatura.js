import React from "react";

export default function ItemCalificacion(props) {
  const claseEliminacion =
    props.calificacion.alumno === "deleted" ? "deleted" : "";
  return (
    <tr>
      <th scope="row">{props.calificacion.id}</th>
      <td className={claseEliminacion}>{props.calificacion.alumno}</td>
      <td>{props.calificacion.materia}</td>
      <td>{props.calificacion.nota}</td>
    </tr>
  );
}
