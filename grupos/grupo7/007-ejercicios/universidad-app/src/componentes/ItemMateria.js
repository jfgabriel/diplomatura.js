import React from "react";

export default function ItemMateria(props) {
  const profesores = props.materia.profesores.join(", ");

  return (
    <tr>
      <th scope="row">{props.materia.id}</th>
      <td>{props.materia.nombre}</td>
      <td>{profesores}</td>
    </tr>
  );
}
